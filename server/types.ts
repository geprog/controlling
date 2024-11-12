export type Bwa = {
    name: string,

    /** Umsatzerlöse */
    revenue: number,
    
    /** Bestandsveränderung */
    inventoryChange: number,
    
    /** Material-/Wareneinkauf */
    goodsPurchases: number,
    
    /** Aktivierte Eigenleistungen */
    ownWork: number,

    /** So. betr. Erlöse */
    otherIncome: number,
    
    /** Personalkosten */
    personnelCosts: number,
    
    /** Raumkosten */
    facilityCosts: number,
    
    /** Betriebliche Steuern */
    operatingTaxes: number,
    
    /** Versicherungen/Beiträge */
    insuranceCosts: number,
    
    /** Besondere Kosten */
    specialCosts: number,
    
    /** Fahrzeugkosten (ohne Steuer) */
    vehicleCosts: number,
    
    /** Werbe-/Reisekosten */
    travelCosts: number,
    
    /** Kosten Warenabgabe */
    soldGoodsCosts: number,
    
    /** Abschreibungen */
    depreciation: number,
    
    /** Reparatur/Instandhaltung */
    maintenance: number,
    
    /** Sonstige Kosten */
    otherCosts: number,
    
    /** Zinsaufwand */
    interestExpense: number,
    
    /** Sonstiger neutraler Aufwand */
    otherNeutralExpenses: number,

    /** Zinserträge */
    interestIncome: number,
    
    /** Sonstiger neutraler Ertrag */
    otherNeutralIncome: number,
    
    /** Verrechnete kalk. Kosten */
    calculatedImputedCosts: number,

    /** Kontenklasse unbesetzt */
    accountClassUnassigned: number,

    /** Steuern Einkommen u. Ertrag */
    incomeTaxes: number
}
