import { defineStore } from "pinia";
import axios from "axios";
import { ref, reactive } from "vue";
export const useAxiosStore = defineStore("storeAxios", () => {
  const BASE_URL = "http://localhost:5000/api/v1/";
  const token = ref("");
  const expiresIn = ref("");
  const authenticated = ref(false);
  const links = reactive({ data: "", addLink: "", searchLink: "" });


  const loginUser = async (RUTA, data) => {
    const PATH = BASE_URL + RUTA;
    try {
      const resp = await axios({
        url: PATH,
        method: "post",
        data: data,
        withCredentials: true,
      });
      console.log("Login", resp);

      token.value = resp.data.token;
      expiresIn.value = resp.data.expiresIn;
      console.log("Token", token.value, "/n", "expira en", expiresIn.value);
      authenticated.value = true;
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  const refreshToken = async (RUTA) => {
    const PATH = BASE_URL + RUTA;
    try {
      const resp = await axios({
        url: PATH,
        method: "get",
        withCredentials: true,
      });
      // console.log("refreshtoken", resp);
      // if (resp.data != "") {
      token.value = resp.data.token;
      expiresIn.value = resp.data.expiresIn;
      // console.log("Token", token.value, "/n", "expira en", expiresIn.value);
      authenticated.value = true;
      // }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  const getlinks = async (RUTA) => {
    const PATH = BASE_URL + RUTA;
    try {
      const resp = await axios({
        url: PATH,
        method: "get",

        withCredentials: true,
        headers: {
          Authorization: "Bearer " + token.value,
        },
      });
      // console.log("links",resp.data);
      links.data = resp.data;
      console.log("Reactrive", links.data);
    } catch (error) {}
  };
  const searchlink = async (RUTA) => {
    const PATH = BASE_URL + RUTA;
    try {
      const resp = await axios({
        url: PATH,
        method: "get",
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + token.value,
        },
      });
      console.log("Long link",resp.data);
      links.searchLink = resp.data
      return true;
    } catch (error) {
      console.log(error)
    }
  };
  const saveLink = async (RUTA, DATA) => {
    const PATH = BASE_URL + RUTA;

    try {
      const resp = await axios({
        url: PATH,
        method: "post",
        data: DATA,
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + token.value,
        },
      });
      console.log(resp.data);
      links.addLink = resp.data;
    } catch (error) {
      console.log(error)
    }

  };
  const updateLink = async (RUTA, DATA) => {
    const PATH = BASE_URL + RUTA;
    console.log("path", PATH, "DATA", DATA)
    try {
      const resp = await axios({
        url: PATH,
        method: "patch",
        data: DATA,
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + token.value,
        },
      });
      console.log("axios respuesta update",resp.data);
      return true;
    } catch (error) {
      console.log(error)
    }

  };

  const deleteLink = async (RUTA) => {
    const PATH = BASE_URL + RUTA;

    try {
      const resp = await axios({
        url: PATH,
        method: "delete",
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + token.value,
        },
      });
      console.log("axios store resp",resp.data);
      return true;
    } catch (error) {
console.log(error)
    }
  };
  const logOut = async (RUTA) => {
    const PATH = BASE_URL + RUTA;
    try {
      const resp = await axios.get(PATH);
      if (resp.data != "") {
        token.value = "";
        expiresIn.value = "";
        authenticated.value = false;
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return {
    loginUser,
    BASE_URL,
    links,
    token,
    expiresIn,
    authenticated,
    logOut,
    refreshToken,
    getlinks,
    saveLink,
    deleteLink,
    searchlink,
    updateLink,
  };
});
