<template>
  <div>
    <h2>City Data</h2>
    <p v-if="cityData.length === 0">Loading data...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const cityData = ref([]);

const fetchCityData = async () => {
  try {
    const response = await fetch('https://data.cityofnewyork.us/resource/jb7j-dtam.json');
    if (response.ok) {
      const data = await response.json();
      cityData.value = data;  

      let deathsOfMale = 0;
      let deathsOfFemale = 0;

      data.forEach(item => {
        ('Sex:', item.sex, 'Deaths:', item.deaths);  
        const deaths = parseInt(item.deaths);

    
        if (!isNaN(deaths)) {
          if (item.sex && item.sex.toLowerCase() === 'm') {
            deathsOfMale += deaths; 
          } else if (item.sex && item.sex.toLowerCase() === 'f') {
            deathsOfFemale += deaths;  
          }
                }
      });

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
