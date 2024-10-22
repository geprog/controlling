<script setup lang="ts">
const route = useRoute();
const { data: bwa, error } = await useFetch(`/api/bwa/${route.params.bwaname}`);

type bwaObject = {[key: string]: string | number}[]

const structuredBWA = bwa.value as bwaObject; 

const rows = structuredBWA ? 
structuredBWA
.map((el) => {
  const x = Object.entries(el).map(ell => {
    const y = ell[0]
    const z = ell[1]
    return { [y]: z }
  })
    return x
}) : []

const tableData = rows.map(itemarry => itemarry.reduce((acc, curretobject) => ({...acc, ...curretobject}), {}))
</script>

<template>
  <div class="text-center">
    <div class="p-4">
      <p>Auswertung für<br>{{ 
        route.params.bwaname.toString().replace(/^\d{2}_|\.xlsx/g, "")
        .replace(/_/g, " ") 
        }}</p>
      <UButton class="mt-4" color="white" size="md" label="Zurück zur BWA Übersicht" icon="i-heroicons-arrow-left" @click="navigateTo('/collection')" />
    </div>
    <div v-if="bwa" class="pb-15">
      <table class="m-auto">
        <thead>
          <tr>
            <th v-for="(value, key) in tableData[0]" :key="key" >{{ key}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in tableData" :key="index" >
            <td v-for="(value, key) in row" :key="key" >{{ value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else class="pb-4 text-red-600">{{ error }}:<br> This BWA does not exist! Make sure you are using the right link.</p>
  </div>
</template>

<style scoped>
table {
  width: 763px;
  border-collapse: collapse;
}

th, td {
  padding: 8px;
  text-align: center;
  border: 1px solid black;
}

th {
  background-color: #f2f2f2
}
</style>