<script setup lang="ts">
import type { Bwa } from '~/server/types';

const route = useRoute();
const isOpen = ref(false);

const { data: bwa, error } = await useFetch(`/api/bwa/${route.params.bwaname as string}`);

const bwaData = bwa.value as Bwa;

const totalOutput = bwaData.revenue + bwaData.inventoryChange + bwaData.ownWork;

const grossYield = bwaData.revenue + bwaData.inventoryChange + bwaData.ownWork + bwaData.goodsPurchases;

const operatingGrossYield = bwaData.revenue + bwaData.inventoryChange + bwaData.ownWork + bwaData.goodsPurchases + bwaData.otherIncome;

const totalCosts = bwaData.personnelCosts + bwaData.facilityCosts + bwaData.operatingTaxes + bwaData.insuranceCosts + bwaData.specialCosts + bwaData.vehicleCosts + bwaData.travelCosts + bwaData.soldGoodsCosts + bwaData.depreciation + bwaData.maintenance + bwaData.otherCosts;

const operatingResult = totalOutput - totalCosts;

const nonOperatingExpenses = bwaData.interestExpense + bwaData.otherNeutralExpenses;

const nonOperatingIncome = bwaData.interestIncome + bwaData.otherNeutralIncome + bwaData.calculatedImputedCosts;

const earningsBeforeTaxes = operatingResult - nonOperatingExpenses + nonOperatingIncome;

const earningsAfterTaxes = earningsBeforeTaxes + bwaData.incomeTaxes;

const rows = [
  {
    name: "Bezeichnung",
    value: bwaData.name,
  },
  {
    name: "Umsatzerlöse",
    value: bwaData.revenue,
  },
  {
    name: "Bestandsveränderung FE/UE",
    value: bwaData.inventoryChange,
  },
  {
    name: "Aktivierte Eigenleistungen",
    value: bwaData.ownWork,
  },
  {
    name: "Gesamtleistung",
    value: totalOutput
  },
  {
    name: "Material-/Wareneinkauf",
    value: bwaData.goodsPurchases,
  },
  {
    name: "Rohertrag",
    value: grossYield
  },
  {
    name: "So. betr. Erlöse",
    value: bwaData.otherIncome,
  },
  {
    name: "Betrieblicher Rohertrag",
    value: operatingGrossYield
  },
  {
    name: "Personalkosten",
    value: bwaData.personnelCosts,
  },
  {
    name: "Raumkosten",
    value: bwaData.facilityCosts,
  },
  {
    name: "Betriebliche Steuern",
    value: bwaData.operatingTaxes,
  },
  {
    name: "Versicherungen/Beiträge",
    value: bwaData.insuranceCosts,
  },
  {
    name: "Besondere Kosten",
    value: bwaData.specialCosts,
  },
  {
    name: "Fahrzeugkosten (ohne Steuer)",
    value: bwaData.vehicleCosts,
  },
  {
    name: "Werbe-/Reisekosten",
    value: bwaData.travelCosts,
  },
  {
    name: "Kosten Warenabgabe",
    value: bwaData.soldGoodsCosts,
  },
  {
    name: "Abschreibungen",
    value: bwaData.depreciation,
  },
  {
    name: "Reparatur/Instandhaltung",
    value: bwaData.maintenance,
  },
  {
    name: "Sonstige Kosten",
    value: bwaData.otherCosts,
  },
  {
    name: "Gesamtkosten",
    value: totalCosts
  },
  {
    name: "Betriebsergebnis",
    value: operatingResult,
  },
  {
    name: "Zinsaufwand",
    value: bwaData.interestExpense,
  },
  {
    name: "Sonstiger neutraler Aufwand",
    value: bwaData.otherNeutralExpenses,
  },
  {
    name: "Neutraler Aufwand",
    value: nonOperatingExpenses
  },
  {
    name: "Zinserträge",
    value: bwaData.interestIncome,
  },
  {
    name: "Sonstiger neutraler Ertrag",
    value: bwaData.otherNeutralIncome,
  },
  {
    name: "Verrechnete kalk. Kosten",
    value: bwaData.calculatedImputedCosts,
  },
  {
    name: "Neutraler Ertrag",
    value: nonOperatingIncome
  },
  {
    name: "Kontenklasse unbesetzt",
    value: bwaData.accountClassUnassigned,
  },
  {
    name: "Ergebnis vor Steuern",
    value: earningsBeforeTaxes
  },
  {
    name: "Steuern Einkommen u. Ertrag",
    value: bwaData.incomeTaxes
  },
  {
    name: "Vorläufiges Ergebnis",
    value: earningsAfterTaxes
  }
];

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
