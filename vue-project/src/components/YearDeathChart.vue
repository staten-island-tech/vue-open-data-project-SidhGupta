<template>
  <div>
    <h1>Death Rate By Year</h1>
    <Bar v-if="chartData" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale)

const chartData = ref(null)
const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          return `${tooltipItem.label}: ${tooltipItem.raw} deaths`
        },
      },
    },
  },
})

const props = defineProps({
  deathCounts: {
    type: Object,
    required: true,
  },
})

watch(
  () => props.deathCounts,
  (newCounts) => {
    chartData.value = {
      labels: Object.keys(newCounts),
      datasets: [
        {
          label: 'Death Rate',
          data: Object.values(newCounts),
          backgroundColor: '#36A2EB',
        },
      ],
    }
  },
  { immediate: true },
)
</script>

<style scoped></style>
