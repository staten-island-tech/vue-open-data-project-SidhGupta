<template>
  <div>
    <h1>Death Rate By Sex</h1>
    <Pie v-if="chartData" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const chartData = ref(null);
const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          return `${tooltipItem.label}: ${tooltipItem.raw} deaths`;
        },
      },
    },
  },
});

const props = defineProps({
  deathCounts: {
    type: Object,
    required: true,
  },
});

watch(
  () => props.deathCounts,
  (newCounts) => {
    chartData.value = {
      labels: ['Male', 'Female'],
      datasets: [
        {
          label: 'Death Rate',
          data: [newCounts.male, newCounts.female],
          backgroundColor: ['#36A2EB', '#FF6384'],
        },
      ],
    };
  },
  { immediate: true }
);
</script>

<style scoped>
</style>
