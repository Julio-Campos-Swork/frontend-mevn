import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
export const useAxiosStore = defineStore("storeAxios", () => {
  const BASE_URL = "http://localhost:5000/api/v1/";
  const token = ref("");
  const expiresIn = ref("");
  const authenticated = ref(false);
  const api = () => {
    axios.create({
      baseURL: "http://localhost:5000/api/v1/",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const getPost = async (RUTA, data) => {
    const PATH = BASE_URL + RUTA;
    console.log("path", PATH);
    if (token.value != "") {
      try {
        const resp = await axios.post(PATH, data, token.value);
      } catch (error) {
        console.log("Error: ", error);
      }
    } else {
        try {

          const resp = await axios.post(PATH, data);
          console.log("Data", resp)
          if (resp.data != "") {
            token.value = resp.data.token;
            expiresIn.value = resp.data.expiresIn;
            console.log("Token",token.value,"/n", "expira en", expiresIn.value);
            authenticated.value = true;
          }
        } catch (error) {
        console.log("Error: ", error);

        }
    }
  };

  return { api, getPost, BASE_URL, token, expiresIn,authenticated };
});
