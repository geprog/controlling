<script setup lang="ts">
const route = useRoute();
const { data: bwa, error } = await useFetch(`/api/bwa/${route.params.bwaname}`);

type bwaObject = {[key: string]: string | number}[]

const structuredBWA = bwa.value as bwaObject; 

// console.log(structuredBWA)

// function filterBWA (arr: any[]):any[] {
//   return arr.filter(obj => obj.Bezeichnung !== ' ');
// }

const filteredBWAs = structuredBWA.filter(bwa => bwa["Dec-22"] !== ' ')

console.log(filteredBWAs)
</script>

<template>
  <div class="text-center">
    <UButton class="m-4" color="white" size="md" label="Zurück zur BWA Übersicht" icon="i-heroicons-arrow-left" @click="navigateTo('/collection')" />
    <div v-if="bwa" class="max-w-[763px] m-auto border border-black">
      <UTable :rows="filteredBWAs" />
    </div>
    <p v-else class="pb-4 text-red-600">{{ error }}:<br> This BWA does not exist! Make sure you are using the right link.</p>
  </div>
</template>