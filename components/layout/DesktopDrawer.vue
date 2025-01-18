<template>
  <div class="dashboard-sidebar mt-4">
    <div class="d-flex justify-space-between-col h-100">
      <div>
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
            :title="$t('analyticsSide')"
          >
            <template v-slot:prepend>
              <v-icon>mdi-chart-line</v-icon>
            </template>
          </v-list-item>
        </v-list>
      </div>
      <div>
        <div class="pa-4 d-flex cursor-pointer" @click="logoutHandler">
          <span class="d-block mx-2">{{ $t("logout") }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const route = useRoute();

const goTo = (val) => {
  router.push(val);
};
const checkActive = (val) => {
  if ("/profile" + val == route.fullPath) return "tab-is-active";
  return false;
};

const logoutHandler = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userDetails");
  router.go(0);
};
</script>

<style lang="scss">
.dashboard-sidebar {
  padding: 14px 12px;
  height: 91vh;
  position: sticky;
  border-radius: 8px;
  border: 1px solid rgba(77, 77, 77, 0.44);

  top: 0px;

  .active-tab {
    background: #4d5562;
    span {
      color: white;
    }
    img {
      filter: brightness(0) invert(1);
    }
  }
  .v-list-item {
    padding: 12px 12px !important;
    min-height: 50px !important;
    max-height: 50px !important;
  }
  .v-list-item {
    border-radius: 4px;
    img {
      margin-right: 6px;
      width: 22px;
      height: 18px;
    }
  }
  .tab-is-active {
    background: #2e333b !important;
    border-radius: 4px !important;
    div {
      color: white !important;
    }
    img {
      filter: brightness(0) invert(1);
    }
  }

  @media (max-width: 960px) {
    height: 98vh !important;
  }
}
</style>
