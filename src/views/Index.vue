<script setup>
import { useAxiosStore } from "../store/storeAxios";
import LoginRegister from "./LoginRegister.vue";
import Home from "./Home.vue";
import Links from "./Links.vue";
import { ref } from "vue";

const useAxios = useAxiosStore();

const logOut = async () => {
  await useAxios.logOut("auth/logout");
};
const tab = ref(null);

const refreshToken = async () => {
  await useAxios.refreshToken("auth/refresh");
};
refreshToken();
</script>
<template>
  <v-toolbar
    color="primary"
    image="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
  >
    <v-app-bar-nav-icon icon="mdi-menu"></v-app-bar-nav-icon>

    <v-toolbar-title >Acortador de links</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn @click="logOut()" icon>
      <v-icon>mdi-export</v-icon>
    </v-btn>
    <template v-slot:extension>
      <v-tabs
        grow
        bg-color="transparent"
        centered
        color="green"
        fixed-tabs
        height="40"
        slider-color="light-blue lighten-5"
        density="compact"
        v-model="tab"
      >
        <v-tab value="Home"> Home </v-tab>
        <v-tab v-if="useAxios.authenticated" value="Links"> Links </v-tab>
        <v-tab v-if="!useAxios.authenticated" value="LoginRegister">
          Login/Register
        </v-tab>
        <v-tab v-if="useAxios.authenticated" value="Logout">
          <v-btn rounded  block text color="red" @click="logOut()">Logout </v-btn>
        </v-tab>
      </v-tabs>
    </template>
  </v-toolbar>
  <v-card class="mx-auto" color="white" light>
    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="Home">
          <Home />
          <v-btn color="blue" @click="refreshToken()">Refresh Token</v-btn>
        </v-window-item>
        <v-window-item value="Links">
          <Links />
        </v-window-item>
        <v-window-item value="LoginRegister">
          <LoginRegister />
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<style></style>
