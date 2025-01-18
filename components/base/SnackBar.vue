<template>
  <div class="snack">
    <v-snackbar v-model="show" :color="color" :timeout="4000" location="bottom">
      <span class="text-white">{{ textSnack }}</span>

      <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="show = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import { useGlobalStore } from "@/stores/Global";
import { storeToRefs } from "pinia";

const store = useGlobalStore();
const { text } = storeToRefs(store);

let textSnack = ref("");
let color = ref("");
let show = ref(false);


watch(text, () => {
  textSnack.value = store.text;
  color.value = store.color;
  show.value = true;
});
</script>

<style lang="scss" scoped>
.snack {
  position: fixed;
  top: 100px;
  left: 0px;
  width: 100%;
}
</style>
