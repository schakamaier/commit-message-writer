import { error } from "node:console"
import { resolve } from "node:dns";

interface OpenRouterResponse {
    choices: {
        message: {
            content: string
        };
    }[];
}
function delay(ms: number): Promise<void> {
    return new Promise(resolve => setInterval(resolve, ms))
}
export async function sendPrompt(apiKey: string, prompt: string, model: string): Promise<string> {
    const controller = new AbortController();

    const timeout = setTimeout(() => {
        controller.abort();
    }, 30000)

    for (let attempt = 1; attempt <= 3 ; attempt++) {

        let response: Response | undefined

        try {

            response = await fetch(
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
                    }),
                    signal: controller.signal
                }
            )
        } catch (error) {
            if (error instanceof Error && error.name === "AbortError") {
                console.log("Request timed out")
            } else {
                console.log(`Network error: ${error}`)
            }
        } finally {
            clearTimeout(timeout)
        }


        if (!response) {
            if (attempt === 3) {
                throw new Error("Network Request failed after 3 attepmts.")
            }
            const waitTime = 3000 * 2 ** (attempt - 1);
            await delay(waitTime);
            continue;
        }


        if (!response.ok) {
            const errorDetails = await response.text();
            const retryableStatuses = [429, 500, 502, 503, 504];


            if (!retryableStatuses.includes(response.status)) {
                throw new Error(`OpenRouter API error: ${response.status}`)
            }

            if (attempt === 3) {
                throw new Error(`OpenRouter API error after 3 attempts: ${response.status}\n${errorDetails}`)
            }
            const waitTime = 3000 * 2 ** (attempt - 1);
            await delay(waitTime);
            continue;
        }

        const data: OpenRouterResponse = await response.json();
        const content = data.choices[0]?.message?.content

        if (typeof content !== "string" || content.length === 0) {
            throw new Error("Openrouter returned invalid text")
        }

        return data.choices[0].message.content

    }
    throw new Error("Request failed after 3 attempts")
}
