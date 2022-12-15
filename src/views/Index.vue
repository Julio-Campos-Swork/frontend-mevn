<script setup>
import { useAxiosStore } from "../store/storeAxios";
import LoginRegister from "./LoginRegister.vue";
import Home from "./Home.vue";
import Links from "./Links.vue";
import { ref } from "vue";
import { useTheme } from 'vuetify'




const theme = useTheme()
const toggleTheme = () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
const useAxios = useAxiosStore();

const logOut = async () => {
  await useAxios.logOut("auth/logout");
};
const tab = ref(null);
const drawer = ref(null);
const refreshToken = async () => {
  await useAxios.refreshToken("auth/refresh");
};
refreshToken();
</script>
<template>
  <v-toolbar color="indigo" theme="dark" image="https://picsum.photos/1920/1080?random"
  >
    <v-app-bar-nav-icon>
      <v-btn @click.stop="drawer = !drawer"  color="indigo" icon>
      <v-icon>mdi-home</v-icon>

      </v-btn>
    </v-app-bar-nav-icon>


    <v-spacer></v-spacer>
    <v-toolbar-title class="text-center" >Acortador de links</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn color="red" @click="logOut()" icon>
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
      <v-chip   @click="toggleTheme"
        prepend-icon="mdi-brightness-5"
      >
        Cambiar Tema
      </v-chip>

    </template>
  </v-toolbar>
  <v-card class="mx-auto">
    <v-card-text>
      <v-window v-model="tab">
        <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        permanent
      >
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"
          title="John Leider"
        ></v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard"></v-list-item>
          <v-list-item prepend-icon="mdi-account-box" title="Account"></v-list-item>
          <v-list-item prepend-icon="mdi-gavel" title="Admin"></v-list-item>
          <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
          <v-list-item prepend-icon="mdi-visibility" title="Ocultar" value="ocultar" @click="drawer = !drawer"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>

        <v-window-item value="Home">
          <Home />
          <v-btn color="blue" @click="refreshToken()">Refresh Token</v-btn>
        </v-window-item>
        <v-window-item v-if="useAxios.authenticated" value="Links">
          <Links />
        </v-window-item>
        <v-window-item v-if="!useAxios.authenticated" value="LoginRegister">
          <LoginRegister />
        </v-window-item>
      </v-main>
    </v-layout>
      </v-window>
    </v-card-text>
  </v-card>

</template>

<style></style>
