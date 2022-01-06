<template>
  <v-app-bar color="blue darken-4" dense fixed class="mb-4">
    <v-col>
      <v-toolbar-title
        class="d-flex align-center"
        @click="navigateTo({ name: 'Login' })"
      >
        <img
          class="logo"
          src="../assets/icon-left-font-monochrome-white.svg"
          alt="logo"
        />
      </v-toolbar-title>
    </v-col>
    <v-spacer></v-spacer>
    <v-btn
      v-if="(!$store.state.isUserLoggedIn && url != '/')"
      class="ma-1"
      color="white"
      plain
      @click="navigateTo({ path: '/' })"
    >
      Se connecter
    </v-btn>
    <v-btn
      v-if="(!$store.state.isUserLoggedIn && url != '/signup')"
      class="ma-1"
      color="white"
      plain
      @click="navigateTo({ path: '/signup' })"
    >
      S'inscrire
    </v-btn>
    <v-btn
      v-if="$store.state.isUserLoggedIn"
      class="ma-1"
      color="white"
      plain
      @click="logout"
    >
      Se déconnecter
    </v-btn>
  </v-app-bar>
</template>

<script>

export default {
  data() {
    return {
      url: this.$router.currentRoute.path,
    };
  },
  methods: {
    navigateTo(route) {
      this.url = route.path;
      this.$router.push(route);
    },
    logout() { // fonction pour la decconnexion de l'utilisateur
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      this.$router.push({
        name: "Login",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.logo {

  cursor: pointer;
  width: 10rem;
}
.v-toolbar__title {
  width: 100%;
  height: 100%;
}
.v-application .mr-4 {
  color: white;
}
.v-btn {
  text-transform: initial;
}
</style>
