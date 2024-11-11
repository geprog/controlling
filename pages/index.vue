<template>
  <div class="max-w-[512px] m-auto flex flex-col items-center">
    <UButton
      class="mt-4 hover:bg-gray-800"
      size="sm"
      color="black"
      icon="i-heroicons-rectangle-stack"
      label="BWAs"
      @click="navigateTo(`/bwa/collection`)"
    />
  </div>
</template>
