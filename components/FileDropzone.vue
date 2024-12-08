<template>
  <div>
    <div
      ref="dropRef"
      class="dropzone border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 transition-colors cursor-pointer bg-gray-50 max-w-56 min-h-[120px] flex flex-col items-center justify-center"
    >
      <div class="dz-message text-center">
        <p class="text-gray-600 mb-2">
          Excel-Datei hier ablegen oder klicken zum Auswählen
        </p>
        <p class="text-sm text-gray-500">Nur .xlsx Dateien erlaubt</p>
      </div>
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
      previewTemplate: `
        <div class="p-4 bg-white border rounded-lg">
          <div class="mb-2 flex">
            <span class="dz-name text-sm font-medium text-gray-700" data-dz-name></span>
            <span class="dz-size text-sm text-gray-500 ml-2 flex" data-dz-size></span>
          </div>
          <div class="bg-gray-200 rounded-full h-2.5">
            <div class="dz-uploadprogress bg-blue-500 h-2.5 rounded-full transition-all" data-dz-uploadprogress></div>
          </div>
        </div>
      `,
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
      notificationService(error.message, false);
    });

    dropzoneInstance.on("success", () => {
      notificationService(
        "BWA erfolgreich hochgeladen und angelegt, du wurdest automatisch weitergeleitet",
        true
      );
      navigateTo(`${formattedFileName.value}`);
    });
  }
});

const toast = useToast();
function notificationService(message: string, type: boolean) {
  if (type) {
    toast.add({
      title: "Erfolg",
      description: message,
      icon: "i-heroicons-check-circle",
      timeout: 10000,
      ui: {
        container: "bg-green-50 border border-green-200",
        title: "font-medium text-green-800",
        description: "text-green-700",
        icon: { color: "bg-green-600" },
        progress: { background: "bg-green-600" },
      },
    });
  } else {
    toast.add({
      title: "Fehler",
      description: message
        ? message
        : "Ein unerwarteter Fehler ist aufgetreten, bitte melde, wenn möglich wie dieser Fehler aufgetreten ist",
      icon: "i-heroicons-exclamation-triangle",
      timeout: 10000,
      ui: {
        container: "bg-red-50 border border-red-200",
        title: "font-medium text-red-800",
        description: "text-red-700",
        icon: { color: "bg-red-600" },
        progress: { background: "bg-red-600" },
      },
    });
  }
}
</script>

<style scoped>
.dropzone.dz-drag-hover {
  border-color: rgb(59 130 246);
  background-color: rgb(239 246 255);
}

.dropzone.dz-started .dz-message {
  display: none;
}
</style>
