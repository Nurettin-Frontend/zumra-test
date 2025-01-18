<template>
  <div class="my-5">
    <h2>{{ $t('analytics.title') }}</h2>
    <apexchart
      class="mt-5"
      type="area"
      :options="chartOptions"
      :series="chartSeries"
      v-once
    />
  </div>
</template>

<script setup>
useHead({
  title: "Analytics",
});
definePageMeta({
  middleware: "profile",
});

const chartSeries = ref([
  {
    name: "User Registrations",
    data: [20, 15, 25, 5, 45],
  },
]);

const chartOptions = ref({
  chart: {
    height: 350,
    type: "line",
  },
  title: {
    text: "User Registrations (Last 5 Weeks)",
    align: "center",
  },
  xaxis: {
    categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
  },
  colors: ["#42A5F5"],
});
</script>

<style scoped>
div {
  max-width: 800px;
  margin: 0 auto;
}
</style>
