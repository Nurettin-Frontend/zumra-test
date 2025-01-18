export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const token = localStorage.getItem("token");
    if (!token && to.fullPath.indexOf("/profile") > -1) {
      return navigateTo("/login"); // Redirect to the home page if the user is logged in.
    }
  }
});
