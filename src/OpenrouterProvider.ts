import { AIProvider } from "./aiProvider"
import { sendPrompt } from "./apiClient"

export class OpenrouterProvider implements AIProvider {
    private apiKey: string;
    private model: string;
    constructor(apiKey: string, model: string) {
        this.apiKey = apiKey
        this.model = model
    }
    generateResponse(prompt: string): Promise<string> {
        return sendPrompt(this.apiKey, prompt, this.model)
    }
    getModelName(): string {
        return this.model
    }
}