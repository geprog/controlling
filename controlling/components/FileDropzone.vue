<template>
  <div class="flex flex-col items-center justify-center">
    <div
      ref="dropRef"
      class="dropzone border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 transition-colors cursor-pointer bg-gray-50 max-w-56 min-h-[120px] flex items-center justify-center"
    >
      <div class="dz-message text-center">
        <p class="text-gray-600 mb-2">
          Excel-Datei hier ablegen oder klicken zum Auswählen
        </p>
        <p class="text-sm text-gray-500">Nur .xlsx Dateien erlaubt</p>
      </div>
    </div>
    <div
      v-if="errorMessage"
      class="mt-4 p-4 bg-red-50 border border-red-200 rounded-md"
    >
      <p class="text-red-600 font-medium text-center">
        Fehler: {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { Dropzone } from "@deltablot/dropzone";

const props = defineProps({
  backendUrl: {
    type: String,
    default: "/api",
  },
  date: {
    type: String,
    default: undefined,
  },
});

const dropRef = ref(null);
const errorMessage = ref("");

// INFO: kann in der previewTemplate option genutzt werden und ist ein weg den upload progress anzuzeigen

// const customPreview = ref(`
//   <div class="p-4 bg-white border rounded-lg shadow-sm mt-4">
//      <div class="flex items-center justify-between mb-2">
//        <span class="text-sm font-medium text-gray-700" data-dz-name></span>
//        <div class="flex items-center">
//          <span class="text-sm text-gray-500" data-dz-size></span>
//        </div>
//     </div>
//      <div class="w-full bg-gray-200 rounded-full h-2.5">
//      <div class="bg-blue-500 h-2.5 rounded-full transition-all"
//          style="width: 0%" data-dz-uploadprogress>
//        </div>
//      </div>
//    </div>
//  `);

const formattedFileName = computed(() => {
  if (props.date) {
    return props.date.replace(/\s/g, "_").replace(/ä/g, "ae") + ".xlsx";
  }
  return "";
});

onMounted(() => {
  if (dropRef.value !== null) {
    const dropzoneInstance = new Dropzone(dropRef.value, {
      url: props.backendUrl,
      method: "POST",
      maxFiles: 1,
      acceptedFiles: ".xlsx",
      previewTemplate: "<div></div>",
      accept: function (
        file: { upload: { filename: string } },
        done: (error?: Error | string) => void
      ) {
        if (props.date) {
          file.upload.filename = formattedFileName.value;
          done();
        } else {
          done(new Error("Bitte wähle ein Datum aus"));
          dropzoneInstance.removeFile(file);
        }
      },
    });

    dropzoneInstance.on("error", (file: object, error: { message: string }) => {
      dropzoneInstance.removeFile(file);
      errorMessage.value = error.message;
    });

    dropzoneInstance.on("success", () => {
      navigateTo(`${formattedFileName.value}`);
    });
  }
});
</script>

<style scoped>
.dropzone.dz-drag-hover {
  border-color: rgb(59 130 246);
  background-color: rgb(239 246 255);
}
</style>
