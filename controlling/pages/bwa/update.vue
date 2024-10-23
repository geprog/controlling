<script setup lang="ts">
import { ref, watch } from 'vue';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

const date = ref<Date>(new Date());
const isBlinking = ref<boolean>(false);

watch(date, () => {
  isBlinking.value = true;
  setTimeout(() => {
    isBlinking.value = false;
  }, 500);
});
</script>

<template>
  <div class="p-4 w-[512px] m-auto flex flex-col items-center">
    <p class="text-center">
      Hier kannst du eine neue BWA hochladen (nur Excel-Dateien). Gib den Monat ein, für die du die BWA hochladen
      möchtest.
    </p>

    <DatePicker v-model="date" />

    <div class="pt-4 font-bold">
      <p :class="{ blink: isBlinking }">
        Deine Datei wird in "{{ format(date, 'dd MMMM yyy', { locale: de }).replace(/\s/g, "_") }}.xlsx" umbenannt
      </p>
    </div>
    <FileDropzone class="mt-4 border border-dashed border-gray-900 p-2" backend-url="/api/bwa" :date />
    <UButton
class="mt-4 hover:bg-gray-800" size="md" color="black" icon="i-heroicons-x-mark" label="Abbrechen"
      @click="navigateTo('/bwa/collection')" />
  </div>
</template>

<style>
.blink {
  animation: blink-animation 0.5s forwards;
}

@keyframes blink-animation {
  0% {
    background-color: transparent;
    color: inherit;
  }

  50% {
    background-color: #ffeb3b;
    color: black;
  }

  100% {
    background-color: transparent;
    color: inherit;
  }
}
</style>
