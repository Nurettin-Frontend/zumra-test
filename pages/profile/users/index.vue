<template>
  <div class="my-4">
    <div class="d-flex align-center justify-space-between">
      <h2>{{ $t("users") }}</h2>
      <v-btn
        height="40px"
        :elevation="0"
        color="primary"
        @click="openUserDialog"
      >
        <span class="text-subtitle-1">{{ $t("addNewUser") }}</span>
      </v-btn>
    </div>
    <div class="d-flex justify-end">
      <VSelect
        variant="outlined"
        :items="filters"
        v-model="selectedFilter"
        :label="$t('filters')"
        :placeholder="$t('filterBy')"
        item-title="name"
        item-value="value"
        return-object
        class="custom-select"
        @update:modelValue="filterUsersHandler"
        clearable
      ></VSelect>
    </div>
    <v-data-table
      class="mt-4 border-1 rounded-sm custom-table"
      :headers="headers"
      :items="items"
      :mobile-breakpoint="0"
      :loading="loadingData"
      :items-per-page="itemsPerPage"
      hide-default-footer
    >
      <template v-slot:headers="{ props }">
        <tr v-once>
          <th v-for="header in headers" :key="header.value">
            {{ $t(header.title) }}
          </th>
        </tr>
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="d-flex align-center justify-center">
          <v-btn @click="$router.push(`/profile/users/${item.id}`)"
            ><v-icon>mdi-eye</v-icon></v-btn
          >
          <v-btn @click="openUserDialog(item)" class="mx-2"
            ><v-icon>mdi-pencil</v-icon></v-btn
          >
          <v-btn color="error" @click="openDeleteDialog(item)"
            ><v-icon>mdi-delete</v-icon></v-btn
          >
        </div>
      </template>
    </v-data-table>

    <v-pagination
      v-model="page"
      class="my-4"
      :length="total"
      @update:modelValue="fetchDataHandler"
    ></v-pagination>

    <!-- delete dialog -->
    <VDialog max-width="500" content-class="bg-white" v-model="deleteDialog">
      <DialogsDeleteItem
        :loading="loadingDelete"
        :name="selectedItem.name"
        @close="deleteDialog = false"
        @deleteHandler="deleteItemHandler"
      ></DialogsDeleteItem>
    </VDialog>

    <!-- add/edit address dialog -->
    <VDialog max-width="600" content-class="bg-white" v-model="addDialog">
      <DialogsAddUser
        :loading="loadingAdd"
        :item="selectedItem"
        @close="addDialog = false"
        @submitNew="submitNewHandler"
        @updateCurrent="updateCurrentHandler"
      ></DialogsAddUser>
    </VDialog>
  </div>
</template>

<script setup>
import { getUsersAPI } from "~/services/Users";
import { useGlobalStore } from "~/stores/Global";

useHead({
  title: "Users",
});

definePageMeta({
  middleware: "profile",
});

const itemsPerPage = ref(10);
const page = ref(1);
const total = ref(3);

const globalStore = useGlobalStore();

const loadingData = ref(false);
const loadingDelete = ref(false);

const headers = ref([
  { title: "id", key: "id", sortable: false },
  { title: "form.name", key: "name", sortable: false, minWidth: 300 },
  { title: "form.email", key: "email", sortable: false, minWidth: 300 },
  { title: "form.phone", key: "phone", sortable: false, minWidth: 300 },
  { title: "form.username", key: "username", sortable: false, minWidth: 300 },
  { title: "form.website", key: "website", sortable: false, minWidth: 300 },
  { title: "actions", key: "actions", align: "center", sortable: false },
]);
const items = ref([]);
const itemsCopy = ref([]);
const filters = ref([
  { name: "A-Z", value: "asc" },
  { name: "Z-A", value: "desc" },
]);

const deleteDialog = ref(false);
const addDialog = ref(false);
const selectedItem = ref({});
const selectedFilter = ref(null);
const params = ref({
  _start: 1,
  _limit: 5,
  _order: "asc",
});

// open new address dialog
const openUserDialog = async (item = null) => {
  selectedItem.value = item;
  addDialog.value = true;
};

// open delete dialog
const openDeleteDialog = async (item) => {
  selectedItem.value = item;
  deleteDialog.value = true;
};

// delete address
const deleteItemHandler = async () => {
  loadingDelete.value = true;

  setTimeout(() => {
    loadingDelete.value = false;
    items.value = items.value.filter(
      (item) => item.id != selectedItem.value.id
    );
    globalStore.showSnack({
      text: `User Deleted successfully`,
      color: "success",
    });
    selectedItem.value = {};
    deleteDialog.value = false;
  }, 1200);
};

const submitNewHandler = (newObj) => {
  items.value = [newObj, ...items.value];
  addDialog.value = false;
};

const updateCurrentHandler = (updatedObj) => {
  items.value = items.value.map((item) =>
    item.id == updatedObj.id ? updatedObj : item
  );
  addDialog.value = false;
};

// get addresses
const filterUsersHandler = async () => {
  if (selectedFilter.value == null) {
    console.log("selectedFilter", selectedFilter);
    items.value = itemsCopy.value;
    return;
  }
  items.value.sort((a, b) => {
    if (a.name < b.name) return selectedFilter?.value?.value == "asc" ? -1 : 1;
    if (a.name > b.name) return selectedFilter?.value?.value == "asc" ? 1 : -1;
    return 0;
  });
};

// get addresses
const fetchDataHandler = async (page = 1) => {
  loadingData.value = true;
  params.value._start = page;
  let res = await getUsersAPI(params.value);
  loadingData.value = false;
  items.value = [...res.data];
  itemsCopy.value = [...res.data];
};

onMounted(async () => {
  setTimeout(() => {
    fetchDataHandler();
  }, 200);
});
</script>

<style lang="scss">
.custom-select {
  max-width: 320px;
  margin-top: 20px;
}

.custom-table td {
  min-width: 200px; /* Ensure mobile column has appropriate width */
}
.custom-table td:nth-child(1) {
  min-width: min-content !important;
}
</style>
