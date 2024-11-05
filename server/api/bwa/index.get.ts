export default defineEventHandler(async () => {
    
const storage = useStorage("data");

const keys = await storage.getKeys();

return keys;
});
   