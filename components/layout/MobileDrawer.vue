<template>
  <v-navigation-drawer
    v-model="activeMenu"
    class="d-flex justify-space-between-col"
    expand-on-hover
    rail
  >
    <div class="my-10 px-3">
      <h3 class="text-h5 mb-3">{{ $t("dashboard") }}</h3>
      <v-list class="py-0">
        <v-list-item
          :class="checkActive('/users')"
          @click="goTo('/profile/users')"
          :title="$t('users')"
        >
          <template v-slot:prepend>
            <v-icon>mdi-account</v-icon>
          </template>
        </v-list-item>

        <v-list-item
          :class="checkActive('/analytics')"
          @click="goTo('/profile/analytics')"
          :title="$t('analytics')"
        >
          <template v-slot:prepend>
            <v-icon>mdi-chart-line</v-icon>
          </template>
        </v-list-item>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>

<script setup>
const router = useRouter();
const route = useRoute();
const activeMenu = ref(true);

const goTo = (val) => {
  router.push(val);
};

const checkActive = (val) => {
  if ("/profile" + val == route.fullPath) return "tab-is-active";
  return false;
};
</script>

<style lang="scss"></style>
