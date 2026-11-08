import { AIProvider } from "./aiProvider"

export class QwenProvider implements AIProvider {
    async generateResponse(prompt: string): Promise<string> {
        return `Qwen received: 
${prompt}`
    }
    getModelName(): string {
        return "Qwen"
    }
}