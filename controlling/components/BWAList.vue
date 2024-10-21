<script setup lang="ts">
const { data:bwas } = await useFetch("/api/bwa");
// v-for="(bwa, i) in bwas" :key="i" class="w-[256px] h-[68px] hover:cursor-pointer hover:bg-gray-50 text-lg truncate" @click="navigateTo(`/bwa/${ bwa }`)" >{{ bwa }}

</script>

<template>
    <div class="flex flex-row gap-4 flex-wrap justify-center">
        <div v-for="(bwa, i) in bwas" :key="i" class="hover: rounded-lg bg-white drop-shadow-lg w-[256px] h-[68px] hover:cursor-pointer hover:bg-gray-50 text-lg" @click="navigateTo(`/bwa/${ bwa }`)">
            <p class=" truncate p-5">{{ bwa }}</p>
        </div>
    </div>
</template>