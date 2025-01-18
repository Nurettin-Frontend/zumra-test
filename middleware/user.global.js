import { useAuthStore } from "~/stores/AuthStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client) {
    const authStore = useAuthStore();
    authStore.checkUserDetails()
  }
});
