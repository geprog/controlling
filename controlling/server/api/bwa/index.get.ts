export default defineEventHandler(async () => {
    
const storage = useStorage("data");

// console.log(storage)

const keys = await storage.getKeys();

return keys;
});
   