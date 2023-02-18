class BufferManager {
  convertToBase64(buffer: string): Buffer | undefined {
    try {
      return Buffer.from(buffer, "base64");
    } catch (error: unknown) {
      console.error("[BufferManager]: Error converter buffer", (error as Error).message);

      return undefined;
    }
  }
}

export default new BufferManager();
