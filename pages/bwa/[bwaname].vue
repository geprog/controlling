<script setup lang="ts">
import { bwaFunctions } from '~/server/utils/functions';
import { computed } from 'vue';

const route = useRoute();
const isOpen = ref(false);

const { data: bwa, error } = await useFetch(`/api/bwa/${route.params.bwaname}`);

const rows = computed(() => {
  if (!bwa.value) {
    return [];
  };

  const extendedBwa = bwaFunctions(bwa.value);


  const rows = [
    {
      name: "Bezeichnung",
      value: bwa.value.name,
      value2: ""
    },
    {
      name: "Umsatzerlöse",
      value: bwa.value.revenue,
      value2: ""
    },
    {
      name: "Bestandsveränderung FE/UE",
      value: bwa.value.inventoryChange,
      value2: ""
    },
    {
      name: "Aktivierte Eigenleistungen",
      value: bwa.value.ownWork,
      value2: ""
    },
    {
      name: "Gesamtleistung",
      value: extendedBwa.totalOutput(),
      value2: ""
    },
    {
      name: "Material-/Wareneinkauf",
      value: bwa.value.goodsPurchases,
      value2: ""
    },
    {
      name: "Rohertrag",
      value: extendedBwa.grossYield(),
      value2: ""
    },
    {
      name: "So. betr. Erlöse",
      value: bwa.value.otherIncome,
      value2: ""
    },
    {
      name: "Betrieblicher Rohertrag",
      value: extendedBwa.operatingGrossYield(),
      value2: ""
    },
    {
      name: "Personalkosten",
      value: bwa.value.personnelCosts,
      value2: ""
    },
    {
      name: "Raumkosten",
      value: bwa.value.facilityCosts,
      value2: ""
    },
    {
      name: "Betriebliche Steuern",
      value: bwa.value.operatingTaxes,
      value2: ""
    },
    {
      name: "Versicherungen/Beiträge",
      value: bwa.value.insuranceCosts,
      value2: ""
    },
    {
      name: "Besondere Kosten",
      value: bwa.value.specialCosts,
      value2: ""
    },
    {
      name: "Fahrzeugkosten (ohne Steuer)",
      value: bwa.value.vehicleCosts,
      value2: ""
    },
    {
      name: "Werbe-/Reisekosten",
      value: bwa.value.travelCosts,
      value2: ""
    },
    {
      name: "Kosten Warenabgabe",
      value: bwa.value.soldGoodsCosts,
      value2: ""
    },
    {
      name: "Abschreibungen",
      value: bwa.value.depreciation,
      value2: ""
    },
    {
      name: "Reparatur/Instandhaltung",
      value: bwa.value.maintenance,
      value2: ""
    },
    {
      name: "Sonstige Kosten",
      value: bwa.value.otherCosts,
      value2: ""
    },
    {
      name: "Gesamtkosten",
      value: extendedBwa.totalCosts(),
      value2: ""
    },
    {
      name: "Betriebsergebnis",
      value: extendedBwa.operatingResult(),
      value2: ""
    },
    {
      name: "Zinsaufwand",
      value: bwa.value.interestExpense,
      value2: ""
    },
    {
      name: "Sonstiger neutraler Aufwand",
      value: bwa.value.otherNeutralExpenses,
      value2: ""
    },
    {
      name: "Neutraler Aufwand",
      value: extendedBwa.nonOperatingExpenses(),
      value2: ""
    },
    {
      name: "Zinserträge",
      value: bwa.value.interestIncome,
      value2: ""
    },
    {
      name: "Sonstiger neutraler Ertrag",
      value: bwa.value.otherNeutralIncome,
      value2: ""
    },
    {
      name: "Verrechnete kalk. Kosten",
      value: bwa.value.calculatedImputedCosts,
      value2: ""
    },
    {
      name: "Neutraler Ertrag",
      value: extendedBwa.nonOperatingIncome(),
      value2: ""
    },
    {
      name: "Kontenklasse unbesetzt",
      value: bwa.value.accountClassUnassigned,
      value2: ""
    },
    {
      name: "Ergebnis vor Steuern",
      value: extendedBwa.earningsBeforeTaxes(),
      value2: ""
    },
    {
      name: "Steuern Einkommen u. Ertrag",
      value: bwa.value.incomeTaxes,
      value2: ""
    },
    {
      name: "Vorläufiges Ergebnis",
      value: extendedBwa.earningsAfterTaxes(),
      value2: ""
    }
  ];
  rows.forEach(row => {
    if (typeof row.value === "number" && bwa.value) {
      row.value2 = `${(100 / bwa.value.revenue * row.value).toFixed(2)}%`;
    }
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
