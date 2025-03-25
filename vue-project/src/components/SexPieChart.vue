<template>
  <div>
<<<<<<< HEAD:vue-project/src/components/SexPieChart.vue
    <h1>Death Rate By Sex</h1>
=======
    <h2>Death Rate by Sex</h2>
    <!-- Render the pie chart only once data is loaded -->
>>>>>>> parent of 433a7b0 (changes):vue-project/src/components/DeathRatePieChart.vue
    <Pie v-if="chartData" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
<<<<<<< HEAD:vue-project/src/components/SexPieChart.vue
import { ref, watch } from 'vue'
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js'
=======
import { ref, onMounted } from 'vue';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
>>>>>>> parent of 433a7b0 (changes):vue-project/src/components/DeathRatePieChart.vue

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

<<<<<<< HEAD:vue-project/src/components/SexPieChart.vue
const chartData = ref(null)
=======
// Reactive data for the chart
const chartData = ref(null);
>>>>>>> parent of 433a7b0 (changes):vue-project/src/components/DeathRatePieChart.vue
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

<<<<<<< HEAD:vue-project/src/components/SexPieChart.vue
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
      labels: ['Male', 'Female'],
      datasets: [
        {
          label: 'Death Rate',
          data: [newCounts.male, newCounts.female],
          backgroundColor: ['#36A2EB', '#FF6384'],
        },
      ],
    }
  },
  { immediate: true },
)
=======
// Function to fetch and process data
const fetchData = async () => {
  try {
    const response = await fetch('https://data.cityofnewyork.us/resource/jb7j-dtam.json');
    if (response.ok) {
      const data = await response.json();
      
      // Initialize the counts for male and female
      let sexCount = { m: 0, f: 0 };

      // Loop through the data and calculate the death counts by sex
      data.forEach(item => {
        console.log('Sex:', item.sex, 'Deaths:', item.deaths);  // Log the sex and deaths for debugging
        const deaths = parseInt(item.deaths);
        
        // Check if deaths is a valid number
        if (!isNaN(deaths)) {
          if (item.sex && item.sex.toLowerCase() === 'm') {
            sexCount.m += deaths;
          } else if (item.sex && item.sex.toLowerCase() === 'f') {
            sexCount.f += deaths;
          }
        }
      });

      // Prepare the data for the pie chart
      chartData.value = {
        labels: ['Male', 'Female'],
        datasets: [
          {
            label: 'Death Rate',
            data: [sexCount.m, sexCount.f],
            backgroundColor: ['#36A2EB', '#FF6384'],
            hoverBackgroundColor: ['#36A2EB', '#FF6384'],
          },
        ],
      };
    } else {
      console.error('Failed to fetch data:', response.status);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Fetch data when the component is mounted
onMounted(() => {
  fetchData();
});
>>>>>>> parent of 433a7b0 (changes):vue-project/src/components/DeathRatePieChart.vue
</script>

<style scoped></style>
