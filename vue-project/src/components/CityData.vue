<!-- src/components/CityData.vue -->
<template>
    <div>
      <h2>City Data</h2>
      <ul v-if="cityData.length">
        <li v-for="(item, index) in cityData" :key="index">
          {{ item.name }}: {{ item.value }}
        </li>
      </ul>
      <p v-else>Loading data...</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  // Reactive variable to store the city data
  const cityData = ref([]);
  
  // Function to fetch city data from the API
  const fetchCityData = async () => {
    try {
      const response = await fetch('https://data.cityofnewyork.us/resource/jb7j-dtam.json');
      if (response.ok) {
        const data = await response.json();
        cityData.value = data;  // Set the fetched data
        console.log('Fetched City Data:', data);  // Log data to the console
      } else {
        console.error('Failed to fetch data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  // Fetch city data when the component is mounted
  onMounted(() => {
    fetchCityData();
  });
  </script>
  
  <style scoped>
  /* Optional styling */
  </style>
  