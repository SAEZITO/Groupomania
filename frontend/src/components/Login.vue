<template>
  <v-card
    max-width="800"
    elevation="2"
    class="mx-auto d-flex align-center rounded-xl"
    color="blue lighten-4"
  >
    <v-row class="d-flex flex-md-row justify-center">
      <v-col class="pa-4 d-flex align-center">
        <img class="rounded-xl" src="../assets/icon-above-font.png" alt="" />
      </v-col>
      <v-col class="ma-2 pa-4">
        <v-toolbar
          class="d-flex justify-center rounded-xl"
          elevation="0"
          dense
          color="blue darken-4"
        >
          <v-toolbar-title>Se connecter</v-toolbar-title>
        </v-toolbar>
        <div class="mt-8 mr-4 ml-4 pa-2">
         
          <v-text-field
            v-model="email"
            label="Email"
            hide-details="auto"
            autocomplete="off"
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Mot de passe"
            type="password"
            autocomplete="off"
          ></v-text-field>

        <div class="error" v-html="error" />

          <br />
          <v-row>
            <v-btn
              class="btn align-self-center ma-2 rounded-xl"
              color="blue darken-4"
              @click="login"
            >
              Valider
            </v-btn>
          </v-row>
          <br />
          <span
            >Vous n'avez pas de compte?
            <a @click="signup">Créer un compte.</a></span
          >
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
// import { mapState, mapActions } from "vuex";
import AuthServices from "@/services/AuthServices";
export default {
  data() {
    return {
      // username: "",
      email: "",
      password: "",
      error: null,
    };
  },
  
mounted: function () {
        if(this.$store.state.isUserLoggedIn != false) {
            this.$router.push('Posts')
            return;
        }
        console.log(this.$store.state.isUserLoggedIn)
    },

  methods: {
    async login() {
      try {
        const response = await AuthServices.login({
          email: this.email,
          password: this.password,
        });
        const user = response.data.user;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("accessToken", response.data.token);

        console.log(response);
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUserId", response.data.UserId);
        const router = this.$router;
        location.reload(true);
        setTimeout(function () {
          router.push("/posts");
        }, 100);
      } catch (error) {
        this.error = error.response.data.error;
      }
    },

    signup() {
      const router = this.$router;
      setTimeout(function () {
        router.push("/signup");
      }, 100);
    },
  },
};
</script>

<style lang="scss" scoped>
.v-toolbar__title {
  color: white;
  font-weight: bold;
  font-size: 2rem;
  font-display: roboto;
}

.btn {
  color: white;
  font-weight: bold;
  text-decoration: underline;
}

img {
  width: 95%;
  height: auto;
}

.v-application a {
  color: #01579b;
  text-decoration: underline;
  font-weight: bold;
}
</style>
