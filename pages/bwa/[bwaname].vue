<script setup lang="ts">
const route = useRoute();
// modal state
const isOpen = ref(false);

const { data: bwa, error } = await useFetch(`/api/bwa/${route.params.bwaname}`);

type bwaObject = { [key: string]: string | number }[];

const structuredBWA = bwa.value as bwaObject;

const rows = structuredBWA
  ? structuredBWA.map((el) => {
      const x = Object.entries(el).map((ell) => {
        const y = ell[0];
        const z = ell[1];
        return { [y]: z };
      });
      return x;
    })
  : [];

const tableData = rows.map((itemArr) =>
  itemArr.reduce((acc, curretobject) => ({ ...acc, ...curretobject }), {})
);

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

async function deleteFile() {
  if (bwa.value) {
    const response = await $fetch("/api/bwa/deleteFile", {
      method: "POST",
      body: { fileName: route.params.bwaname },
    });
    notificationService(response.message, response.success);
  } else {
    notificationService(
      "Ein unerwarteter Fehler ist aufgetreten, bitte melde, wenn möglich wie dieser Fehler aufgetreten ist",
      false
    );
  }
}
</script>

<template>
  <div class="mt-4">
    <div class="text-center">
      <p>
        Auswertung für<br />{{
          route.params.bwaname
            .toString()
            .replace(/.xlsx/g, "")
            .replace(/ae/, "ä")
            .replace(/_/g, " ")
        }}
      </p>
    </div>
    <div class="flex justify-center gap-4 my-4">
      <UButton
        color="white"
        size="md"
        label="Zurück zur BWA Übersicht"
        icon="i-heroicons-arrow-left"
        @click="navigateTo('/bwa/collection')"
      />
      <div v-if="bwa">
        <UTooltip text="Löschen" :popper="{ arrow: true, placement: 'right' }">
          <UButton
            color="red"
            size="md"
            icon="i-heroicons-trash"
            @click="isOpen = true"
          />
        </UTooltip>
      </div>
    </div>
    <div>
      <UModal
        v-model="isOpen"
        :overlay="false"
        :transition="false"
        prevent-close
        :ui="{ width: 'w-46' }"
      >
        <div class="px-4 pt-4 flex gap-2">
          <UIcon
            name="i-heroicons-exclamation-triangle"
            class="text-red-600 p-"
          />
          <p class="text-gray-600">Diese BWA wirklich löschen?</p>
        </div>
        <div class="p-4">
          <UButton
            color="red"
            size="md"
            label="Löschen"
            icon="i-heroicons-trash"
            :ui="{ container: 'w-4' }"
            @click="
              deleteFile().then(() => navigateTo('/bwa/collection') as Function)
            "
          />
          <UButton
            class="ml-4"
            color="white"
            size="md"
            label="Abbrechen"
            icon="i-heroicons-x-mark"
            @click="isOpen = false"
          />
        </div>
      </UModal>
    </div>
    <div v-if="bwa" class="pb-15">
      <div class="overflow-x-auto">
        <table class="m-auto max-w-[763px] w-full border-collapse">
          <thead>
            <tr>
              <th
                v-for="(_value, key) in tableData[0]"
                :key="key"
                class="p-2 text-center border border-black bg-zinc-200"
              >
                {{ key }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in tableData" :key="index">
              <td
                v-for="(value, key) in row"
                :key="key"
                class="p-2 text-center border border-black"
              >
                {{ value }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <p v-else class="pb-4 text-red-600 text-center">
      {{
        error
          ? "Diese BWA existiert nicht! Vergewisser dich, dass der richtige Link verwendet wird | " +
            error
          : "Ein unerwarteter Fehler ist aufgetreten, bitte melde, wenn möglich wie dieser Fehler aufgetreten ist"
      }}
    </p>
  </div>
</template>
