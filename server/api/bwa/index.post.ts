import { read, utils } from "xlsx";
import { Bwa } from "~/server/types";

export default defineEventHandler(async (event) => {
  const formData = (await readMultipartFormData(event)) as
    | [{ filename: string; data: Buffer }]
    | undefined;

  if (!formData) {
    throw Error("Die hochgeladene Datei konnte nicht gelesen werden");
  }

  const { filename, data } = formData[0];

  const storage = useStorage("data");

  if (await storage.hasItem(filename)) {
    throw Error("BWA existiert bereits");
  }

  // Buffer Data to JSON
  const wb = read(data, { type: "buffer" });

  if (!wb.SheetNames.length) {
    throw Error("Excel-Datei enthält keine Arbeitsblätter");
  }

  const ws = wb.Sheets[wb.SheetNames[0]];

  if (!ws) {
    throw Error("Arbeitsblatt konnte nicht gelesen werden");
  }

  const json = utils.sheet_to_json(ws) as { [key: string]: any }[];

  const name = Object.keys(json[0])[1];

  const newBwa: Bwa = {
    name: name,
    revenue: json[1]?.[name] || 0,
    inventoryChange: json[2]?.[name] || 0,
    ownWork: json[3]?.[name] || 0,
    goodsPurchases: json[7]?.[name] || 0,
    otherIncome: json[11]?.[name] || 0,
    personnelCosts: json[16]?.[name] || 0,
    facilityCosts: json[17]?.[name] || 0,
    operatingTaxes: json[18]?.[name] || 0,
    insuranceCosts: json[19]?.[name] || 0,
    specialCosts: json[20]?.[name] || 0,
    vehicleCosts: json[21]?.[name] || 0,
    travelCosts: json[22]?.[name] || 0,
    soldGoodsCosts: json[23]?.[name] || 0,
    depreciation: json[24]?.[name] || 0,
    maintenance: json[25]?.[name] || 0,
    otherCosts: json[26]?.[name] || 0,
    interestExpense: json[31]?.[name] || 0,
    otherNeutralExpenses: json[32]?.[name] || 0,
    interestIncome: json[35]?.[name] || 0,
    otherNeutralIncome: json[36]?.[name] || 0,
    calculatedImputedCosts: json[37]?.[name] || 0,
    accountClassUnassigned: json[40]?.[name] || 0,
    incomeTaxes: json[44]?.[name] || 0
  };

  if (!json.length) {
    throw Error("Keine Daten in der Excel-Datei gefunden");
  }

  // Save to storage
  await storage.setItem(filename, newBwa);
});
