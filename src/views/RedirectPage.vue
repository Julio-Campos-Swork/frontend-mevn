<template>
  <v-container>
    <v-dialog fullscreen v-model="dialog">
      <h1>Redirigiendo...</h1>

    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref } from "vue-demi";


const dialog = ref(true);
</script>
