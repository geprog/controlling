import type { Bwa, ExtendedBwa } from "~/server/types";

export function bwaFunctions(data: Bwa): ExtendedBwa {
    return {
        ...data,

        totalOutput() {
            return this.revenue + this.inventoryChange + this.ownWork;
        },
        grossYield() {
            return this.totalOutput() - this.goodsPurchases;
        },
        operatingGrossYield() {
            return this.grossYield() + this.otherIncome;
        },
        totalCosts() {
            return this.personnelCosts + this.facilityCosts + this.operatingTaxes + this.insuranceCosts + this.specialCosts + this.vehicleCosts + this.travelCosts + this.soldGoodsCosts + this.depreciation + this.maintenance + this.otherCosts;
        },
        operatingResult() {
            return this.totalOutput() - this.totalCosts();
        },
        nonOperatingExpenses() {
            return this.interestExpense + this.otherNeutralExpenses;
        },
        nonOperatingIncome() {
            return this.interestIncome + this.otherNeutralIncome + this.calculatedImputedCosts;
        },
        earningsBeforeTaxes() {
            return this.operatingResult() - this.nonOperatingExpenses() + this.nonOperatingIncome();
        },
        earningsAfterTaxes() {
            return this.earningsBeforeTaxes() + this.incomeTaxes;
        }
    }
}