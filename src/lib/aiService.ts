// We dynamically import @huggingface/transformers only when the in-browser fallback is used.
// This avoids bundling the heavy transformers library into the main client bundle when
// server-side inference endpoints are available.
let sentimentPipeline: any = null;
let summarizationPipeline: any = null;
let nerPipeline: any = null;
let embeddingPipeline: any = null;
let qaModel: any = null;

export interface SentimentResult {
  label: string;
  score: number;
  compound: number;
}

export interface NEREntity {
  entity: string;
  word: string;
  start: number;
  end: number;
  score: number;
}

export const initializeSentimentAnalysis = async () => {
  if (!sentimentPipeline) {
    const transformers = await import("@huggingface/transformers");
    sentimentPipeline = await transformers.pipeline(
      "sentiment-analysis",
      "Xenova/distilbert-base-uncased-finetuned-sst-2-english"
    );
  }
  return sentimentPipeline;
};

export const initializeSummarization = async () => {
  if (!summarizationPipeline) {
    const transformers = await import("@huggingface/transformers");
    summarizationPipeline = await transformers.pipeline(
      "summarization",
      "Xenova/distilbart-cnn-6-6"
    );
  }
  return summarizationPipeline;
};

export const initializeNER = async () => {
  if (!nerPipeline) {
    const transformers = await import("@huggingface/transformers");
    nerPipeline = await transformers.pipeline(
      "token-classification",
      "Xenova/bert-base-NER"
    );
  }
  return nerPipeline;
};

export const initializeEmbeddings = async () => {
  if (!embeddingPipeline) {
    const transformers = await import("@huggingface/transformers");
    embeddingPipeline = await transformers.pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );
  }
  return embeddingPipeline;
};

export const initializeQA = async () => {
  if (!qaModel) {
    const transformers = await import("@huggingface/transformers");
    qaModel = await transformers.pipeline(
      "question-answering",
      "Xenova/distilbert-base-cased-distilled-squad"
    );
  }
  return qaModel;
};

export const analyzeSentiment = async (text: string): Promise<SentimentResult> => {
  // Try server-side inference first
  try {
    const res = await fetch('/api/sentiment', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: text.slice(0, 1000) }) });
    if (res.ok) {
      const data = await res.json();
      // HF returns [{label, score}, ...]
      const top = Array.isArray(data) ? data[0] : data;
      const compound = top.label === 'POSITIVE' ? top.score * 0.8 : -top.score * 0.8;
      return { label: top.label, score: top.score, compound };
    }
  } catch (e) {
    // ignore and fallback
  }

  // Fallback to in-browser pipeline
  const model = await initializeSentimentAnalysis();
  const result = await model(text.slice(0, 512)) as any;
  const compound = result[0].label === "POSITIVE" ? result[0].score * 0.8 : -result[0].score * 0.8;
  return { label: result[0].label, score: result[0].score, compound };
};

export const summarizeText = async (text: string, maxLength = 130): Promise<string> => {
  try {
    const res = await fetch('/api/summarize', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text, max_length: maxLength }) });
    if (res.ok) {
      const data = await res.json();
      // HF summarization returns [{summary_text}]
      if (Array.isArray(data) && data[0]?.summary_text) return data[0].summary_text;
      if (data?.summary_text) return data.summary_text;
    }
  } catch (e) {
    // fallback
  }

  const model = await initializeSummarization();
  const result = await model(text, { max_length: maxLength, min_length: 30 }) as any;
  return result[0].summary_text;
};

export const extractEntities = async (text: string): Promise<NEREntity[]> => {
  try {
    const res = await fetch('/api/ner', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: text.slice(0, 1000) }) });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        return data.filter((e: any) => (e.score ?? 1) > 0.6).map((entity: any) => ({
          entity: entity.entity || entity.label || entity.entity_group || '',
          word: entity.word || entity.entity || '',
          start: entity.start || 0,
          end: entity.end || 0,
          score: entity.score || 1,
        }));
      }
    }
  } catch (e) {
    // fallback
  }

  const model = await initializeNER();
  const result = await model(text.slice(0, 512)) as any;
  return result.filter((entity: any) => entity.score > 0.7).map((entity: any) => ({
    entity: entity.entity,
    word: entity.word,
    start: entity.start,
    end: entity.end,
    score: entity.score
  }));
};

export const computeEmbedding = async (text: string): Promise<number[]> => {
  try {
    const res = await fetch('/api/embedding', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) });
    if (res.ok) {
      const data = await res.json();
      // Some HF embedding endpoints return array of floats or nested arrays
      if (Array.isArray(data)) return Array.isArray(data[0]) ? data[0] : data;
      if (data?.embedding) return data.embedding;
    }
  } catch (e) {
    // fallback
  }

  const model = await initializeEmbeddings();
  const result = await model(text, { pooling: "mean", normalize: true }) as any;
  return Array.from(result.data);
};

export const cosineSimilarity = (a: number[], b: number[]): number => {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
};

export const answerQuestion = async (question: string, context: string): Promise<string> => {
  try {
    const res = await fetch('/api/qa', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question, context: context.slice(0, 3000) }) });
    if (res.ok) {
      const data = await res.json();
      if (data?.answer) return data.answer;
      if (Array.isArray(data) && data[0]?.answer) return data[0].answer;
    }
  } catch (e) {
    // fallback
  }

  const model = await initializeQA();
  const result = await model(question, context.slice(0, 2048)) as any;
  return result.answer;
};
