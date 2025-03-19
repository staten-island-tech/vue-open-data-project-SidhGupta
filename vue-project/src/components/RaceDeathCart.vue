<template>
    <div>
      <h1>Death Rate By Race</h1>
      <Pie v-if="chartData" :data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { Line } from 'vue-chartjs';
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
        labels: ['2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014'],
        datasets: [
          {
            label: 'Death Rate',
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
  