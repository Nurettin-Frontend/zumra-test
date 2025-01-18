import { useNuxtApp } from "#app";

export const addUserAPI = async (obj) => {
  const { $axios } = useNuxtApp();

  try {
    const { data } = await $axios.post("/users", obj);
    return { success: true, data };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "An error occurred",
    };
  }
};

export const updateUserAPI = async (obj, userID) => {
  const { $axios } = useNuxtApp();

  try {
    const { data } = await $axios.put(`/user/${userID}`, obj);
    return { success: true, data };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "An error occurred",
    };
  }
};

export const deleteUserAPI = async (userID) => {
  const { $axios } = useNuxtApp();

  try {
    const { data } = await $axios.delete(`/users/${userID}`);
    return { success: true, data };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "An error occurred",
    };
  }
};

export const getUsersAPI = async (params) => {
  const { $axios } = useNuxtApp();

  try {
    const { data } = await $axios.get("/users", {
      params,
    });
    return { success: true, data };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "An error occurred",
    };
  }
};

export const getUserByIDAPI = async (id) => {
  const { $axios } = useNuxtApp();

  try {
    const { data } = await $axios.get(`/users/${id}`);
    return { success: true, data };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "An error occurred",
    };
  }
};
