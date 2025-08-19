import React from "react";

const FE = new Set(["React", "Next.js", "TypeScript", "JavaScript", "Tailwind", "Streamlit"]);
const BE = new Set(["Node.js", "Express", "FastAPI", "Python", "Golang", "RESTful APIs", "Parser", "AST", "GitHub API", "Webhooks", "Flask"]);
const DB = new Set(["PostgreSQL", "MongoDB", "Redis", "Qdrant", "SQL", "DynamoDB"]);
const CLOUD = new Set(["AWS", "GCP", "Vercel", "Render", "Docker", "ngrok", "Cloudflare", "Cognito", "Replit"]);
const AI = new Set(["OpenAI", "LLM", "Whisper", "Gemini", "RAG", "GROQ", "Puppeteer", "Cheerio", "TensorFlow", "Keras", "CNN", "Xception", "Transfer Learning", "Saliency Maps", "Explainable AI", "Medical Imaging", "MRI", "Prompt Engineering", "Code Review", "Inline Comments", "Evaluation", "Judge Model", "Accuracy", "Relevance", "Metrics", "Scoring", "Llama 3.1", "Mistral"]);

function colorFor(tag: string): string {
    if (FE.has(tag)) return "bg-indigo-100 text-indigo-700 border-indigo-200";
    if (BE.has(tag)) return "bg-emerald-100 text-emerald-700 border-emerald-200";
    if (DB.has(tag)) return "bg-amber-100 text-amber-700 border-amber-200";
    if (CLOUD.has(tag)) return "bg-sky-100 text-sky-700 border-sky-200";
    if (AI.has(tag)) return "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200";
    return "bg-gray-100 text-gray-700 border-gray-200";
}

export default function Tag({ text }: { text: string }) {
    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${colorFor(text)}`}>
            {text}
        </span>
    );
}