<script setup lang="ts">
const { data:bwas } = useFetch("/api/bwa");

</script>

<template>
    <div>
        <UCard v-for="(bwa, i) in bwas" :key="i" class="w-[256px] hover:cursor-pointer hover:bg-gray-50 text-lg" @click="navigateTo(`/bwa/${ bwa }`)" >{{ bwa }}</UCard>
    </div>
</template>