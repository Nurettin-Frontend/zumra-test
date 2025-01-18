<template>
  <v-menu content-class="language-menu">
    <template v-slot:activator="{ props }">
      <div class="d-flex align-center cursor-pointer" v-bind="props">
        <img
          width="20"
          class="mx-2"
          v-if="localeVuetify?.current?.value == 'ar'"
          src="/global/ar-lang.svg"
          alt="ar-lang"
        />
        <img
          width="20"
          class="mx-2"
          v-if="localeVuetify?.current?.value == 'en'"
          src="/global/en-lang.svg"
          alt="en-lang"
        />
        <span
          class="font-14 d-inline-block mx-2 language-title"
          v-if="$vuetify.display.mdAndUp"
          >{{
            $t(
              `${localeVuetify?.current?.value == "ar" ? "arabic" : "english"}`
            )
          }}</span
        >
      </div>
    </template>

    <v-list :elevation="0">
      <v-list-item
        v-for="(lang, i) in languages"
        :key="i"
        @click="switchLanguageHandler(lang.value)"
        class="text-center"
      >
        <div class="d-flex align-center">
          <img class="mx-1" width="18" :src="lang.img" :alt="lang.title" />
          <v-list-item-title class="cursor-pointer mx-1 font-14">{{
            $t(`${lang.title}`)
          }}</v-list-item-title>
        </div>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { useLocale } from "vuetify";

// Inject the Vuetify instance
const { t, locale } = useI18n();
const localeVuetify = useLocale();

const languages = ref([
  { title: "english", value: "en", img: "/global/en-lang.svg" },
  { title: "arabic", value: "ar", img: "/global/ar-lang.svg" },
]);

const selectedLanguage = ref("en");

const switchLanguageHandler = (lang) => {
  locale.value = lang; // Set the new language
  localStorage.setItem("lang", lang); // Save to localStorage
  localeVuetify.current.value = lang;
};

onMounted(() => {
  // set local language
  const savedLang = localStorage.getItem("lang");
  if (savedLang) {
    locale.value = savedLang; // Load saved language
    localeVuetify.current.value = savedLang;
  }
});
</script>
