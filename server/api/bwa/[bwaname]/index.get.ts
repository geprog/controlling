import { Bwa } from "~/server/types";

export default defineEventHandler(async (event) => {
  const storage = useStorage("data");

  const name = getRouterParam(event, "bwaname");
  
  if (await storage.hasItem(name || "")) {
    const item: Bwa = await storage.getItem(name || "") as Bwa;
    return item;
  }
  throw Error();
});
