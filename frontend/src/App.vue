<template>
  <v-app>
    <v-main class="test">
      <PageHeader />
      <br>
      
      <v-container class="mt-10">
       
        
        <router-view/>
      </v-container>
      
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import PageHeader from '@/components/Header.vue'





export default {
  name: 'App',

  data: () => ({
    //
  }),
  components: {
    PageHeader, 
    
    

  },
  methods: {
    //Permet de mettre à jour l'état de l'utilisateur (connecté ou non) grace au token du local storage
    ...mapActions([
      'fetchAccessToken'
    ]),
  },
  created() {
    this.fetchAccessToken();
  }
};
</script>
<style lang="scss" scoped>
.test {
  background-color: #f2f2f2;
}
</style>
