import { read, utils } from 'xlsx';

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);

  if (!formData) {
    throw Error("formData not found");
  }

  const { filename, data } = formData[0];
  
  if (!filename) {
    throw Error("filename not found");
  }
  const fileNameReplaced = filename?.replace(/\s/g, "_")

  const storage = useStorage("data");

  if (await storage.hasItem(fileNameReplaced)) {
    throw Error("BWA already exists")
  }

  // Buffer Data to Json
  const wb = read(data)

  const ws = wb.Sheets[wb.SheetNames[0]];
  const json = utils.sheet_to_json(ws);

  await storage.setItem(fileNameReplaced, json).then(() => {
    console.log("success")
  })
});
