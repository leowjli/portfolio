import React from "react";

const FE = new Set(["React", "Next.js", "TypeScript", "JavaScript", "Tailwind", "Streamlit"]);
const BE = new Set(["Node.js", "Express", "FastAPI", "Python", "Golang", "RESTful APIs", "Parser", "AST", "GitHub API", "Webhooks", "Flask"]);
const DB = new Set(["PostgreSQL", "MongoDB", "Redis", "Qdrant", "SQL", "DynamoDB"]);
const CLOUD = new Set(["AWS", "GCP", "Vercel", "Render", "Docker", "ngrok", "Cloudflare", "Cognito", "Replit"]);
const AI = new Set(["OpenAI", "LLM", "Whisper", "Gemini", "RAG", "GROQ", "Puppeteer", "Cheerio", "TensorFlow", "Keras", "CNN", "Xception", "Transfer Learning", "Saliency Maps", "Explainable AI", "Medical Imaging", "MRI", "Prompt Engineering", "Code Review", "Inline Comments", "Evaluation", "Judge Model", "Accuracy", "Relevance", "Metrics", "Scoring", "Llama 3.1", "Mistral"]);

function colorFor(tag: string): string {
    if (FE.has(tag)) return "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-700";
    if (BE.has(tag)) return "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700";
    if (DB.has(tag)) return "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700";
    if (CLOUD.has(tag)) return "bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-700";
    if (AI.has(tag)) return "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200 dark:bg-fuchsia-900/30 dark:text-fuchsia-300 dark:border-fuchsia-700";
    return "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-600";
}

export default function Tag({ text }: { text: string }) {
    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${colorFor(text)}`}>
            {text}
        </span>
    );
}