<template>
  <VContainer>
    <div class="dashboard">
      <VRow>
        <VCol cols="12" xl="2" md="3">
          <LayoutDesktopDrawer v-if="!$vuetify.display.mobile" />
          <LayoutMobileDrawer v-if="$vuetify.display.mobile" />
        </VCol>
        <VCol cols="12" xl="10" md="9">
          <NuxtPage />
        </VCol>
      </VRow>
    </div>
  </VContainer>
</template>

<script setup>
definePageMeta({
  middleware: "profile",
});

import { navigateTo } from "#app";
const route = useRoute();

// if (route.name == "profile") {
//   navigateTo("/profile/basic-info");
// }
</script>

<style lang="scss">
</style>
