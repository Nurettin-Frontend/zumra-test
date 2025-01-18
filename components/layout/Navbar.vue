<template>
  <VAppBar :elevation="1" rounded class="py-2">
    <VContainer px-0 px-sm-2 class="px-1">
      <div class="d-flex justify-space-between">
        <NuxtLink class="d-flex align-center text-decoration-none" to="/" v-if="!$vuetify.display.mobile">
          <VImg
            src="/global/logo.png"
            :class="currentTheme == 'dark' ? 'light-img' : ''"
            width="200"
            class="mx-1"
            
          ></VImg>
        </NuxtLink>
        <NuxtLink class="d-flex align-center text-decoration-none" to="/" v-if="$vuetify.display.mobile">
          <VImg
            src="/favicon.png"
            :class="currentTheme == 'dark' ? 'light-img' : ''"
            class="mx-1"
            width="40"
            
          ></VImg>
        </NuxtLink>
        <div class="d-flex align-center mx-2">
          <Languages />
          <v-switch
            @update:modelValue="changeThemeHandler"
            :label="
              $vuetify.display.mobile
                ? ''
                : currentTheme == 'dark'
                ? $t('darkMode')
                : $t('lightMode')
            "
            color="primary"
            hide-details
            true-value="dark"
            class="custom-switch mx-2"
            v-model="currentTheme"
          ></v-switch>

          <VBtn variant="outlined" color="black" v-if="userLoading">{{
            $t("loading")
          }}</VBtn>

          <div
            class="d-flex align-center"
            v-if="userDetails?.fullName && !userLoading"
          >
            <VBtn
              variant="outlined"
              class="mx-2"
              @click="$router.push('/profile/users')"
              >{{ userDetails.fullName }}</VBtn
            >
            <VBtn variant="outlined" @click="logoutHandler"><v-icon>mdi-logout</v-icon></VBtn>
          </div>
          <NuxtLink to="/login" v-if="!userDetails?.fullName && !userLoading">
            <VBtn variant="outlined" color="black_">{{
              $t("loginSignup")
            }}</VBtn>
          </NuxtLink>
        </div>
      </div>
    </VContainer>
  </VAppBar>
</template>

<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { useTheme } from "vuetify";
import { useAuthStore } from "~/stores/AuthStore";
import { useGlobalStore } from "~/stores/Global";
import Languages from "./Languages.vue";
import { useRouter } from "nuxt/app";

const router = useRouter();
const globalStore = useGlobalStore();
const authStore = useAuthStore();
const theme = useTheme();

const currentTheme = computed(() => globalStore.getCurrentTheme);
const userDetails = computed(() => authStore.getUserDetails);
const userLoading = computed(() => authStore.getUserLoading);

const logoutHandler = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userDetails");
  router.go(0);
};

const changeThemeHandler = () => {
  globalStore.setCurrentTheme();
  theme.global.name.value =
    currentTheme.value === "light" ? "lightTheme" : "darkTheme";
};

onMounted(() => {
  globalStore.returnDefaultTheme();
  theme.global.name.value =
    currentTheme.value == "light" ? "lightTheme" : "darkTheme";
});
</script>

<style>
.custom-switch .v-label {
  order: -1;
  margin: 0px 12px;
}
</style>
