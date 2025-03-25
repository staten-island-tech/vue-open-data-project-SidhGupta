<!-- src/components/CityData.vue -->
<template>
  <div>
    <h1>City Data</h1>
    <p v-if="cityData.length === 0">Loading data...</p>
    <DeathRatePieChart v-if="deathCounts" :deathCounts="deathCounts" />
    <DeathRateBarChart v-if="yearDeathCounts" :yearDeathCounts="yearDeathCounts" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DeathRatePieChart from './DeathRatePieChart.vue';
import DeathRateBarChart from './DeathRateBarChart.vue';

const cityData = ref([]);
const deathCounts = ref({ male: 0, female: 0 });
const yearDeathCounts = ref({});

const fetchCityData = async () => {
  try {
    const response = await fetch('https://data.cityofnewyork.us/resource/jb7j-dtam.json');
    if (response.ok) {
      const data = await response.json();
      cityData.value = data;

      let deathsOfMale = 0;
      let deathsOfFemale = 0;
      const yearCounts = {};

      data.forEach(item => {
        const deaths = parseInt(item.deaths);
        const year = item.year;

        if (!isNaN(deaths)) {
          if (item.sex && item.sex.toLowerCase() === 'm') {
            deathsOfMale += deaths;
          } else if (item.sex && item.sex.toLowerCase() === 'f') {
            deathsOfFemale += deaths;
          }

          // Aggregate deaths by year
          if (year && deaths) {
            if (!yearCounts[year]) {
              yearCounts[year] = 0;
            }
            yearCounts[year] += deaths;
          }
        }
      });

      deathCounts.value = { male: deathsOfMale, female: deathsOfFemale };
      yearDeathCounts.value = yearCounts;

      console.log(`Deaths of Male: ${deathsOfMale}`);
      console.log(`Deaths of Female: ${deathsOfFemale}`);
      console.log('Yearly Death Counts:', yearCounts);
    } else {
      console.error('Failed to fetch data:', response.status);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(() => {
  fetchCityData();
});
</script>

<style scoped>
</style>
