<template>
  <v-container>
    <v-divider></v-divider>
    <div class="text-center py-4">
      {{ $t("copyRight1") + "@ " + currentYear + " " + $t("copyRight2") }}
    </div>
  </v-container>
</template>

<script setup>
import { computed } from "vue";

const currentYear = computed(() => new Date().getFullYear());
</script>
