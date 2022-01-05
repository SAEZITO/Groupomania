<template>
            <!-- ----------------------------------- -->
            <!-- Bouton pour ajouter un commentaire -->
            <!-- ----------------------------------- -->
        <div>
            <div>
              <v-col>
                <v-btn @click="commentPost(post.id)">
                  Ajouter un commentaire
                </v-btn>
              </v-col>
            </div>
            
            <!-- ------------------- -->
            <!-- Bloc commentaire -->
            <!-- ------------------- -->

            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>
                 <div
                  v-for="comment in Comments"
                  :key="comment.id"
                  class="d-flex align-center pr-4 pl-4"
                >
                  <v-card-text>
                    <span class="profil" @click="profil(comment.UserId)">
                      {{ comment.first_name }} {{ comment.last_name }}
                    </span>
                    : {{ comment.text }}
                  </v-card-text>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-if="UserId == comment.UserId || userAdmin == true"
                        @click="deleteComment(comment.id)"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        small
                        color="red"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </template>
                    <span>Supprimer mon commentaire</span>
                  </v-tooltip>
                
                  </div>
              </div>
            </v-expand-transition>
          
            <!-- --------------------------------------- -->
            <!-- Bouton pour afficher le bloc commentaire -->
            <!-- ---------------------------------------- -->
            <div>
              <v-col>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      icon
                      @click=";(show = !show), commentShow(post, post.id)"
                    >
                      <v-icon large color="purple accent-3">
                        mdi-message-text
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>Afficher les commentaires</span>
                </v-tooltip>
                <span>{{ Comments.length }}</span>
              </v-col>
            </div>

      <!-- ------------------------------------------- -->
      <!-- Boite de dialog pour ajouter un commentaire -->
      <!-- -------------------------------------------- -->
        <v-dialog v-model="comment" width="500">
          <v-card>
            <v-col cols="12" sm="12">
              <v-textarea
                label="Message"
                filled
                auto-grow
                outlined
                rows="2"
                row-height="15"
                v-model="text"
              ></v-textarea>
            </v-col>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="publishComment(currentPostId)"
              >
                Publier
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      


        </div>
</template>  

<script>
import CommentServices from '@/services/CommentServices'
import { mapGetters } from 'vuex'
import store from "@/store";


let user = JSON.parse(localStorage.getItem('user'))

export default {
  name: 'Post',

  data() {
    return {
      messages: [],
      dialog: false,
      comment: false,      
      show: false,
      message: null,
      UserId: user.id,
      userAdmin: user.isAdmin,
      first_name: user.first_name,
      last_name: user.last_name,
      text: null,
      currentPostId: null,
      currentPost: [],
      error: null,
    }
  },
  computed: {
    ...mapGetters([
          'posts'
    ]),
   },
  created() {
          store.dispatch('getPosts');
     }, 
  components: {
   
  },
  methods: {
    commentPost(postId) {
      this.comment = true
      this.currentPostId = postId
    },
    commentShow(post, postId) {
      this.currentPostId = postId
      this.currentPost = post
      console.log('la', this.currentPost)
      console.log('ici', this.currentPost)
    },
    // ////////////////////////////////////
    //Fonction pour publier un commentaire
    // /////////////////////////////////////
    async publishComment(id) {
      try {
        let data = {
          text: this.text,
          UserId: this.UserId,
          PostId: id,
          first_name: this.first_name,
          last_name: this.last_name,
        }
        console.log(data)
        const response = await CommentServices.createComment(data)
        console.log(response)
        this.comment = false
        this.currentPostId = null
        location.reload(true)
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    // //////////////////////////////////
    //Fonction pour supprimer un post
    // //////////////////////////////////
    async deleteComment(commentId) {
      await CommentServices.deleteComment(`${commentId}`)
      location.reload(true)
    },
    // //////////////////////////////////////////////////////////////////
    // Fonction qui permet de rediriger ver le profil d'un utilisateur
    // //////////////////////////////////////////////////////////////////
    profil(userId) {
      const router = this.$router
      setTimeout(function () {
        router.push(`/profil/${userId}`)
      }, 10)
    },
  },
}
</script>
<style lang="scss" scoped>
.profil {
  cursor: pointer;
  text-decoration: underline;
}
.v-btn {
  text-transform: initial;
}
.post-message {
  font-weight: 300;
  font-size: 1.3rem;
}
.v-image__image--cover{
  background-size: contain;
}
</style>
