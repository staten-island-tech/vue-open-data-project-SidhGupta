<template>
  <div>
    <p v-if="cityData.length === 0">Loading data...</p>
    <DeathRateLineChart v-if="deathCounts" :deathCounts="deathCounts" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DeathRateLineChart from './YearDeathLineChart.vue'

const cityData = ref([])
const deathCounts = ref({ 2007: 0, 2008: 0, 2009: 0, 2010: 0, 2011: 0, 2012: 0, 2013: 0, 2014: 0 })

const fetchCityData = async () => {
  try {
    const response = await fetch('https://data.cityofnewyork.us/resource/jb7j-dtam.json')
    if (response.ok) {
      const data = await response.json()
      cityData.value = data

      let deathsOfTwoSeven = 0
      let deathsOfTwoEight = 0
      let deathsOfTwoNine = 0
      let deathsOfTwoTen = 0
      let deathsOfTwoEleven = 0
      let deathsOfTwoTwelve = 0
      let deathsOfTwoThirteen = 0
      let deathsOfTwoFourteen = 0

      data.forEach((item) => {
        const deaths = parseInt(item.deaths)
        if (!isNaN(deaths)) {
          switch (item.year) {
            case '2007':
              deathsOfTwoSeven += deaths
              break
            case '2008':
              deathsOfTwoEight += deaths
              break
            case '2009':
              deathsOfTwoNine += deaths
              break
            case '2010':
              deathsOfTwoTen += deaths
              break
            case '2011':
              deathsOfTwoEleven += deaths
              break
            case '2012':
              deathsOfTwoTwelve += deaths
              break
            case '2013':
              deathsOfTwoThirteen += deaths
              break
            case '2014':
              deathsOfTwoFourteen += deaths
              break
          }
        }
      })

      deathCounts.value = {
        2007: deathsOfTwoSeven,
        2008: deathsOfTwoEight,
        2009: deathsOfTwoNine,
        2010: deathsOfTwoTen,
        2011: deathsOfTwoEleven,
        2012: deathsOfTwoTwelve,
        2013: deathsOfTwoThirteen,
        2014: deathsOfTwoFourteen,
      }
    } else {
      console.error('Failed to fetch data:', response.status)
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(() => {
  fetchCityData()
})
</script>

<style scoped></style>
