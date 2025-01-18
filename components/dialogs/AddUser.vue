<template>
  <div>
    <div class="pa-3 px-5 bg-white">
      <div class="mb-5">
        <span class="text-h6 font-weight-regular"
          >{{ item.id ? $t("update") : $t("addNew") }} {{ $t("user") }}</span
        >
        <VDivider></VDivider>
      </div>
      <VForm ref="userForm" @submit.prevent="submitHandler">
        <VRow>
          <!-- title -->
          <VCol class="my-0 py-2" cols="12">
            <VTextField
              variant="outlined"
              :label="$t('form.name')"
              :rules="[ruleRequired]"
              v-model="obj.name"
              name="name"
              placeholder="Jhon Doe"
            />
          </VCol>

          <!-- Email -->
          <VCol class="my-0 py-2" cols="12" md="6">
            <VTextField
              variant="outlined"
              :label="$t('form.email')"
              :rules="[ruleRequired, ruleEmail]"
              v-model="obj.email"
              name="email"
              placeholder="example@gmail.com"
            />
          </VCol>

          <!-- mobile -->
          <VCol class="my-0 py-2" cols="12" md="6">
            <VTextField
              variant="outlined"
              :label="$t('form.phone')"
              :rules="[ruleRequired]"
              v-model="obj.phone"
              id="phone"
              name="phone"
              placeholder="+210800000005"
            />
          </VCol>

          <!-- username -->
          <VCol class="my-0 py-2" cols="12">
            <VTextField
              variant="outlined"
              :label="$t('form.username')"
              :rules="[ruleRequired]"
              v-model="obj.username"
              name="username"
              placeholder="username"
            />
          </VCol>

          <!-- website -->
          <VCol class="my-0 py-2" cols="12">
            <VTextField
              variant="outlined"
              :label="$t('form.website')"
              :rules="[ruleRequired]"
              v-model="obj.website"
              name="website"
              placeholder="www.website.com"
            />
          </VCol>
        </VRow>
        <div class="d-flex align-center justify-space-between my-3">
          <VBtn
            elevation="0"
            variant="outlined"
            class="px-10"
            @click="$emit('close')"
          >
            <span class="text-subtitle-1">{{ $t("cancel") }}</span>
          </VBtn>

          <VBtn
            color="primary"
            elevation="0"
            class="px-10"
            :loading="loading"
            type="submit"
          >
            <span class="text-subtitle-1">{{
              item.id ? $t("update") : $t("addNew")
            }}</span>
          </VBtn>
        </div>
      </VForm>
    </div>
  </div>
</template>

<script setup>
import { useGlobalStore } from "~/stores/Global";

const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
});
const emit = defineEmits(["reRender"]);

const globalStore = useGlobalStore();
const { ruleRequired, ruleEmail } = useFormRules();
const loading = ref(false);
const userForm = ref();

const obj = ref({});

const submitHandler = async () => {
  if (!userForm.value.isValid) return;
  loading.value = true;

  setTimeout(() => {
    if (props.item.id) {
      emit("updateCurrent", obj.value);
    } else {
      obj.value.id = Math.floor(Math.random() * (100 - 20 + 1)) + 20;
      emit("submitNew", obj.value);
    }
    loading.value = false;
    globalStore.showSnack({
      text: props.item.id
        ? "User Updated successfully"
        : "New User added successfully",
      color: "success",
    });
  }, 1200);
};

onMounted(async () => {
  if (props.item) {
    obj.value = { ...props.item };
  }
});
</script>

<style lang="scss"></style>
