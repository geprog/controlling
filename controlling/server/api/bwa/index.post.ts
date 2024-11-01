import { read, utils } from 'xlsx';

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event) as [{ filename: string; data: Buffer }] | undefined;

  if (!formData) {
    throw Error("Die hochgeladene Datei konnte nicht gelesen werden");
  }

  const { filename, data } = formData[0];
  
  const storage = useStorage("data");

  if (await storage.hasItem(filename)) {
    throw Error("BWA existiert bereits");
  }

  // Buffer Data to JSON
  const wb = read(data);
  const ws = wb.Sheets[wb.SheetNames[0]];
  const json = utils.sheet_to_json(ws);

  await storage.setItem(filename, json);
});
