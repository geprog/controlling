<script setup lang="ts">
const { data:bwas } = useFetch("/api/bwa");

</script>

<template>
    <UCard v-for="(bwa, i) in bwas" :key="i">{{ bwa }}</UCard>
</template>