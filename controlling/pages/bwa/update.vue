<script setup lang="ts">
import { ref } from 'vue';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { DatePicker as VCalendarDatePicker } from 'v-calendar';
import 'v-calendar/dist/style.css';

const date = ref(new Date());
</script>

<template>
    <div class="p-4 w-[512px] m-auto flex flex-col items-center">
      <p class="text-center">Hier kannst du eine neue BWA hochladen (nur Excel-Dateien). Gib den Monat ein, für die du die BWA hochladen möchtest.</p>
      <UPopover class="mt-4" :popper="{ placement: 'bottom-start' }">
          <UButton icon="i-heroicons-calendar-days-20-solid" color="black" :label="format(date, 'MMM, yyy', { locale: de })" /> <!-- Use the German locale -->

          <template #panel="{ close }">
            <VCalendarDatePicker v-model="date" is-required color="gray" @close="close" />
          </template>
      </UPopover>

      <div class="pt-4 font-bold">
        <p>Deine Datei wird in "{{ format(date, 'dd MMMM yyy', { locale: de }).replace(/\s/g, "_") }}.xlsx" umbenannt</p> <!-- Use the German locale -->
      </div>
      <FileDropzone class="mt-4 border border-dashed border-gray-900 p-2" backend-url="/api/bwa" :date/>
      <UButton class="mt-4 hover:bg-gray-800" size="md" color="black" icon="i-heroicons-x-mark" label="Abrechen" @click="navigateTo('/collection')" />
    </div>
</template>
