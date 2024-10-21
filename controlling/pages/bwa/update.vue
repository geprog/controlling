<script setup lang="ts">
import { format } from 'date-fns'
import { DatePicker as VCalendarDatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css'

const date = ref(new Date())
</script>

<template>
    <div class="p-4 w-[512px] h-screen m-auto flex flex-col items-center">
      <p class="text-center">Hier kannst du eine neue BWA hochladen (nur Excel-Dateien). Gib den Monat ein, für die du die BWA hochladen möchtest.</p>
        
      <UPopover class="mt-4" :popper="{ placement: 'bottom-start' }">
          <UButton icon="i-heroicons-calendar-days-20-solid" color="black" :label="format(date, 'MMM, yyy')" />

          <template #panel="{ close }">
            <VCalendarDatePicker v-model="date" is-required color="gray" @close="close" />
          </template>
      </UPopover>

      <FileDropzone class="mt-4 border border-dashed border-gray-900 p-2" backend-url="/api/bwa"/>
      <UButton class="mt-4 hover:bg-gray-800" size="md" color="black" icon="i-heroicons-x-mark" label="Abrechen" @click="navigateTo('/collection')" />
    </div>
</template>