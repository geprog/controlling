<template>
  <div>
    <div ref="dropRef" class="dropzone" />
    <div v-if="errorMessage" class="text-red-600 font-bold">Error: {{ errorMessage }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Dropzone } from "@deltablot/dropzone";
import { format } from "date-fns";
import { de } from 'date-fns/locale';

const props = defineProps({
  paramName: {
    type: String,
    default: "file",
  },
  token: {
    type: String,
    default: "",
  },
  backendUrl: {
    type: String,
    default: "/api",
  },
  date: Date,
});

const dropRef = ref(null);
const errorMessage = ref();

const customPreview = ref(`
        <div class="d-flex flex-wrap dz-processing">
            <div class="dz-progress">
              <span class="dz-upload" data-dz-uploadprogress></span>
            </div>
        </div>
      `);

onMounted(() => {
  if (dropRef.value !== null) {
    const dropzone = new Dropzone(dropRef.value, {
      url: props.backendUrl,
      method: "POST",
      acceptedFiles: ".xlsx",
      previewTemplate: customPreview.value,
      renameFile: () => format(props.date, "dd MMMM yyyy", { locale: de }) + ".xlsx",
    });
    dropzone.on("error", (file, error) => {
      errorMessage.value = error.message;
    });
    dropzone.on("success", () => {
      navigateTo("/bwa/collection")
    });
  }
});
</script>
