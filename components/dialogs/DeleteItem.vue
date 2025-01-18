<template>
  <div>
    <div class="px-5 py-4 bg-black">
      <span class="text-white"
        >{{ $t("areYouSureDelete") }}
        <span class="text-error">{{ name }}</span> ?
      </span>
    </div>
    <div class="pa-3 px-5 bg-white">
      <v-form ref="delete">
        <div class="d-flex align-center justify-space-between my-3">
          <v-btn
            variant="outlined"
            elevation="0"
            class="px-10"
            @click="$emit('close')"
          >
            <span class="text-black">{{ $t("form.cancel") }}</span>
          </v-btn>

          <v-btn
            color="error"
            elevation="0"
            class="px-10"
            :loading="loading"
            @click="$emit('deleteHandler')"
          >
            <span class="text-white">{{ $t("form.delete") }}</span>
          </v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss"></style>
