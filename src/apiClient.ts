import { error } from "node:console"

export function getApiKey(apiKey: string) {

}
export function getPrompt(prompt: string) {

}
interface OpenRouterResponse {
    choices: {
        message: {
            content: string
        };
    }[];
}
export async function sendPrompt(apiKey: string, prompt: string, model: string): Promise<string> {
    const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
            method: "POST", 
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model,
                messages: [{
                    role: "user",
                    content: prompt
                }]
            })
        }
    )
    if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(
            `OpenRouter API error: ${response.status} \n ${errorDetails}`
        );
    }
    const data: OpenRouterResponse = await response.json();
    const content = data.choices[0]?.message?.content
    if (typeof content !== "string" || content.length === 0) {
        throw new Error("Openrouter returned invalid text")
    }
    return data.choices[0].message.content
}
