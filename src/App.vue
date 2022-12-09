<template>
  <v-app>
    <v-main>
      <v-toolbar
        flat
        dark
        prominent
        image="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
      >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Acortador de links</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn v-if="useAxios.authenticated" icon>
          <v-icon>mdi-export</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card>
        <v-tabs
          fixed-tabs
          height="30"
          slider-color="light-blue lighten-5"
          density="compact"
          v-model="tab"
        >
          <v-tab value="Home"> Home </v-tab>
          <v-tab value="Links"> Links </v-tab>
          <v-tab v-if="!useAxios.authenticated" value="LoginRegister"> Login/Register </v-tab>
          <v-tab v-if="useAxios.authenticated" value="Logout">
            <v-btn rounded size="small" color="red">Logout</v-btn> </v-tab>
        </v-tabs>
        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="Home">
              <Home  />
            </v-window-item>
            <v-window-item value="Links">
            </v-window-item>
            <v-window-item value="LoginRegister">
              <LoginRegister v-if="!useAxios.authenticated" />
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
      <!-- <index v-if="!useAxios.authenticated"/> -->
    </v-main>
  </v-app>
</template>

<script setup>
import { useAxiosStore } from "./store/storeAxios";
import LoginRegister from "./views/LoginRegister.vue";
import Home from "./views/Home.vue";
import index from "./views/Index.vue";
import { ref } from "vue";

const useAxios = useAxiosStore();
const tab = ref(null);

</script>
