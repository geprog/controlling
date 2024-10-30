<script setup lang="ts">
const date = defineModel<string>()

const datesArray: string[] = [];
let year: number = new Date().getFullYear();

// Function to load current year's months initially and previous years
function loadMoreDates(): string[] {
  if (datesArray.length === 0) {
    // Initial load: add all months of the current year
    for (let month = 0; month < 12; month++) {
      datesArray.push(formatMonthYear(month, year));
    }
  } else {
    // Load previous year's months
    year--;
    for (let month = 0; month < 12; month++) {
      datesArray.push(formatMonthYear(month, year));
    }
  }
  return datesArray;
}

// Helper function to format date as "Month Year"
function formatMonthYear(month: number, year: number): string {
  const date = new Date(year, month);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
  };
  return date.toLocaleDateString("de-DE", options);
}
// init
loadMoreDates()
</script>

<template>
  <div>
    <div class="flex mt-4">
      <USelectMenu
        v-model="date"
        class="w-48"
        searchable
        searchable-placeholder="Suche..."
        placeholder="Wähle ein Datum aus"
        :options="datesArray"
        :ui="{ rounded: 'rounded-r-none' }"
      />
      <UTooltip text="Mehr laden..." :popper="{ arrow: true, placement: 'right' }">
        <UButton
        class="hover:bg-gray-800"
          color="black"
          icon="i-heroicons-arrow-path"
          :ui="{ rounded: 'rounded-l-none' }"
          @click="loadMoreDates()"
        />
      </UTooltip>
    </div>
  </div>
</template>
