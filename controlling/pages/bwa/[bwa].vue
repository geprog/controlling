
<script setup lang="ts">
const route = useRoute()
    
const getBwa = useFetch(`/api/bwa/${route.params.bwa}`)

const bwa = getBwa.data;

</script>

<template>
    <div class="text-center">
        <UButton class="m-4" color="white" size="md" label="Zurück zur BWA Übersicht" icon="i-heroicons-arrow-left" @click="navigateTo('/collection')" />
        <div v-if="bwa">
            <h1>{{ route.params.bwa }}</h1>
            <p>{{ bwa }}</p>
        </div>
        <p v-else class="pb-4">{{ getBwa.error }}:<br> This BWA does not exists! Make sure you are using the right link.</p>
    </div>
</template>
