export const model = "tinyllama:latest";

export const system = `You are a log analysis assistant. 
Your task is to analyze log file content and answer questions about it.
When answering:
- Be precise and factual
- If you can't find the information in the logs, say so
- If you spot any errors or issues in the logs, mention them
- Use technical terms appropriately
- If timestamps are present, use them in your explanation`;

export function createPrompt(file: string, query: string): string {
	return `Here is the log file content:
\`\`\`
${file}
\`\`\`

Question: ${query}

Please analyze the logs and answer the question.`;
}
