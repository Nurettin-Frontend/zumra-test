<template>
  <h1>{{ $t("signIn") }}</h1>
  <p class="text-medium-emphasis">{{ $t("enterDetails") }}</p>

  <VForm ref="loginForm" @submit.prevent="submitHandler" class="mt-7">
    <div class="mt-3">
      <VTextField
        :label="$t('form.emailAddress')"
        :rules="[ruleRequired, ruleEmail]"
        v-model="obj.email"
        id="email"
        name="email"
        placeholder="example@gmail.com"
        variant="outlined"
      />
    </div>

    <div class="mt-3">
      <VTextField
        :label="$t('form.password')"
        type="password"
        :rules="[ruleRequired, rulePassLen]"
        v-model="obj.password"
        id="password"
        name="password"
        placeholder="*********"
        variant="outlined"
      />
    </div>
    <div class="mt-5">
      <VBtn
        type="submit"
        block
        color="primary"
        min-height="44"
        class="gradient primary"
        :loading="loading"
        >{{ $t("signIn") }}</VBtn
      >
    </div>
  </VForm>

  <div class="mt-5">
    <span class="d-block font-18 mb-1">{{ $t("forAccountDetails") }}: </span>
    <v-divider class="mb-2"></v-divider>
    <span class="d-block font-18"
      ><b>{{ $t("form.email") }}: </b> admin@gmail.com</span
    >
    <span class="d-block font-18"
      ><b>{{ $t("form.password") }}: </b> 123456
    </span>
  </div>
</template>

<script setup>
import { useGlobalStore } from "~/stores/Global";
import { useAuthStore } from "../../stores/AuthStore";

definePageMeta({
  layout: "auth",
  middleware: "auth",
});
useHead({
  title: "Login",
});
const globalStore = useGlobalStore();
const authStore = useAuthStore();
const router = useRouter();

const { ruleRequired, ruleEmail, rulePassLen } = useFormRules();

const obj = ref({});
const loading = ref(false);
const loginForm = ref();

const submitHandler = async () => {
  if (!loginForm.value.isValid) return;

  if (obj.value.email != "admin@gmail.com" || obj.value.password != "123456") {
    globalStore.showSnack({
      text: "Wrong email or password please check again",
      color: "error",
    });
    return;
  }

  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    globalStore.showSnack({
      text: `Logged successfully`,
      color: "success",
    });
    obj.value.fullName = "Admin";
    authStore.setUserDetails(obj.value);
    localStorage.setItem("userDetails", JSON.stringify(obj.value));
    localStorage.setItem("token", "token123456");
    router.push("/");
  }, 1500);
};
</script>
