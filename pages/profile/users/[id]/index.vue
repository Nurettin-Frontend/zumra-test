<template>
  <div class="pa-5">
    <div v-if="status == 'pending'">
      <p>{{ $t("loading") }}</p>
    </div>
    <div v-else-if="data">
      <span class="d-block font-24">
        <v-icon @click="$router.push('/profile/users')"
          >mdi-chevron-{{ locale == 'ar' ? 'left':'right'  }}</v-icon
        >
        {{ $t("generalInfos") }}:
      </span>
      <div class="px-14 py-2">
        <span class="d-block font-18 mb-1"
          ><b>{{ $t("form.name") }}: </b> {{ data.name }}</span
        >
        <span class="d-block font-18 mb-1"
          ><b>{{ $t("form.email") }}: </b> {{ data.email }}</span
        >
        <span class="d-block font-18 mb-1"
          ><b>{{ $t("form.phone") }}: </b> {{ data.phone }}</span
        >
        <span class="d-block font-18 mb-1"
          ><b>{{ $t("form.username") }}: </b> {{ data.username }}</span
        >
        <span class="d-block font-18 mb-1"
          ><b>{{ $t("form.website") }}: </b> {{ data.website }}</span
        >
      </div>

      <v-divider></v-divider>
      <span class="d-block font-24">{{ $t('company') }}: </span>
      <div class="px-14 py-2">
        <span class="d-block font-18 mb-1"
          ><b>{{ $t("form.name") }}: </b> {{ data.company?.name }}</span
        >
        <span class="d-block font-18 mb-1"
          ><b>{{ $t("BS") }}: </b> {{ data.company?.bs }}</span
        >
        <span class="d-block font-18 mb-1"
          ><b>{{ $t("catchPhrase") }}: </b>
          {{ data.company?.catchPhrase }}</span
        >
      </div>

      <v-divider></v-divider>
      <span class="d-block font-24">{{ $t("Address") }}: </span>
      <div class="px-14 py-2">
        <span class="d-block font-18 mb-1"
          ><b>{{ $t("city") }}: </b> {{ data.address?.city }}</span
        >
        <span class="d-block font-18 mb-1"
          ><b>{{ $t("street") }}: </b> {{ data.address?.street }}</span
        >
        <span class="d-block font-18 mb-1"
          ><b>{{ $t("suite") }}: </b> {{ data.address?.suite }}</span
        >
        <span class="d-block font-18 mb-1"
          ><b>{{ $t("zipcode") }}: </b> {{ data.address?.zipcode }}</span
        >
      </div>
    </div>

    <div class="text-center" v-else>{{ $t("somethingWentWrong") }}</div>
  </div>
</template>

<script setup>
import { useRoute } from "nuxt/app";
import { getUserByIDAPI } from "~/services/Users";

useHead({
  title: "User Details",
});
definePageMeta({
  middleware: "profile",
});

const route = useRoute();
const locale = useLocale();

import { useAsyncData } from "#app";
import { useLocale } from "vuetify";

const { data, error, status } = await useAsyncData("user", async () => {
  let res = await getUserByIDAPI(route.params.id);
  return res.data;
});

// const fetchDataHandler = async () => {
//   let res = await getUserByIDAPI(route.params.id);
//   if (res.success) {
//     loading.value = false;
//     data.value = res.data;
//   }
// };
</script>

<style></style>
