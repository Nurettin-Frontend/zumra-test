import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  // Create an Axios instance with a base URL
  const instance = axios.create({
    baseURL: config.public.baseUrl || "https://jsonplaceholder.typicode.com",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });

  instance.interceptors.request.use((config) => {
    // Check if the code is running on the server or client
    if (process.server) {
      // On the server, use cookies or other secure methods to get the token
      // const token = nuxtApp.ssrContext?.req?.headers?.authorization || ''; // Adjust based on your setup
      // if (token) {
      //   config.headers.Authorization = token;
      // }
    } else if (process.client) {
      // On the client, use localStorage or other client-side storage
      const token = localStorage.getItem("token") || "";
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  });

  nuxtApp.provide("axios", instance);
});
