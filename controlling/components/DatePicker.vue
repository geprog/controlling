<script setup lang="ts">
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { DatePicker as VCalendarDatePicker } from './../node_modules/v-calendar';
import 'v-calendar/dist/style.css';

const date = defineModel<Date>({ default: new Date() })

const handleDateSelect = ({ close }: { close: () => void }) => {
  close()
}
</script>

<template>
  <UPopover class="mt-4" :popper="{ placement: 'bottom-start' }">
    <UButton 
      icon="i-heroicons-calendar-days-20-solid" 
      color="black" 
      :label="format(date, 'MMM yyy', { locale: de })" 
    />

    <template #panel="{ close }">
      <VCalendarDatePicker 
        v-model="date" 
        is-required 
        color="gray" 
        @update:model-value="handleDateSelect({ close })"
      />
    </template>
  </UPopover>
</template>