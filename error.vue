<template>
  <NuxtLayout>
    <div class="text-center my-10">
      <h1>Ops. Not Found Page</h1>
      <v-btn @click="$router.push('/')" color="primary" class="mt-4"
        >Back To Homepage</v-btn
      >
    </div>
  </NuxtLayout>
</template>

<script setup>
useHead({
  title: "Not Found Page",
});
</script>

<style></style>
