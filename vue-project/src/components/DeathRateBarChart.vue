<template>
    <div>
      <h2>Death Rate By Year</h2>
      <Bar v-if="chartData" :data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { Bar } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
  
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
    yearDeathCounts: {
      type: Object,
      required: true,
    },
  });
  
  watch(
    () => props.yearDeathCounts,
    (newCounts) => {
      chartData.value = {
        labels: Object.keys(newCounts),
        datasets: [
          {
            label: 'Death Rate by Year',
            data: Object.values(newCounts),
            backgroundColor: '#42A5F5',
          },
        ],
      };
    },
    { immediate: true } 
  );
  </script>
  
  <style scoped>
  </style>
  