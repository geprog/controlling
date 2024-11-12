export default defineEventHandler(async (event) => {
    const name = getRouterParam(event, "bwaname");
    const storage = useStorage("data");

    try {
        await storage.removeItem(name as string);
        return {
            success: true,
            message: `Die Datei ${name} wurde erfolgreich gelöscht`
        };
    } catch (error: unknown) {
        return {
            success: false,
            message: `Fehler bei der Löschung von ${name}. Fehlercode: ${error instanceof Error ? error.message : 'Unbekannter Fehler'}`
        };
    }
});
