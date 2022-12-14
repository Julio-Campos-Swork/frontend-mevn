<script setup>
import { useAxiosStore } from "@/store/storeAxios";
import { reactive, ref } from "vue-demi";
const useAxios = useAxiosStore();
const tab = ref(null);
const getLinks = async () => {
  await useAxios.getlinks("links/");
};
getLinks();

const nanoLinkResp = reactive({ newLink: "" });
const longLinkSend = reactive({ longLink: "" });
const nanoLinkSend = reactive({ nanoLink: "" });
const respNanoLink = ref(false);
const respLongLink = ref(false);
const addLink = async () => {
  console.log(longLinkSend);
  await useAxios.saveLink("links/", longLinkSend);
  useAxios.links.addLink = useAxios.links.addLink;
  if (useAxios.links.addLink != "") {
    respNanoLink.value = true;
  }
};
const deleteLink = async (_id) => {
const resp = await useAxios.deleteLink(`links/${_id}`);
if(resp == true){
  getLinks();
  console.log("se borro el link")
}else{
  console.log("No se borraron los datos")
}
};
const searchNanoLink = async () => {
const resp = await useAxios.searchlink(`links/${nanoLinkSend.nanoLink}`);
if(resp){
  respLongLink.value = true;
}
};
const updateLink = async (_id, longLink) => {
console.log("Update")
let data = {longLink: longLink}
const resp = await useAxios.updateLink(`links/${_id}`, data);
resp == true ? getLinks() : console.log("no se actualizo")
}
</script>
<template>
  <h1>Links</h1>
  <v-container>
    <v-row justify="center">
      <v-container fluid>
        <v-row justify="center">


        <v-tabs fixed-tabs
          height="30"
          slider-color="light-blue lighten-5"
          v-model="tab"
          color="green"
        >
          <v-tab value="getlinks"> Consultar/Eliminar Links </v-tab>
          <v-tab value="addLink"> Codificar Links </v-tab>
          <v-tab value="getLongLinkbyNanoLink"> Decodificar NanoLinks </v-tab>
        </v-tabs>
      </v-row>
        <v-container fluid>
          <v-window v-model="tab">
            <v-window-item value="getlinks">
              <v-card>
                <v-card-title>Listado de Links </v-card-title>
                <v-card-text>
                  <v-row justify="center">
                    <v-col
                      cols="6"
                      align-self="auto"
                      v-for="link in useAxios.links.data.links"
                    >
                      <v-text-field
                        append-icon="mdi-delete"
                        variant="solo"
                        :label="`Link Acortado - ${link.nanoLink}`"
                        v-model="link.longLink"
                        @click:append="deleteLink(link._id)"
                        append-inner-icon="mdi-check"
                        @click:append-inner="updateLink(link._id,link.longLink)"
                        @keypress.enter="updateLink(link._id,link.longLink)"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-window-item>
            <v-window-item value="addLink">
              <v-card flat>
                <v-row>
                  <v-col cols="12" align-self="auto">
                    <v-text-field
                      variant="underlined"
                      clearable
                      focused
                      label="Ingresa Una Url"
                      v-model="longLinkSend.longLink"
                    ></v-text-field>

                    <v-btn rounded color="green" @click="addLink()">Agregar Link</v-btn>
                    <br />
                    <br />

                    <v-text-field
                      readonly
                      density="compact"
                      variant="underlined"
                      v-if="respNanoLink"
                      label="Url Codificada"
                      v-model="useAxios.links.addLink.newLink.nanoLink"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card>
            </v-window-item>
            <v-window-item value="getLongLinkbyNanoLink">
              <h1>Decodificar Link</h1>
              <v-card flat>
                <v-row>
                  <v-col cols="12" align-self="auto">
                    <v-text-field
                      variant="underlined"
                      clearable
                      focused
                      label="Ingresa Una Url Acortada"
                      v-model="nanoLinkSend.nanoLink"
                    ></v-text-field>

                    <v-btn rounded color="green" @click="searchNanoLink()">Decodificar Link</v-btn>
                    <br />
                    <br />

                    <v-text-field
                      readonly
                      density="compact"
                      variant="underlined"
                      v-if="respLongLink"
                      label="Url Decodificada"
                      v-model="useAxios.links.searchLink.longLink"
                    ></v-text-field>
                  </v-col>
                </v-row>
                 </v-card>
            </v-window-item>
          </v-window>
        </v-container>
      </v-container>
    </v-row>
  </v-container>
</template>


