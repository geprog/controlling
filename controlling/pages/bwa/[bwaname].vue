<script setup lang="ts">
const route = useRoute();
const { data: bwa, error } = await useFetch(`/api/bwa/${route.params.bwaname}`);
</script>

<template>
  <div class="text-center">
    <UButton class="m-4" color="white" size="md" label="Zurück zur BWA Übersicht" icon="i-heroicons-arrow-left" @click="navigateTo('/collection')" />
    <div v-if="bwa">
      <h1>{{ route.params.bwaname }}</h1>
      <p>{{ bwa }}</p>
    </div>
    <p v-else class="pb-4 text-red-600">{{ error }}:<br> This BWA does not exist! Make sure you are using the right link.</p>
  </div>
</template>