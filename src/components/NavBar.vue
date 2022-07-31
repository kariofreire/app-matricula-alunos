<template>
  <v-app-bar
    dark
    app
  >
    <v-toolbar-title>Matrículas de Alunos</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn
      left
      icon
      @click="logout"
    >
      <v-icon>mdi-logout</v-icon>
    </v-btn>

  </v-app-bar>
</template>

<script>
  import Cookie from 'js-cookie';

  export default {
    name: "NavBar",

    data() {
      return {
        token: Cookie.get("token")
      }
    },

    methods: {
      logout() {
        Cookie.remove("token");
        this.$router.push("/login");
      }
    },
  }
</script>