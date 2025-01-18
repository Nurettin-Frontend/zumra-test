export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const token = localStorage.getItem("token");
    const authenticationPages = ["/login"];
    
    if (token && authenticationPages.includes(to.path)) {
      return navigateTo("/"); // Redirect to the home page if the user is logged in.
    }
  }
});

