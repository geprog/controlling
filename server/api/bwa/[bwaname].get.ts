
export default defineEventHandler(async (event) => {
  const storage = useStorage("data");

  const name = getRouterParam(event, "bwaname");
  
  if (await storage.hasItem(name || "")) {
    const item = await storage.getItem(name || "");
    return item;
  }
  return Error();
});
