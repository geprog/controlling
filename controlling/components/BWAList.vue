<script setup lang="ts">
const { data:bwas } = await useFetch("/api/bwa");

const monthMap: Record<string, number> = {
  'Januar': 0, 
  'Februar': 1,
  'März': 2,
  'April': 3,
  'Mai': 4,
  'Juni': 5,
  'Juli': 6,
  'August': 7,
  'September': 8,
  'Oktober': 9,
  'November': 10,
  'Dezember': 11
};

function convertToDate(fileName: string) {
    const [month, year] = fileName.split('_');
    return new Date(parseInt(year.replace('.xlsx', '')), monthMap[month.replace(/ae/, "ä")])
}

bwas.value?.sort((a, b) => convertToDate(a).getTime() - convertToDate(b).getTime())
</script>

<template>
    <div class="flex flex-row gap-4 flex-wrap justify-center">
        <div v-for="(bwa, i) in bwas" :key="i" class="hover: rounded-lg bg-white drop-shadow-lg w-[256px] h-[68px] hover:cursor-pointer hover:bg-gray-50 text-lg" @click="navigateTo(`/bwa/${ bwa }`)">
            <p class=" truncate p-5">{{ 
                bwa.replace(/^\d{2}_|\.xlsx/g, "")
                .replace(/_/g, " ")
                .replace(/ae/, "ä")
                }}</p>
        </div>
    </div>
</template>