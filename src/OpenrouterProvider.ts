import { AIProvider } from "./aiProvider"
import { sendPrompt } from "./apiClient"

export class OpenrouterProvider implements AIProvider {
    private apiKey: string;
    constructor(apiKey: string) {
        this.apiKey = apiKey
    }
    generateResponse(prompt: string): Promise<string> {
        return sendPrompt(this.apiKey, prompt)
    }
    getModelName(): string {
        return "Qwen"
    }
}