import { readFile } from "node:fs/promises";
import { join } from "node:path";

export async function loadSystemPrompt(extensionPath: string): Promise<string> {
    const systemPrompt = await readFile(
        join(extensionPath, "prompts", "commit-message-writer-system-prompt.md"),
        "utf-8"
    )

    return systemPrompt
}