<template>
  <div class="h-screen">
    <div class="p-4 w-[512px] m-auto flex flex-col items-center">
      <p class="text-center">
        Hier findest du alle Betriebswirtschaftlichen Auswertungen und kannst
        neue hinzufügen.
      </p>
      <UButton
        class="mt-4 hover:bg-gray-800"
        size="md"
        color="black"
        icon="i-heroicons-rectangle-stack"
        label="BWAs hinzufügen"
        @click="navigateTo('/bwa/update')"
      />
      <UButton
        class="mt-4 hover:bg-gray-800"
        size="md"
        color="black"
        icon="i-heroicons-eye"
        label="Alle BWAs anzeigen"
        @click="navigateTo('/bwa')"
      />
    </div>

    <div class="flex flex-row justify-center p-4 max-w-[1024px] m-auto">
      <BWAList />
    </div>
  </div>
</template>

<script setup lang="ts"></script>
