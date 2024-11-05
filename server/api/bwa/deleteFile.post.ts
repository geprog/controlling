export default defineEventHandler(async (event) => {
    const body: { fileName: string } = await readBody(event);
    const storage = useStorage("data");

    try {
        await storage.removeItem(body.fileName);
        return {
            success: true,
            message: `Die Datei ${body.fileName} wurde erfolgreich gelöscht`
        };
    } catch (error: unknown) {
        return {
            success: false,
            message: `Fehler bei der Löschung von ${body.fileName}. Fehlercode: ${error instanceof Error ? error.message : 'Unbekannter Fehler'}`
        };
    }
});
