<template>
  <v-app  >
    <v-main>
      <IndexVue />
      <v-footer
    class="bg-indigo-lighten-1 text-center d-flex flex-column"
  >
    <div>
      <v-btn
        class="mx-4"
        icon="mdi-facebook"
        variant="text"
      ></v-btn>
      <v-btn
        class="mx-4"
        icon="mdi-twitter"
        variant="text"
      ></v-btn>
      <v-btn
        class="mx-4"
        icon="mdi-linkedin"
        variant="text"
      ></v-btn>
      <v-btn
        class="mx-4"
        icon="mdi-instagram"
        variant="text"
      ></v-btn>
    </div>

    <div class="pt-0">
      Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    </div>

    <v-divider></v-divider>

    <div>
      <strong>Le Fecha y Hora es: </strong>
      <br />
       {{ date }}
    </div>
  </v-footer>
    </v-main>
  </v-app>
</template>

<script setup>
import IndexVue from './views/Index.vue';
import { ref } from 'vue';
const date = ref("");

const getFecha = () => {

  setInterval(function () {
    const addZero = (i) => {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    };

    const currentDate = new Date();

    date.value =
      addZero(currentDate.getHours()) +
      ":" +
      addZero(currentDate.getMinutes()) +
      ":" +
      addZero(currentDate.getSeconds()) +
      " - " +
      addZero(currentDate.getDate()) +
      "/" +
      addZero(currentDate.getMonth()) +
      "/" +
      addZero(currentDate.getFullYear());
  }, 1000);

};
getFecha();
</script>
