import { read, utils } from 'xlsx';

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);

  if (!formData) {
    throw Error("Die Hochgeladene Datei konnte nicht gelesen werden");
  }

  const { filename, data } = formData[0];
  
  if (!filename) {
    throw Error("Bitte wähle ein Datum aus");
  }
  const fileNameReplaced = filename?.replace(/\s/g, "_").replace(/ä/, "ae")

  const storage = useStorage("data");

  if (await storage.hasItem(fileNameReplaced)) {
    throw Error("BWA existiert bereits")
  }

  // Buffer Data to Json
  const wb = read(data)

  const ws = wb.Sheets[wb.SheetNames[0]];
  const json = utils.sheet_to_json(ws);

  await storage.setItem(fileNameReplaced, json)
});
