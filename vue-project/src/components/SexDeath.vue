<<<<<<< HEAD:vue-project/src/components/SexDeath.vue
<<<<<<< HEAD:vue-project/src/components/SexDeath.vue
<<<<<<< HEAD:vue-project/src/components/SexDeath.vue
<<<<<<< HEAD:vue-project/src/components/SexDeath.vue
<template> 
  <div>
    <p v-if="cityData.length === 0">Loading data...</p>
    <DeathRatePieChart v-if="deathCounts" :deathCounts="deathCounts" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DeathRatePieChart from './SexPieChart.vue';

const cityData = ref([]);
const deathCounts = ref({ male: 0, female: 0 });

const fetchCityData = async () => {
  try {
    const response = await fetch('https://data.cityofnewyork.us/resource/jb7j-dtam.json');
    if (response.ok) {
      const data = await response.json();
      cityData.value = data;

      let deathsOfMale = 0;
      let deathsOfFemale = 0;

      data.forEach(item => {
        const deaths = parseInt(item.deaths);
        if (!isNaN(deaths)) {
          if (item.sex && item.sex.toLowerCase() === 'm') {
            deathsOfMale += deaths;
          } else if (item.sex && item.sex.toLowerCase() === 'f') {
            deathsOfFemale += deaths;
          }
        }
      });

      deathCounts.value = { male: deathsOfMale, female: deathsOfFemale };
      console.log(`Deaths of Male: ${deathsOfMale}`);
      console.log(`Deaths of Female: ${deathsOfFemale}`);
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
=======
c
>>>>>>> parent of 433a7b0 (changes):vue-project/src/components/CityData.vue
=======
c
>>>>>>> parent of 433a7b0 (changes):vue-project/src/components/CityData.vue
=======
c
>>>>>>> parent of 433a7b0 (changes):vue-project/src/components/CityData.vue
=======
c
>>>>>>> parent of 433a7b0 (changes):vue-project/src/components/CityData.vue
