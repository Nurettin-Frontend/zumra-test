import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const userDetails = ref(null);
  const userLoading = ref(true);
  const getUserDetails = computed(() => userDetails.value);
  const getUserLoading = computed(() => userLoading.value);

  const setUserDetails = (payload) => {
    userDetails.value = payload;
  };

  const setUserLoading = (payload) => {
    userLoading.value = payload;
  };

  const checkUserDetails = async () => {
    const token = localStorage.getItem("token");
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));

    if (token && !getUserDetails?._id) {
      setUserLoading(true);
      setUserLoading(false);
      setUserDetails(userDetails);
    }
    if (!token) {
      setUserLoading(false);
    }
  };

  return {
    // getters
    getUserDetails,
    getUserLoading,

    // mutations
    setUserDetails,
    setUserLoading,
    checkUserDetails,
  };
});
