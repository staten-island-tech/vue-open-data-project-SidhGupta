<script setup>
import DeathRateBarChart from '../components/DeathRateBarChart.vue';
import { ref, onMounted } from 'vue';

const yearDeathCounts = ref({});

const fetchYearDeathCounts = async () => {
  try {
    const response = await fetch('https://data.cityofnewyork.us/resource/jb7j-dtam.json');
    if (response.ok) {
      const data = await response.json();
      const yearCounts = {};

      data.forEach(item => {
        const deaths = parseInt(item.deaths);
        const year = item.year;

        if (!isNaN(deaths) && year) {
          if (!yearCounts[year]) {
            yearCounts[year] = 0;
          }
          yearCounts[year] += deaths;
        }
      });

      yearDeathCounts.value = yearCounts;
    } else {
      console.error('Failed to fetch data:', response.status);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(() => {
  fetchYearDeathCounts();
});
</script>

<template>
  <div>
    <h1>Death Rate Based On Year</h1>
    <DeathRateBarChart v-if="yearDeathCounts" :yearDeathCounts="yearDeathCounts" />
  </div>
</template>

<style scoped>
</style>
