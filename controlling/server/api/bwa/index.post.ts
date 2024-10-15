
export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);

  if (!formData) {
    throw Error("formData not found");
  }


  const { filename, data } = formData[0];

  const storage = useStorage("data");

  if (!filename) {
    throw Error("filename not found");
  }

  if (await storage.hasItem(filename)) {
    throw Error("BWA already exists")
  }
  await storage.setItem(filename, data).then(() => {
    console.log("success")
  })
});
