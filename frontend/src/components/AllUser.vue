<template>
  <div>
    <div class="d-flex justify-center pb-4 mb-4">
      <h1 class="font-weight-light">Liste des utilisateurs enregistrés</h1>
    </div>
    <v-card
      max-width="800"
      class="card d-flex flex-column flex-sm-row align-center offset-md-3 mx-auto mb-4"
      v-for="(user, index) in users"
      :key="index"
    >
      <v-col class="d-flex flex-wrap align-center">
        <v-avatar class="ma-4">
          <img :src="user.avatar" alt="" />
        </v-avatar>
        <h2 class="mr-4 font-weight-light">
          <a @click="profil(user.id)">
             {{ user.first_name }} {{ user.last_name }}
          </a>
        </h2>
        <a :href="`mailto:${user.email}`"> {{user.email}} </a>
      </v-col>
      <v-spacer></v-spacer>
      <v-col v-if="user.id == UserId || UserAdmin === true">
        <v-btn
          class="btn align-self-center ma-2 rounded-xl"
          color="red darken-1"
          @click="deleteAccount(user.id, formData)"
        >
          Supprimer le compte
        </v-btn>
      </v-col>
    </v-card>
    <div class="d-flex justify-center pa-4 ma-4">
      <v-btn @click="profil(UserId)" class="ma-2" color="blue darken-4" dark>
        <v-icon dark left> mdi-arrow-left </v-icon>
        Retour à la page profil
      </v-btn>
    </div>
  </div>
</template>

<script>
import UserServices from "@/services/UserServices.js";
let user = JSON.parse(localStorage.getItem("user"));
export default {
  data() {
    return {
      users: "",
      UserId: user.id,
      UserAdmin: user.isAdmin,
      formData: {
            userId: this.UserId,
            userAdmin: this.UserAdmin,
        },
    }
  },
  async mounted() { //fonction qui permet de réccupérer tous les utilisateurs
    this.users = (await UserServices.getAllUsers()).data;
    console.log("ici", this.users);
  },
  methods: {
    async deleteAccount(id, data) { //fonction pour supprimer un compte
      await UserServices.deleteAccount(id, data);
      setTimeout(function () {
        location.reload(true);
      }, 100);
    },
    profil(userId) { //fonction pour aller à la page profil
      const router = this.$router;
      setTimeout(function () {
        router.push(`/profil/${userId}`);
      }, 100);
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  border-left: solid 6px;
  border-left-color: #0d47a1;
}
.btn {
  color: white;
  font-weight: bold;
  text-decoration: underline;
}
</style>
