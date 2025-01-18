import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", () => {
  const text = ref(null);
  const color = ref(null);
  const currentTheme = ref("");

  const textSnack = computed(() => text.value);
  const getCurrentTheme = computed(() => currentTheme.value);

  const showSnack = async (payload) => {
    text.value = payload.text;
    color.value = payload.color;
  };

  const setCurrentTheme = () => {
    const localTheme = localStorage.getItem("theme");
    if (!localTheme) {
      localStorage.setItem("theme", "dark");
      currentTheme.value = "dark";
    } else {
      localStorage.setItem("theme", localTheme == "light" ? "dark" : "light");
      currentTheme.value = localTheme == "light" ? "dark" : "light";
    }
  };

  const returnDefaultTheme = () => {
    if (process.client) {
      let localTheme = localStorage.getItem("theme");
      if (localTheme) currentTheme.value = localTheme;
      else currentTheme.value = "light";
    }
  };

  return {
    // state
    text,
    color,

    // getters
    textSnack,
    getCurrentTheme,

    // mutations
    showSnack,
    setCurrentTheme,
    returnDefaultTheme,
  };
});
