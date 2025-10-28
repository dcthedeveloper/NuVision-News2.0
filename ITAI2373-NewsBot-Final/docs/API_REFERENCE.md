# NuVision News - API Reference
**Complete Server API Documentation**

---

## Table of Contents
1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Endpoints](#endpoints)
4. [Data Models](#data-models)
5. [Error Handling](#error-handling)
6. [Rate Limiting](#rate-limiting)
7. [Examples](#examples)

---

## Overview

The NuVision News API server is a Node.js + Express inference proxy that handles AI/NLP operations. It forwards requests to the Hugging Face Inference API while providing caching, rate limiting, and error handling.

**Base URL:** `http://localhost:4000/api`

**API Version:** 1.0

**Response Format:** JSON

---

## Authentication

### Server-Side API Keys

The server requires a Hugging Face API key configured in `server/.env`:

```bash
HF_API_KEY=your_hugging_face_api_key_here
ADMIN_TOKEN=optional_admin_password_for_protected_endpoints
```

### Client Authentication

Most endpoints are public (no authentication required). Admin endpoints require the `ADMIN_TOKEN` header:

```http
Authorization: Bearer your_admin_token_here
```

---

## Endpoints

### Health Check

**GET** `/api/health`

Check if the AI server is running and healthy.

**Parameters:** None

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-10-18T12:34:56.789Z",
  "uptime": 3600,
  "cache": {
    "entries": 42,
    "size": "1.2 MB"
  }
}
```

**Status Codes:**
- `200`: Server is healthy
- `500`: Server error

---

### Text Summarization

**POST** `/api/summarize`

Generate a concise summary of the provided text using BART model.

**Request Body:**
```json
{
  "text": "Long article text to summarize...",
  "maxLength": 150,
  "minLength": 50
}
```

**Parameters:**
- `text` (string, required): Text to summarize (max 10,000 characters)
- `maxLength` (number, optional): Maximum summary length in tokens (default: 150)
- `minLength` (number, optional): Minimum summary length in tokens (default: 50)

**Response:**
```json
{
  "summary": "A concise summary of the article...",
  "model": "facebook/bart-large-cnn",
  "cached": false,
  "processingTime": 1234
}
```

**Status Codes:**
- `200`: Success
- `400`: Invalid request (text too long, missing parameters)
- `429`: Rate limit exceeded
- `500`: Server error

**Example:**
```javascript
const response = await fetch('http://localhost:4000/api/summarize', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: 'Your article text here...',
    maxLength: 130
  })
});
const data = await response.json();
console.log(data.summary);
```

---

### Named Entity Recognition (NER)

**POST** `/api/ner`

Extract named entities (people, organizations, locations) from text.

**Request Body:**
```json
{
  "text": "Apple Inc. announced a new product in Cupertino."
}
```

**Parameters:**
- `text` (string, required): Text to analyze (max 5,000 characters)

**Response:**
```json
{
  "entities": [
    {
      "text": "Apple Inc.",
      "type": "ORG",
      "start": 0,
      "end": 10,
      "confidence": 0.99
    },
    {
      "text": "Cupertino",
      "type": "LOC",
      "start": 42,
      "end": 51,
      "confidence": 0.97
    }
  ],
  "model": "dslim/bert-base-NER",
  "cached": true,
  "processingTime": 456
}
```

**Entity Types:**
- `PER`: Person names
- `ORG`: Organizations (companies, agencies)
- `LOC`: Locations (cities, countries)
- `MISC`: Miscellaneous entities

**Status Codes:**
- `200`: Success
- `400`: Invalid request
- `429`: Rate limit exceeded
- `500`: Server error

---

### Text Embeddings

**POST** `/api/embedding`

Generate semantic embeddings for text clustering and similarity.

**Request Body:**
```json
{
  "texts": [
    "First article text...",
    "Second article text..."
  ]
}
```

**Parameters:**
- `texts` (array of strings, required): Text array to embed (max 100 texts, 1000 chars each)

**Response:**
```json
{
  "embeddings": [
    [0.123, -0.456, 0.789, ...],
    [0.234, -0.567, 0.890, ...]
  ],
  "model": "sentence-transformers/all-MiniLM-L6-v2",
  "dimensions": 384,
  "cached": false,
  "processingTime": 2345
}
```

**Status Codes:**
- `200`: Success
- `400`: Invalid request (too many texts, texts too long)
- `429`: Rate limit exceeded
- `500`: Server error

**Use Cases:**
- Article clustering
- Semantic similarity search
- Duplicate detection
- Recommendation systems

---

### Sentiment Analysis

**POST** `/api/sentiment`

Analyze the emotional tone of text (positive, negative, neutral).

**Request Body:**
```json
{
  "text": "This is an amazing product! I love it."
}
```

**Parameters:**
- `text` (string, required): Text to analyze (max 5,000 characters)

**Response:**
```json
{
  "sentiment": {
    "label": "POSITIVE",
    "score": 0.9987,
    "compound": 0.85,
    "breakdown": {
      "positive": 0.756,
      "neutral": 0.144,
      "negative": 0.100
    }
  },
  "model": "distilbert-base-uncased-finetuned-sst-2-english",
  "cached": true,
  "processingTime": 123
}
```

**Sentiment Labels:**
- `POSITIVE`: Score > 0.6
- `NEUTRAL`: Score 0.4 - 0.6
- `NEGATIVE`: Score < 0.4

**Status Codes:**
- `200`: Success
- `400`: Invalid request
- `429`: Rate limit exceeded
- `500`: Server error

---

### Question Answering

**POST** `/api/qa`

Answer questions based on provided context using extractive QA.

**Request Body:**
```json
{
  "question": "What product was announced?",
  "context": "Apple Inc. announced the new iPhone 15 in Cupertino yesterday."
}
```

**Parameters:**
- `question` (string, required): Question to answer (max 500 characters)
- `context` (string, required): Context containing the answer (max 5,000 characters)

**Response:**
```json
{
  "answer": "new iPhone 15",
  "score": 0.92,
  "start": 25,
  "end": 38,
  "model": "distilbert-base-cased-distilled-squad",
  "cached": false,
  "processingTime": 678
}
```

**Status Codes:**
- `200`: Success
- `400`: Invalid request
- `404`: No answer found in context
- `429`: Rate limit exceeded
- `500`: Server error

---

### Cache Management (Admin Only)

**GET** `/api/cache/stats`

Get cache statistics.

**Headers:**
```http
Authorization: Bearer your_admin_token_here
```

**Response:**
```json
{
  "entries": 142,
  "size": "3.4 MB",
  "hits": 1234,
  "misses": 567,
  "hitRate": 0.685,
  "oldestEntry": "2025-10-11T08:30:00.000Z",
  "newestEntry": "2025-10-18T12:34:56.789Z"
}
```

**Status Codes:**
- `200`: Success
- `401`: Unauthorized (missing/invalid admin token)

---

**DELETE** `/api/cache`

Clear all cached entries.

**Headers:**
```http
Authorization: Bearer your_admin_token_here
```

**Response:**
```json
{
  "message": "Cache cleared successfully",
  "entriesRemoved": 142
}
```

**Status Codes:**
- `200`: Success
- `401`: Unauthorized

---

**DELETE** `/api/cache/:key`

Delete a specific cache entry.

**Headers:**
```http
Authorization: Bearer your_admin_token_here
```

**Parameters:**
- `key` (string, required): Cache key to delete

**Response:**
```json
{
  "message": "Cache entry deleted",
  "key": "summary_abc123..."
}
```

**Status Codes:**
- `200`: Success
- `401`: Unauthorized
- `404`: Key not found

---

## Data Models

### Article Object

```typescript
interface Article {
  id: string;                    // Unique identifier
  title: string;                 // Article headline
  description: string;           // Brief summary
  content: string;               // Full article text
  url: string;                   // Source URL
  source: {
    name: string;                // Publisher name
    id: string;                  // Source identifier
  };
  publishedAt: string;           // ISO 8601 timestamp
  category: string;              // Primary category
  sentiment?: {                  // Sentiment analysis results
    label: 'positive' | 'negative' | 'neutral';
    score: number;
  };
  entities?: Entity[];           // Extracted entities
  keywords?: string[];           // Key terms
  aiSummary?: string;            // AI-generated summary
  cluster?: number;              // Cluster assignment
}
```

### Entity Object

```typescript
interface Entity {
  text: string;                  // Entity text
  type: 'PER' | 'ORG' | 'LOC' | 'MISC'; // Entity type
  start: number;                 // Start position in text
  end: number;                   // End position in text
  confidence: number;            // Model confidence (0-1)
}
```

### Sentiment Object

```typescript
interface Sentiment {
  label: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
  score: number;                 // Confidence score (0-1)
  compound: number;              // Aggregate sentiment (-1 to 1)
  breakdown: {
    positive: number;            // Positive probability
    neutral: number;             // Neutral probability
    negative: number;            // Negative probability
  };
}
```

### Error Object

```typescript
interface APIError {
  error: string;                 // Error message
  code: string;                  // Error code
  details?: any;                 // Additional error details
  timestamp: string;             // ISO 8601 timestamp
}
```

---

## Error Handling

### Standard Error Response

```json
{
  "error": "Rate limit exceeded",
  "code": "RATE_LIMIT_ERROR",
  "details": {
    "limit": 30,
    "window": "1 minute",
    "retryAfter": 45
  },
  "timestamp": "2025-10-18T12:34:56.789Z"
}
```

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `INVALID_REQUEST` | 400 | Missing or invalid parameters |
| `TEXT_TOO_LONG` | 400 | Text exceeds maximum length |
| `UNAUTHORIZED` | 401 | Missing or invalid authentication |
| `NOT_FOUND` | 404 | Resource not found |
| `RATE_LIMIT_ERROR` | 429 | Too many requests |
| `HUGGINGFACE_ERROR` | 500 | Upstream API error |
| `SERVER_ERROR` | 500 | Internal server error |
| `CACHE_ERROR` | 500 | Cache operation failed |

### Retry Strategy

For rate limit errors (429), implement exponential backoff:

```javascript
async function retryRequest(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (error.status === 429 && i < maxRetries - 1) {
        const delay = Math.pow(2, i) * 1000; // 1s, 2s, 4s
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
}
```

---

## Rate Limiting

### Default Limits

- **Per IP Address**: 30 requests per minute
- **Per Endpoint**: Specific limits may apply
- **Burst**: 10 requests immediately, then rate-limited

### Headers

Rate limit information is included in response headers:

```http
X-RateLimit-Limit: 30
X-RateLimit-Remaining: 25
X-RateLimit-Reset: 1697636896
```

### Exceeding Limits

When rate limit is exceeded:

```json
{
  "error": "Rate limit exceeded",
  "code": "RATE_LIMIT_ERROR",
  "details": {
    "limit": 30,
    "window": "1 minute",
    "retryAfter": 45
  }
}
```

**Response Headers:**
```http
HTTP/1.1 429 Too Many Requests
Retry-After: 45
```

---

## Examples

### Complete Workflow: Article Analysis

```javascript
// 1. Check server health
const health = await fetch('http://localhost:4000/api/health');
console.log(await health.json()); // { status: "ok", ... }

// 2. Generate summary
const summaryResponse = await fetch('http://localhost:4000/api/summarize', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: articleText,
    maxLength: 150
  })
});
const { summary } = await summaryResponse.json();

// 3. Extract entities
const nerResponse = await fetch('http://localhost:4000/api/ner', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: articleText })
});
const { entities } = await nerResponse.json();

// 4. Analyze sentiment
const sentimentResponse = await fetch('http://localhost:4000/api/sentiment', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: articleText })
});
const { sentiment } = await sentimentResponse.json();

// 5. Combine results
const enrichedArticle = {
  ...originalArticle,
  aiSummary: summary,
  entities: entities,
  sentiment: sentiment
};
```

### Batch Processing: Multiple Articles

```javascript
// Generate embeddings for clustering
const articles = [...]; // Array of article texts

// Batch in groups of 50
const batchSize = 50;
const embeddings = [];

for (let i = 0; i < articles.length; i += batchSize) {
  const batch = articles.slice(i, i + batchSize);
  
  const response = await fetch('http://localhost:4000/api/embedding', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ texts: batch.map(a => a.content) })
  });
  
  const { embeddings: batchEmbeddings } = await response.json();
  embeddings.push(...batchEmbeddings);
  
  // Rate limiting: wait between batches
  await new Promise(resolve => setTimeout(resolve, 2000));
}

// Use embeddings for clustering
const clusters = performClustering(embeddings);
```

### Error Handling

```javascript
async function analyzeArticle(article) {
  try {
    const response = await fetch('http://localhost:4000/api/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: article.content })
    });
    
    if (!response.ok) {
      const error = await response.json();
      
      if (response.status === 429) {
        // Rate limited - retry after delay
        console.log(`Rate limited. Retry after ${error.details.retryAfter}s`);
        await new Promise(r => setTimeout(r, error.details.retryAfter * 1000));
        return analyzeArticle(article); // Retry
      }
      
      throw new Error(`API error: ${error.error}`);
    }
    
    return await response.json();
    
  } catch (error) {
    console.error('Failed to analyze article:', error);
    // Fallback to client-side processing
    return fallbackSummarize(article.content);
  }
}
```

---

## Client Libraries

### JavaScript/TypeScript

```typescript
// src/lib/aiService.ts (included in project)
import { aiService } from './lib/aiService';

// Summarize text
const summary = await aiService.summarizeText(articleText);

// Extract entities
const entities = await aiService.extractEntities(articleText);

// Generate embeddings
const embeddings = await aiService.generateEmbeddings([text1, text2]);

// Analyze sentiment
const sentiment = await aiService.analyzeSentiment(articleText);
```

### Python (Example Client)

```python
import requests

class NuVisionAPI:
    def __init__(self, base_url='http://localhost:4000/api'):
        self.base_url = base_url
    
    def summarize(self, text, max_length=150):
        response = requests.post(
            f'{self.base_url}/summarize',
            json={'text': text, 'maxLength': max_length}
        )
        response.raise_for_status()
        return response.json()['summary']
    
    def extract_entities(self, text):
        response = requests.post(
            f'{self.base_url}/ner',
            json={'text': text}
        )
        response.raise_for_status()
        return response.json()['entities']
    
    def get_embeddings(self, texts):
        response = requests.post(
            f'{self.base_url}/embedding',
            json={'texts': texts}
        )
        response.raise_for_status()
        return response.json()['embeddings']

# Usage
api = NuVisionAPI()
summary = api.summarize('Your article text...')
entities = api.extract_entities('Your article text...')
```

---

## Performance Tips

### Caching

- Cache responses are stored for 7 days
- Identical requests return cached results instantly
- Check `cached: true` in responses to verify cache hits

### Optimization

- **Batch Requests**: Send multiple texts in single embedding request
- **Limit Text Length**: Truncate to essentials before sending
- **Reuse Embeddings**: Store embeddings client-side when possible
- **Monitor Rate Limits**: Track `X-RateLimit-Remaining` header

### Best Practices

```javascript
// ✅ Good: Batch processing
const embeddings = await api.embedding({ 
  texts: articles.map(a => a.content) 
});

// ❌ Bad: Individual requests
for (const article of articles) {
  await api.embedding({ texts: [article.content] }); // Slow!
}

// ✅ Good: Check cache first
const cacheKey = `summary_${articleId}`;
let summary = localStorage.getItem(cacheKey);
if (!summary) {
  summary = await api.summarize(text);
  localStorage.setItem(cacheKey, summary);
}

// ✅ Good: Handle errors gracefully
try {
  summary = await api.summarize(text);
} catch (error) {
  summary = fallbackExtractiveSummary(text); // Client-side fallback
}
```

---

## Deployment Considerations

### Environment Variables

```bash
# Required
HF_API_KEY=your_hugging_face_api_key

# Optional
ADMIN_TOKEN=secure_random_token_for_admin_endpoints
PORT=4000
NODE_ENV=production
CACHE_TTL=604800  # 7 days in seconds
RATE_LIMIT_WINDOW=60000  # 1 minute in ms
RATE_LIMIT_MAX=30  # Requests per window
```

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Configure strong `ADMIN_TOKEN`
- [ ] Enable HTTPS (reverse proxy)
- [ ] Set appropriate CORS origins
- [ ] Configure rate limiting for scale
- [ ] Set up monitoring and logging
- [ ] Implement cache eviction strategy
- [ ] Configure backup API keys

---

*Last Updated: October 2025*  
*API Version: 1.0*  
*For support: https://github.com/dcthedeveloper/NuVision-News2.0/issues*
