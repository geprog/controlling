<script setup lang="ts">
import type { Bwa } from '~/server/types';
import { bwaFunctions } from '~/server/utils/functions';
import { reactive, computed } from 'vue';

const route = useRoute();
const isOpen = ref(false);

const { data: bwa, error } = await useFetch(`/api/bwa/${route.params.bwaname as string}`);

const rows = computed(() => {
  if (!bwa.value) {
    return [];
  }
  let rows = [
      {
        name: "Bezeichnung",
        value: bwa.value.name,
      },
      {
        name: "Umsatzerlöse",
        value: bwa.value.revenue,
      },
      {
        name: "Bestandsveränderung FE/UE",
        value: bwa.value.inventoryChange,
      },
      {
        name: "Aktivierte Eigenleistungen",
        value: bwa.value.ownWork,
      },
      {
        name: "Gesamtleistung",
        value: bwaFunctions(bwa.value).totalOutput()
      },
      {
        name: "Material-/Wareneinkauf",
        value: bwa.value.goodsPurchases,
      },
      {
        name: "Rohertrag",
        value: bwaFunctions(bwa.value).grossYield(),
      },
      {
        name: "So. betr. Erlöse",
        value: bwa.value.otherIncome,
      },
      {
        name: "Betrieblicher Rohertrag",
        value: bwaFunctions(bwa.value).operatingGrossYield(),
      },
      {
        name: "Personalkosten",
        value: bwa.value.personnelCosts,
      },
      {
        name: "Raumkosten",
        value: bwa.value.facilityCosts,
      },
      {
        name: "Betriebliche Steuern",
        value: bwa.value.operatingTaxes,
      },
      {
        name: "Versicherungen/Beiträge",
        value: bwa.value.insuranceCosts,
      },
      {
        name: "Besondere Kosten",
        value: bwa.value.specialCosts,
      },
      {
        name: "Fahrzeugkosten (ohne Steuer)",
        value: bwa.value.vehicleCosts,
      },
      {
        name: "Werbe-/Reisekosten",
        value: bwa.value.travelCosts,
      },
      {
        name: "Kosten Warenabgabe",
        value: bwa.value.soldGoodsCosts,
      },
      {
        name: "Abschreibungen",
        value: bwa.value.depreciation,
      },
      {
        name: "Reparatur/Instandhaltung",
        value: bwa.value.maintenance,
      },
      {
        name: "Sonstige Kosten",
        value: bwa.value.otherCosts,
      },
      {
        name: "Gesamtkosten",
        value: bwaFunctions(bwa.value).totalCosts(),
      },
      {
        name: "Betriebsergebnis",
        value: bwaFunctions(bwa.value).operatingResult(),
      },
      {
        name: "Zinsaufwand",
        value: bwa.value.interestExpense,
      },
      {
        name: "Sonstiger neutraler Aufwand",
        value: bwa.value.otherNeutralExpenses,
      },
      {
        name: "Neutraler Aufwand",
        value: bwaFunctions(bwa.value).nonOperatingExpenses(),
      },
      {
        name: "Zinserträge",
        value: bwa.value.interestIncome,
      },
      {
        name: "Sonstiger neutraler Ertrag",
        value: bwa.value.otherNeutralIncome,
      },
      {
        name: "Verrechnete kalk. Kosten",
        value: bwa.value.calculatedImputedCosts,
      },
      {
        name: "Neutraler Ertrag",
        value: bwaFunctions(bwa.value).nonOperatingIncome(),
      },
      {
        name: "Kontenklasse unbesetzt",
        value: bwa.value.accountClassUnassigned,
      },
      {
        name: "Ergebnis vor Steuern",
        value: bwaFunctions(bwa.value).earningsBeforeTaxes(),
      },
      {
        name: "Steuern Einkommen u. Ertrag",
        value: bwa.value.incomeTaxes
      },
      {
        name: "Vorläufiges Ergebnis",
        value: bwaFunctions(bwa.value).earningsAfterTaxes(),
      }
    ];
  rows.forEach(row => {
      row.value = row.value.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
  });
  return rows; 
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

async function deleteFile() {
  if (bwa.value) {
    const response = await $fetch(`/api/bwa/${route.params.bwaname as string}`, {
      method: "DELETE"
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
      <UButton color="white" size="md" label="Zurück zur BWA Übersicht" icon="i-heroicons-arrow-left"
        @click="navigateTo('/bwa/collection')" />
      <div v-if="bwa">
        <UTooltip text="Löschen" :popper="{ arrow: true, placement: 'right' }">
          <UButton color="red" size="md" icon="i-heroicons-trash" @click="isOpen = true" />
        </UTooltip>
      </div>
    </div>
    <div>
      <UModal v-model="isOpen" :overlay="false" :transition="false" prevent-close :ui="{ width: 'w-46' }">
        <div class="px-4 pt-4 flex gap-2">
          <UIcon name="i-heroicons-exclamation-triangle" class="text-red-600 p-" />
          <p class="text-gray-600">Diese BWA wirklich löschen?</p>
        </div>
        <div class="p-4">
          <UButton color="red" size="md" label="Löschen" icon="i-heroicons-trash" :ui="{ container: 'w-4' }" @click="
            deleteFile().then(() => navigateTo('/bwa/collection') as Function)
            " />
          <UButton class="ml-4" color="white" size="md" label="Abbrechen" icon="i-heroicons-x-mark"
            @click="isOpen = false" />
        </div>
      </UModal>
    </div>
    <div v-if="bwa" class="pb-15">
      <div class="overflow-x-auto">

        <UTable class="m-auto max-w-[763px] w-full border-collapse " :rows="rows" />

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
