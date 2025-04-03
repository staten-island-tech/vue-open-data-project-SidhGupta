<script setup>
import { ref, onMounted } from 'vue';

const cityData = ref([]);
const deathCounts = ref({ male: 0, female: 0 });
const yearDeathCounts = ref({});
const causeDeathCounts = ref({}); 

const fetchCityData = async () => {
  try {
    const response = await fetch('https://data.cityofnewyork.us/resource/jb7j-dtam.json');
    if (response.ok) {
      const data = await response.json();
      cityData.value = data;

      let deathsOfMale = 0;
      let deathsOfFemale = 0;
      const yearCounts = {};
      const causeCounts = {};

      data.forEach(item => {
        const deaths = parseInt(item.deaths);
        const year = item.year;
        const cause = item.leading_cause;

        if (!isNaN(deaths)) {
          if (item.sex && item.sex.toLowerCase() === 'm') {
            deathsOfMale += deaths;
          } else if (item.sex && item.sex.toLowerCase() === 'f') {
            deathsOfFemale += deaths;
          }

          if (year && deaths) {
            if (!yearCounts[year]) {
              yearCounts[year] = 0;
            }
            yearCounts[year] += deaths;
          }

          if (cause && deaths) {
            if (!causeCounts[cause]) {
              causeCounts[cause] = 0;
            }
            causeCounts[cause] += deaths;
          }
        }
      });

      deathCounts.value = { male: deathsOfMale, female: deathsOfFemale };
      yearDeathCounts.value = yearCounts;
      causeDeathCounts.value = causeCounts;

      console.log(`Deaths of Male: ${deathsOfMale}`);
      console.log(`Deaths of Female: ${deathsOfFemale}`);
      console.log('Yearly Death Counts:', yearCounts);
      console.log('Death Counts by Cause:', causeCounts);
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

<template>
  <div>
    <h1>Cards of Data</h1>
    
    <div class="card-container">
      <div class="card">
        <h3>Yearly Death Counts</h3>
        <div v-for="(count, year) in yearDeathCounts" :key="year">
          <p><strong>{{ year }}:</strong> {{ count }} deaths</p>
        </div>
      </div>

      <div v-for="(count, cause) in causeDeathCounts" :key="cause" class="card">
        <h3>{{ cause }}</h3>
        <p><strong>Total Deaths:</strong> {{ count }} deaths</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
  width: 250px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card h3 {
  margin-bottom: 10px;
}

.card p {
  margin: 5px 0;
}
</style>
