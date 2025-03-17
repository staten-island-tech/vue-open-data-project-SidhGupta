<template>
  <div>
    <h2>Death Rate By Sex</h2>
    <!-- Render the pie chart only once data is loaded -->
    <Pie v-if="chartData" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';

// Register chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

// Define the chart data and options
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

// Accept `deathCounts` as a prop
const props = defineProps({
  deathCounts: {
    type: Object,
    required: true,
  },
});

// Watch for changes to the `deathCounts` prop and update the chart
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
  { immediate: true } // Trigger immediately upon component mount
);
</script>

<style scoped>
/* Optional styling */
</style>
