# NuVision News - Technical Documentation

---

## Executive Summary

**NuVision News** is a modern news aggregation platform with advanced NLP and AI features, built as a React + TypeScript demo application. This document provides comprehensive technical reference for developers, architects, and contributors.

### Quick Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Radix UI |
| **Server** | Node.js + Express (inference proxy) |
| **NLP/AI** | Hugging Face Transformers (server-first), browser fallback |
| **APIs** | NewsAPI (live news), Hugging Face Inference API (AI) |
| **Caching** | localStorage (client), file-backed JSON (server, 7-day TTL) |
| **Build** | Vite (ESM, ~2.5s builds), TypeScript strict mode |
| **Testing** | GitHub Actions CI (lint, typecheck, build) |

### Architecture Decision Guide

**When to use what:**

- **Static article analysis** (no APIs): Browse 2000+ sample articles, full NLP features work client-side
- **Live news** (NewsAPI required): Real-time headlines from 50+ sources
- **AI features** (HF API required): Semantic clustering, advanced summaries, entity extraction
- **Server-side processing**: Offloads heavy computation (embeddings, transformers), caching reduces API calls
- **Client-side fallback**: Regex-based NER, sentiment analysis work without server

**Key design decisions:**
1. **Dynamic imports** for transformers library (prevents 200MB+ bundle bloat)
2. **Server-first architecture** (reduces client bundle, enables caching, protects API keys)
3. **Graceful degradation** (features disable when APIs unavailable, not crash)
4. **File-backed cache** (survives server restarts, 7-day TTL balances freshness vs. cost)
5. **CORS restricted** to localhost (demo security)

### Quick Reference

| Task | Section | Page |
|------|---------|------|
| Understand data flow | [Data Flow](#data-flow) | Below |
| Add new NLP feature | [Extension Points](#extension-points) | Mid-doc |
| Optimize performance | [Performance Considerations](#performance-considerations) | Mid-doc |
| Deploy to production | [Deployment & Production](#deployment--production) | End |
| API endpoints | [API Reference](#api-reference) | Mid-doc |
| Algorithm details | [Key Algorithms](#key-algorithms) | Mid-doc |

### Document Navigation

- **First-time readers**: Start with [Architecture Overview](#architecture-overview) → [Data Flow](#data-flow)
- **Contributing developers**: Jump to [Development Guidelines](#development-guidelines) → [Extension Points](#extension-points)
- **DevOps/deployment**: See [Deployment & Production](#deployment--production) at end
- **Algorithm researchers**: See [Key Algorithms](#key-algorithms) for TF-IDF, clustering, bias analysis details

---

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Core Modules](#core-modules)
3. [Data Flow](#data-flow)
4. [Key Algorithms](#key-algorithms)
5. [Performance Considerations](#performance-considerations)
6. [Extension Points](#extension-points)
7. [API Reference](#api-reference)
8. [Development Guidelines](#development-guidelines)

---

## Architecture Overview

NuVision follows a modular, component-based architecture with clear separation between UI, business logic, and data processing layers.

### Application Layers

#### Presentation Layer (`src/components/`, `src/pages/`)
- **React Components**: Built using React 18 with TypeScript for type safety
- **Styling**: Tailwind CSS with custom design system defined in `index.css` and `tailwind.config.ts`
- **UI Components**: shadcn/ui components built on Radix UI primitives
- **Routing**: React Router v6 for client-side navigation
- **State Management**: TanStack Query for server state, React hooks for local state

**Key Page Components:**
- `HomePage.tsx` - Main article feed with filtering and clustering
- `ArticlePage.tsx` - Individual article view with deep analysis
- `DeepDivePage.tsx` - Comprehensive multi-article analysis
- `BiasRadarPage.tsx` - Bias visualization and source analysis
- `TopicsPage.tsx` - Category-based article browsing
- `SettingsPage.tsx` - User preferences and customization

#### Business Logic Layer (`src/lib/`)
Core algorithms and data processing functions that power the application's intelligence features.

**Text Processing Pipeline:**
- `textPreprocessing.ts` - Text cleaning, tokenization, stemming
- `tfidfAnalysis.ts` - TF-IDF calculation and keyword extraction
- `nlpAnalysis.ts` - POS tagging, entity extraction, syntax parsing

**Machine Learning & AI:**
- `aiService.ts` - Hugging Face Transformers integration
- `clustering.ts` - Semantic article clustering
- `biasAnalysis.ts` - Bias detection algorithms

**Data Management:**
- `articles.ts` - Article data types and utilities
- `newsApi.ts` - External news API integration
- `notificationDigest.ts` - Personalized digest generation

**Visualization:**
- `knowledgeGraph.ts` - Entity relationship graph generation
- `timelineExtraction.ts` - Event timeline extraction
- `cardColors.ts` - Dynamic color scheme generation

#### Data Layer (`src/data/`)
- `nuvision_2k.json` - Corpus of 2000+ pre-processed articles
- Static datasets for testing and development
- JSON-based data storage for rapid prototyping

#### API Integration Layer
- `aiService.ts` - Hugging Face Inference API
- `newsApi.ts` - News aggregation services
- Modular design allows easy addition of new data sources

---

## Core Modules

### Text Processing Pipeline

#### textPreprocessing.ts

Provides fundamental text preprocessing capabilities for NLP tasks.

**Functions:**

```typescript
cleanText(text: string): string
```
- Removes HTML tags using regex patterns
- Strips URLs (http/https protocols)
- Normalizes whitespace and line breaks
- Converts to lowercase for normalization
- Handles special characters and Unicode

```typescript
tokenize(text: string): string[]
```
- Splits text into word tokens
- Uses regex pattern `\w+` for word boundaries
- Returns array of lowercase tokens
- Filters out empty strings

```typescript
removeStopwords(tokens: string[]): string[]
```
- Filters common English stopwords (a, the, is, are, etc.)
- Maintains stopword list of ~150 most common words
- Preserves meaningful content words
- Returns filtered token array

```typescript
stem(tokens: string[]): string[]
```
- Implements Porter Stemming algorithm
- Reduces words to root forms (running → run)
- Handles irregular plurals and verb conjugations
- Improves semantic matching

```typescript
preprocessText(text: string): string[]
```
- Complete preprocessing pipeline
- Chains: clean → tokenize → stopword removal → stemming
- Returns processed token array ready for analysis

**Usage Example:**
```typescript
const article = "<p>The technology industry is rapidly evolving...</p>";
const tokens = preprocessText(article);
// Returns: ["technolog", "industri", "rapid", "evolv", ...]
```

#### tfidfAnalysis.ts

Implements TF-IDF (Term Frequency-Inverse Document Frequency) for keyword extraction and document similarity.

**Core Data Structures:**

```typescript
interface TFIDFResult {
  term: string;
  tfidf: number;
  tf: number;
  idf: number;
}

interface DocumentTerms {
  docId: number;
  terms: Map<string, number>;
}
```

**Functions:**

```typescript
calculateTF(text: string): Map<string, number>
```
- Computes term frequency for each word in document
- Normalizes by document length
- Formula: TF(t) = (count of term t) / (total terms in document)
- Returns Map of term → frequency

```typescript
calculateIDF(documents: string[]): Map<string, number>
```
- Calculates inverse document frequency across corpus
- Formula: IDF(t) = log(N / (1 + df(t)))
- N = total documents, df(t) = documents containing term t
- Returns Map of term → IDF score

```typescript
calculateTFIDF(document: string, allDocuments: string[]): TFIDFResult[]
```
- Combines TF and IDF scores
- Formula: TF-IDF(t) = TF(t) × IDF(t)
- Returns sorted array of terms with scores
- Higher scores indicate more important/distinctive terms

```typescript
extractKeywords(document: string, allDocuments: string[], topN?: number): string[]
```
- Extracts top N keywords from document
- Default topN = 10
- Uses TF-IDF ranking
- Returns array of most significant terms

```typescript
calculateDocumentSimilarity(doc1: string, doc2: string, allDocuments: string[]): number
```
- Computes cosine similarity between two documents
- Uses TF-IDF vectors for comparison
- Returns similarity score [0, 1]
- Formula: cos(θ) = (A·B) / (||A|| × ||B||)

```typescript
analyzeCorpus(documents: string[], topN?: number): CorpusAnalysis
```
- Comprehensive corpus-level analysis
- Returns statistics: unique terms, avg doc length, vocabulary
- Identifies most frequent terms across corpus
- Useful for understanding dataset characteristics

**Usage Example:**
```typescript
const articles = [...]; // Array of article texts
const keywords = extractKeywords(articles[0], articles, 15);
const similarity = calculateDocumentSimilarity(articles[0], articles[1], articles);
const corpusStats = analyzeCorpus(articles);
```

#### nlpAnalysis.ts

Provides natural language processing capabilities including POS tagging, phrase extraction, and syntax parsing.

**Type Definitions:**

```typescript
type POSTag = 
  | 'NOUN' | 'VERB' | 'ADJ' | 'ADV' 
  | 'PRON' | 'DET' | 'PREP' | 'CONJ' 
  | 'PUNCT' | 'NUM';

interface POSToken {
  word: string;
  tag: POSTag;
  position: number;
}

interface SyntaxTree {
  type: 'sentence' | 'phrase' | 'word';
  value: string;
  children?: SyntaxTree[];
  tag?: POSTag;
}

interface LinguisticAnalysis {
  sentenceCount: number;
  avgSentenceLength: number;
  nounPhrases: string[];
  verbPhrases: string[];
  posDistribution: Record<POSTag, number>;
  complexityScore: number;
  syntaxTree: SyntaxTree[];
}
```

**Functions:**

```typescript
tagPOS(text: string): POSToken[]
```
- Assigns part-of-speech tags to each word
- Rule-based approach using suffix patterns
- Recognizes: -ing (VERB), -ly (ADV), -tion (NOUN), etc.
- Maintains dictionary of determiners, prepositions, conjunctions
- Returns array of tagged tokens with positions

```typescript
extractNounPhrases(text: string): string[]
```
- Identifies noun phrases using POS patterns
- Pattern: (DET)? (ADJ)* (NOUN)+
- Examples: "the quick brown fox", "artificial intelligence"
- Returns array of extracted noun phrases

```typescript
extractVerbPhrases(text: string): string[]
```
- Identifies verb phrases using POS patterns
- Pattern: (VERB) (ADV)* (VERB)*
- Examples: "is running quickly", "will have been completed"
- Returns array of extracted verb phrases

```typescript
parseSyntax(text: string): SyntaxTree
```
- Builds hierarchical syntax tree
- Breaks text into sentences
- Parses each sentence into phrases
- Creates tree structure: sentence → phrases → words
- Useful for understanding document structure

```typescript
analyzeLinguisticPatterns(text: string): LinguisticAnalysis
```
- Comprehensive linguistic analysis
- Calculates sentence statistics
- Extracts noun and verb phrases
- Computes POS tag distribution
- Generates complexity score based on:
  - Average sentence length
  - Unique POS tags used
  - Lexical diversity
- Returns complete linguistic profile

**Usage Example:**
```typescript
const article = "The artificial intelligence system rapidly processes complex data.";
const analysis = analyzeLinguisticPatterns(article);
// Returns: {
//   sentenceCount: 1,
//   avgSentenceLength: 8,
//   nounPhrases: ["artificial intelligence system", "complex data"],
//   verbPhrases: ["rapidly processes"],
//   posDistribution: { NOUN: 3, VERB: 1, ADJ: 2, ADV: 1, DET: 1 },
//   complexityScore: 7.2
// }
```

### Machine Learning & AI

#### clustering.ts

Implements semantic article clustering using embeddings and cosine similarity.

**Data Structures:**

```typescript
interface ClusteredArticle extends Article {
  clusterId: string;
  isClusterRepresentative: boolean;
  clusterSize: number;
  clusterArticles?: Article[];
}
```

**Configuration:**

```typescript
const SIMILARITY_THRESHOLD = 0.75;
```
- Articles with >75% similarity are grouped together
- Adjustable based on desired cluster granularity
- Higher threshold = tighter, more specific clusters
- Lower threshold = broader, more general clusters

**Functions:**

```typescript
clusterArticles(articles: Article[]): Promise<ClusteredArticle[]>
```

**Algorithm Steps:**

1. **Embedding Generation**
   ```typescript
   for each article in articles:
     text = article.content.slice(0, 500)
     embedding = await computeEmbedding(text)
     embeddings.push({ article, embedding })
   ```

2. **Similarity Calculation**
   ```typescript
   for i in 0 to embeddings.length:
     for j in i+1 to embeddings.length:
       similarity = cosineSimilarity(embeddings[i], embeddings[j])
       if similarity >= SIMILARITY_THRESHOLD:
         mark(i, j as similar)
   ```

3. **Cluster Formation**
   ```typescript
   clusters = new Map()
   processed = new Set()
   
   for each embedding:
     if embedding.article.id in processed:
       continue
   
     cluster = [embedding.article]
     clusterId = `cluster-${embedding.article.id}`
   
     for each other embedding:
       if already processed:
         continue
       if similarity(embedding, other) >= THRESHOLD:
         cluster.push(other.article)
         mark other as processed
   
     mark embedding as processed
     clusters.set(clusterId, cluster)
   ```

4. **Metadata Assignment**
   ```typescript
   for each cluster:
     sorted = cluster.sort by date descending
     representative = sorted[0]
     representative.clusterId = clusterId
     representative.isClusterRepresentative = true
     representative.clusterSize = cluster.length
     representative.clusterArticles = cluster
   ```

5. **Sorting & Ranking**
   - Sorts cluster members by date (most recent first)
   - Alternative: sort by sentiment impact
   - Representative is typically most recent or impactful

**Performance Optimizations:**
- Limits to first 100 articles for performance
- Uses truncated content (500 chars) for embeddings
- Caches embeddings to avoid recomputation
- Parallel embedding generation possible

```typescript
getClusterById(clusteredArticles: ClusteredArticle[], clusterId: string): Article[]
```
- Retrieves all articles in a specific cluster
- Returns full article array for comparison view
- Used for multi-perspective analysis

**Usage Example:**
```typescript
const articles = await fetchArticles();
const clusters = await clusterArticles(articles);

// Find largest cluster
const largestCluster = clusters.reduce((max, c) => 
  c.clusterSize > max.clusterSize ? c : max
);

// Get all articles in cluster
const clusterMembers = getClusterById(clusters, largestCluster.clusterId);
```

#### biasAnalysis.ts

Detects and quantifies media bias using statistical analysis of sources, sentiment, and language patterns.

**Functions:**

```typescript
analyzeSourceBias(articles: Article[]): BiasAnalysisResult
```

**Bias Detection Methodology:**

1. **Source Distribution Analysis**
   - Maps known sources to political spectrum positions
   - Tracks frequency of left/center/right sources
   - Identifies over-representation of specific viewpoints
   - Calculates source diversity score

2. **Sentiment Pattern Detection**
   - Analyzes sentiment across different sources
   - Identifies consistent positive/negative framing
   - Detects emotional language patterns
   - Compares sentiment variance across sources

3. **Language Intensity Measurement**
   - Detects use of loaded language
   - Identifies hyperbolic expressions
   - Measures adjective/adverb density
   - Quantifies emotional intensity

4. **Topic Framing Analysis**
   - Examines how different sources frame same story
   - Identifies narrative differences
   - Detects selection bias in facts presented
   - Measures framing consistency

**Bias Score Calculation:**
- Weighted combination of multiple factors
- Range: -1 (left bias) to +1 (right bias)
- 0 represents balanced coverage
- Confidence score indicates reliability of assessment

```typescript
calculateBiasScore(source: string): number
```
- Returns bias score for individual source
- Based on historical analysis and known positions
- Updated periodically with new data
- Range: -1 to +1

**Usage Example:**
```typescript
const articles = getArticlesOnTopic("climate change");
const biasAnalysis = analyzeSourceBias(articles);

console.log(`Overall bias: ${biasAnalysis.overallBias}`);
console.log(`Source diversity: ${biasAnalysis.diversity}`);
console.log(`Left sources: ${biasAnalysis.leftCount}`);
console.log(`Right sources: ${biasAnalysis.rightCount}`);
```

#### knowledgeGraph.ts

Builds interactive knowledge graphs showing entity relationships across articles.

**Functions:**

```typescript
buildKnowledgeGraph(articles: Article[]): GraphData
```

**Graph Construction Algorithm:**

1. **Entity Extraction**
   - Extracts all named entities from articles
   - Categories: PERSON, ORG, GPE, EVENT, PRODUCT
   - Deduplicates similar entities
   - Tracks entity frequencies

2. **Relationship Detection**
   - Identifies co-occurrences within articles
   - Measures relationship strength
   - Types: mentions, affiliated with, located in, works for
   - Weights edges by frequency

3. **Node Creation**
   - Creates graph nodes for each entity
   - Node attributes: type, frequency, importance
   - Calculates centrality scores
   - Sizes nodes by importance

4. **Edge Creation**
   - Links related entities
   - Edge weights based on relationship strength
   - Directional edges for asymmetric relationships
   - Labels indicate relationship types

5. **Graph Layout**
   - Force-directed graph layout
   - Clusters related entities
   - Optimizes for readability
   - Interactive zoom and pan

**Data Structure:**
```typescript
interface GraphData {
  nodes: Array<{
    id: string;
    label: string;
    type: string;
    value: number;
  }>;
  links: Array<{
    source: string;
    target: string;
    value: number;
    type: string;
  }>;
}
```

**Usage Example:**
```typescript
const articles = getRelatedArticles(topicId);
const graph = buildKnowledgeGraph(articles);

// Find most central entity
const centralNode = graph.nodes.reduce((max, node) => 
  node.value > max.value ? node : max
);

// Find all connections to entity
const connections = graph.links.filter(link => 
  link.source === entityId || link.target === entityId
);
```

#### timelineExtraction.ts

Extracts chronological events from articles to build timelines.

**Functions:**

```typescript
extractTimeline(articles: Article[]): TimelineEvent[]
```

**Timeline Extraction Process:**

1. **Temporal Expression Detection**
   - Identifies date references (yesterday, last week, March 15)
   - Extracts specific timestamps
   - Normalizes relative dates to absolute dates
   - Handles various date formats

2. **Event Identification**
   - Detects event-indicating verbs (announced, occurred, launched)
   - Identifies noun phrases describing events
   - Associates events with temporal markers
   - Extracts contextual information

3. **Event Ordering**
   - Sorts events chronologically
   - Resolves ambiguous dates
   - Handles ongoing vs. completed events
   - Creates event sequences

4. **Event Merging**
   - Identifies duplicate events across articles
   - Merges similar events
   - Preserves source diversity
   - Maintains multiple perspectives

5. **Timeline Construction**
   - Creates structured timeline data
   - Groups events by time periods
   - Identifies causal relationships
   - Generates narrative flow

**Data Structure:**
```typescript
interface TimelineEvent {
  date: Date;
  event: string;
  source: string;
  importance: number;
  relatedArticles: string[];
}
```

**Usage Example:**
```typescript
const articles = getArticlesOnTopic("tech merger");
const timeline = extractTimeline(articles);

// Get events in last 30 days
const recentEvents = timeline.filter(event => 
  event.date > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
);

// Find most important events
const keyEvents = timeline
  .sort((a, b) => b.importance - a.importance)
  .slice(0, 5);
```

---

## Data Flow

### Article Processing Pipeline

```
1. Article Ingestion
   ↓
   Raw articles loaded from nuvision_2k.json or external APIs
   ↓
2. Preprocessing
   ↓
   cleanText() → tokenize() → removeStopwords() → stem()
   ↓
3. NLP Analysis (Parallel Processing)
   ├→ Entity Extraction (extractEntities)
   ├→ POS Tagging (tagPOS)
   ├→ Sentiment Analysis (analyzeSentiment)
   └→ Keyword Extraction (extractKeywords)
   ↓
4. Feature Extraction
   ├→ TF-IDF Vectors (calculateTFIDF)
   ├→ Embeddings (computeEmbedding)
   └→ Linguistic Features (analyzeLinguisticPatterns)
   ↓
5. Machine Learning
   ├→ Clustering (clusterArticles)
   ├→ Bias Detection (analyzeSourceBias)
   └→ Similarity Calculation (calculateDocumentSimilarity)
   ↓
6. Visualization & UI
   ├→ Article Cards (ArticleCard.tsx)
   ├→ Knowledge Graphs (KnowledgeMap.tsx)
   ├→ Timelines (EventTimeline.tsx)
   └→ Bias Radar (BiasRadar.tsx)
```

### Component Data Flow

```
App.tsx (Root)
  ↓
  ├→ Header.tsx (Navigation, Search)
  │    ↓
  │    └→ ConversationalQuery.tsx (AI Search)
  │
  ├→ HomePage.tsx (Main Feed)
  │    ↓
  │    ├→ ContextLens.tsx (Perspective Switching)
  │    ├→ CategoryTag.tsx (Filtering)
  │    └→ ArticleCard.tsx (Article Display)
  │         ↓
  │         ├→ SentimentBadge.tsx
  │         ├→ DailyBriefScore.tsx
  │         └→ ClusterModal.tsx
  │
  ├→ ArticlePage.tsx (Article Details)
  │    ↓
  │    ├→ CleanReaderModal.tsx (Reader Mode)
  │    └→ AudioPlayer.tsx (Text-to-Speech)
  │
  └→ DeepDivePage.tsx (Advanced Analysis)
       ↓
       ├→ KnowledgeMap.tsx (Entity Graph)
       ├→ EventTimeline.tsx (Chronology)
       ├→ BiasRadar.tsx (Bias Visualization)
       └→ DeepVisionMode.tsx (Comprehensive View)
```

---

## Key Algorithms

### Article Clustering Algorithm

**Purpose**: Group semantically similar articles from different sources

**Input**: Array of Article objects
**Output**: Array of ClusteredArticle objects with cluster metadata

**Algorithm Steps**:

1. **Embedding Generation**
   ```typescript
   for each article in articles:
     text = article.content.slice(0, 500)
     embedding = await computeEmbedding(text)
     embeddings.push({ article, embedding })
   ```

2. **Similarity Matrix Construction**
   ```typescript
   for i in 0 to embeddings.length:
     for j in i+1 to embeddings.length:
       similarity = cosineSimilarity(embeddings[i], embeddings[j])
       if similarity >= SIMILARITY_THRESHOLD:
         mark(i, j as similar)
   ```

3. **Cluster Formation (Greedy)**
   ```typescript
   clusters = new Map()
   processed = new Set()
   
   for each embedding:
     if embedding.article.id in processed:
       continue
   
     cluster = [embedding.article]
     clusterId = `cluster-${embedding.article.id}`
   
     for each other embedding:
       if already processed:
         continue
       if similarity(embedding, other) >= THRESHOLD:
         cluster.push(other.article)
         mark other as processed
   
     mark embedding as processed
     clusters.set(clusterId, cluster)
   ```

4. **Representative Selection**
   ```typescript
   for each cluster:
     sorted = cluster.sort by date descending
     representative = sorted[0]
     representative.clusterId = clusterId
     representative.isClusterRepresentative = true
     representative.clusterSize = cluster.length
     representative.clusterArticles = cluster
   ```

**Time Complexity**: O(n²) for similarity calculation, O(n) for clustering
**Space Complexity**: O(n²) for similarity matrix, O(n) for clusters

**Optimization Opportunities**:
- Use approximate nearest neighbors (ANN) for large datasets
- Implement hierarchical clustering for better scalability
- Cache embeddings to avoid recomputation
- Use dimensionality reduction (PCA, t-SNE) before clustering

### Bias Detection Algorithm

**Purpose**: Quantify media bias across news coverage

**Input**: Array of articles on same topic
**Output**: BiasAnalysisResult with scores and metrics

**Algorithm Components**:

1. **Source Bias Mapping**
   ```typescript
   sourcePositions = {
     'CNN': -0.3,        // Slight left
     'Fox News': 0.7,    // Right
     'BBC': 0.0,         // Center
     'MSNBC': -0.6,      // Left
     'Wall Street Journal': 0.2  // Slight right
   }
   ```

2. **Sentiment Skew Detection**
   ```typescript
   function calculateSentimentSkew(articles):
     leftSentiment = averageSentiment(articles from left sources)
     rightSentiment = averageSentiment(articles from right sources)
     skew = leftSentiment - rightSentiment
     return abs(skew)
   ```

3. **Language Intensity Scoring**
   ```typescript
   function measureLanguageIntensity(text):
     intensifiers = ['very', 'extremely', 'absolutely', 'totally']
     loadedTerms = ['crisis', 'disaster', 'catastrophe', 'outrage']
     
     intensifierCount = countOccurrences(text, intensifiers)
     loadedTermCount = countOccurrences(text, loadedTerms)
     
     intensity = (intensifierCount + loadedTermCount) / tokenCount(text)
     return intensity
   ```

4. **Bias Score Aggregation**
   ```typescript
   function calculateOverallBias(articles):
     sourceScore = weightedAverage(articles.map(a => sourcePositions[a.source]))
     sentimentScore = calculateSentimentSkew(articles)
     intensityScore = average(articles.map(a => measureLanguageIntensity(a.content)))
     
     biasScore = (
       0.5 * sourceScore +
       0.3 * sentimentScore +
       0.2 * intensityScore
     )
     
     return biasScore
   ```

**Bias Interpretation**:
- `-1.0 to -0.5`: Strong left bias
- `-0.5 to -0.2`: Moderate left bias
- `-0.2 to 0.2`: Balanced/Center
- `0.2 to 0.5`: Moderate right bias
- `0.5 to 1.0`: Strong right bias

### TF-IDF Keyword Extraction

**Purpose**: Identify most important terms in a document

**Mathematical Foundation**:

**Term Frequency (TF)**:
```
TF(t, d) = (count of term t in document d) / (total terms in document d)
```

**Inverse Document Frequency (IDF)**:
```
IDF(t, D) = log(N / (1 + df(t)))
```
where:
- N = total number of documents
- df(t) = number of documents containing term t

**TF-IDF Score**:
```
TF-IDF(t, d, D) = TF(t, d) × IDF(t, D)
```

**Algorithm Implementation**:

1. **Compute TF for Target Document**
   ```typescript
   function calculateTF(document):
     tokens = preprocessText(document)
     termCounts = {}
     
     for token in tokens:
       termCounts[token] = (termCounts[token] || 0) + 1
     
     totalTerms = tokens.length
     
     for term in termCounts:
       termCounts[term] = termCounts[term] / totalTerms
     
     return termCounts
   ```

2. **Compute IDF Across Corpus**
   ```typescript
   function calculateIDF(allDocuments):
     N = allDocuments.length
     documentFrequency = {}
     
     for document in allDocuments:
       uniqueTerms = new Set(preprocessText(document))
       for term in uniqueTerms:
         documentFrequency[term] = (documentFrequency[term] || 0) + 1
     
     idfScores = {}
     for term in documentFrequency:
       idfScores[term] = Math.log(N / (1 + documentFrequency[term]))
     
     return idfScores
   ```

3. **Combine TF and IDF**
   ```typescript
   function calculateTFIDF(document, allDocuments):
     tfScores = calculateTF(document)
     idfScores = calculateIDF(allDocuments)
     
     tfidfScores = []
     for term in tfScores:
       tfidf = tfScores[term] * (idfScores[term] || 0)
       tfidfScores.push({ term, tfidf, tf: tfScores[term], idf: idfScores[term] })
     
     return tfidfScores.sort((a, b) => b.tfidf - a.tfidf)
   ```

4. **Extract Top Keywords**
   ```typescript
   function extractKeywords(document, allDocuments, topN = 10):
     tfidfScores = calculateTFIDF(document, allDocuments)
     return tfidfScores.slice(0, topN).map(item => item.term)
   ```

**Example**:
```
Document: "artificial intelligence and machine learning are transforming technology"
Corpus: 1000 technology articles

TF scores:
- artificial: 0.111
- intelligence: 0.111
- machine: 0.111
- learning: 0.111
- transform: 0.111
- technology: 0.111

IDF scores (assuming):
- artificial: 3.2 (appears in few documents)
- intelligence: 3.0
- machine: 2.8
- learning: 2.5
- transform: 3.5
- technology: 1.2 (appears in many documents)

TF-IDF scores:
- transform: 0.388 (highest - rare and important)
- artificial: 0.355
- intelligence: 0.333
- machine: 0.311
- learning: 0.277
- technology: 0.133 (lowest - too common)

Top keywords: ["transform", "artificial", "intelligence", "machine", "learning"]
```

---

## Performance Considerations

### Frontend Performance

#### Lazy Loading
```typescript
// Route-based code splitting
const DeepDivePage = React.lazy(() => import('./pages/DeepDivePage'));
const BiasRadarPage = React.lazy(() => import('./pages/BiasRadarPage'));

// Component lazy loading
<Suspense fallback={<LoadingSpinner />}>
  <DeepDivePage />
</Suspense>
```

**Benefits**:
- Reduces initial bundle size by ~40%
- Faster time to interactive
- Loads features on demand

#### Memoization
```typescript
// Expensive computations
const clusteredArticles = useMemo(
  () => clusterArticles(articles),
  [articles]
);

// Callback stability
const handleFilter = useCallback(
  (category: Category) => {
    setFilteredArticles(articles.filter(a => a.category === category));
  },
  [articles]
);
```

**Impact**:
- Prevents unnecessary re-renders
- Caches expensive calculations
- Improves scroll performance

#### Virtual Scrolling
```typescript
// For large article lists
import { useVirtualizer } from '@tanstack/react-virtual';

const rowVirtualizer = useVirtualizer({
  count: articles.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 200, // Estimated height of each article card
});
```

**Benefits**:
- Renders only visible items
- Handles thousands of articles smoothly
- Constant memory usage

### Backend/Processing Performance

#### Web Workers (Future Enhancement)
```typescript
// Move heavy NLP to background thread
const worker = new Worker('nlpWorker.js');

worker.postMessage({ articles, operation: 'cluster' });

worker.onmessage = (e) => {
  const clusteredArticles = e.data;
  setClusters(clusteredArticles);
};
```

**Potential Benefits**:
- Non-blocking UI during heavy computation
- Parallel processing
- Better user experience during clustering

#### Caching Strategy
```typescript
// Cache embeddings to avoid recomputation
const embeddingCache = new Map<string, number[]>();

async function getCachedEmbedding(articleId: string, content: string) {
  if (embeddingCache.has(articleId)) {
    return embeddingCache.get(articleId);
  }
  
  const embedding = await computeEmbedding(content);
  embeddingCache.set(articleId, embedding);
  return embedding;
}
```

#### Batch Processing
```typescript
// Process articles in batches
async function processArticlesBatch(articles: Article[], batchSize = 10) {
  const results = [];
  
  for (let i = 0; i < articles.length; i += batchSize) {
    const batch = articles.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(article => analyzeArticle(article))
    );
    results.push(...batchResults);
    
    // Allow UI to update between batches
    await new Promise(resolve => setTimeout(resolve, 0));
  }
  
  return results;
}
```

### Database Performance (Future)

#### Indexing Strategy
```sql
-- Optimize article queries
CREATE INDEX idx_articles_date ON articles(published_at DESC);
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_source ON articles(source);

-- Full-text search
CREATE INDEX idx_articles_fulltext ON articles USING GIN(to_tsvector('english', title || ' ' || content));
```

#### Query Optimization
```typescript
// Fetch only needed fields
const articles = await db
  .select({
    id: articles.id,
    title: articles.title,
    source: articles.source,
    date: articles.publishedAt,
  })
  .from(articles)
  .where(eq(articles.category, 'technology'))
  .limit(50);
```

---

## Extension Points

### Custom NLP Models

Replace Hugging Face models in `aiService.ts`:

```typescript
// Current implementation
export const computeEmbedding = async (text: string): Promise<number[]> => {
  // Use Hugging Face Inference API
  const response = await fetch(
    'https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2',
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${HUGGINGFACE_TOKEN}` },
      body: JSON.stringify({ inputs: text }),
    }
  );
  return await response.json();
};

// Custom implementation example
export const computeEmbedding = async (text: string): Promise<number[]> => {
  // Use OpenAI embeddings
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });
  return response.data[0].embedding;
  
  // Or use local transformer model
  const embedding = await localModel.encode(text);
  return embedding;
};
```

### Additional Data Sources

Extend `newsApi.ts` for new news APIs:

```typescript
// Current structure
export interface NewsSource {
  id: string;
  name: string;
  apiUrl: string;
  fetchArticles: () => Promise<Article[]>;
}

// Add new source
export const guardianSource: NewsSource = {
  id: 'guardian',
  name: 'The Guardian',
  apiUrl: 'https://content.guardianapis.com',
  fetchArticles: async () => {
    const response = await fetch(
      `${this.apiUrl}/search?api-key=${GUARDIAN_API_KEY}&show-fields=all`
    );
    const data = await response.json();
    return data.response.results.map(transformGuardianArticle);
  },
};

// Register source
export const allSources = [
  newsApiSource,
  guardianSource,
  nytimesSource,
  bbcNewsSource,
];
```

### Custom Clustering

Modify similarity thresholds and algorithms in `clustering.ts`:

```typescript
// Adjust threshold
const SIMILARITY_THRESHOLD = 0.80; // Tighter clusters

// Or use different clustering algorithm
export const clusterArticlesHierarchical = async (
  articles: Article[]
): Promise<ClusteredArticle[]> => {
  // Implement hierarchical clustering
  const embeddings = await generateEmbeddings(articles);
  const linkageMatrix = computeLinkage(embeddings, 'ward');
  const clusters = formClusters(linkageMatrix, threshold);
  return formatClusters(clusters, articles);
};

// Or density-based clustering (DBSCAN)
export const clusterArticlesDBSCAN = async (
  articles: Article[],
  eps: number = 0.3,
  minSamples: number = 3
): Promise<ClusteredArticle[]> => {
  // Implement DBSCAN for cluster detection
  // Better handles noise and varying cluster sizes
};
```

### New Context Lenses

Add persona types in context lens logic:

```typescript
// In ContextLens.tsx
export type PersonaType = 
  | 'parent' 
  | 'professional' 
  | 'executive' 
  | 'student'
  | 'researcher'  // New persona
  | 'investor'    // New persona
  | 'journalist'; // New persona

export const personaConfig: Record<PersonaType, PersonaConfig> = {
  // ... existing personas
  
  researcher: {
    name: 'Researcher',
    description: 'Academic and scientific focus',
    priorities: ['methodology', 'data quality', 'peer review', 'reproducibility'],
    importanceWeights: {
      scientificRigor: 0.4,
      novelty: 0.3,
      citations: 0.2,
      methodology: 0.1,
    },
    highlightedSections: ['methods', 'results', 'data'],
  },
  
  investor: {
    name: 'Investor',
    description: 'Market and financial impact',
    priorities: ['market impact', 'financial metrics', 'competitive analysis', 'risk'],
    importanceWeights: {
      financialImpact: 0.4,
      marketMovement: 0.3,
      competitivePosition: 0.2,
      riskFactors: 0.1,
    },
    highlightedSections: ['financial', 'market', 'competition'],
  },
};
```

---

## API Reference

### aiService.ts

#### computeEmbedding
```typescript
computeEmbedding(text: string): Promise<number[]>
```
Generates semantic embedding vector for text.

**Parameters:**
- `text` - Input text to embed (max 512 tokens)

**Returns:** 
- Promise resolving to 384-dimensional vector

**Example:**
```typescript
const embedding = await computeEmbedding("artificial intelligence");
console.log(embedding.length); // 384
```

#### cosineSimilarity
```typescript
cosineSimilarity(vecA: number[], vecB: number[]): number
```
Calculates cosine similarity between two vectors.

**Parameters:**
- `vecA` - First vector
- `vecB` - Second vector

**Returns:**
- Similarity score [0, 1]

**Example:**
```typescript
const sim = cosineSimilarity([1, 0, 1], [1, 1, 0]);
console.log(sim); // 0.5
```

#### analyzeSentiment
```typescript
analyzeSentiment(text: string): Promise<SentimentResult>
```
Performs sentiment analysis on text.

**Parameters:**
- `text` - Input text to analyze

**Returns:**
- Object with sentiment label and score

**Example:**
```typescript
const result = await analyzeSentiment("This is amazing news!");
console.log(result); // { label: "POSITIVE", score: 0.98 }
```

### textPreprocessing.ts

#### preprocessText
```typescript
preprocessText(text: string): string[]
```
Complete preprocessing pipeline.

**Pipeline:**
1. Clean HTML and special characters
2. Tokenize into words
3. Remove stopwords
4. Apply stemming

**Parameters:**
- `text` - Raw input text

**Returns:**
- Array of processed tokens

**Example:**
```typescript
const tokens = preprocessText("<p>The companies are developing AI</p>");
console.log(tokens); // ["compani", "develop", "ai"]
```

### tfidfAnalysis.ts

#### extractKeywords
```typescript
extractKeywords(
  document: string, 
  allDocuments: string[], 
  topN?: number
): string[]
```
Extracts most important keywords from document.

**Parameters:**
- `document` - Target document
- `allDocuments` - Full corpus for IDF calculation
- `topN` - Number of keywords to return (default: 10)

**Returns:**
- Array of top keywords

**Example:**
```typescript
const keywords = extractKeywords(article, allArticles, 5);
console.log(keywords); // ["quantum", "computing", "breakthrough", "algorithm", "qubits"]
```

#### calculateDocumentSimilarity
```typescript
calculateDocumentSimilarity(
  doc1: string,
  doc2: string,
  allDocuments: string[]
): number
```
Measures similarity between two documents.

**Parameters:**
- `doc1` - First document
- `doc2` - Second document
- `allDocuments` - Corpus for TF-IDF calculation

**Returns:**
- Similarity score [0, 1]

**Example:**
```typescript
const similarity = calculateDocumentSimilarity(article1, article2, corpus);
if (similarity > 0.8) {
  console.log("Articles are very similar");
}
```

### nlpAnalysis.ts

#### analyzeLinguisticPatterns
```typescript
analyzeLinguisticPatterns(text: string): LinguisticAnalysis
```
Comprehensive linguistic analysis.

**Returns:**
```typescript
{
  sentenceCount: number;
  avgSentenceLength: number;
  nounPhrases: string[];
  verbPhrases: string[];
  posDistribution: Record<POSTag, number>;
  complexityScore: number;
  syntaxTree: SyntaxTree[];
}
```

**Example:**
```typescript
const analysis = analyzeLinguisticPatterns(articleContent);
console.log(`Complexity: ${analysis.complexityScore}`);
console.log(`Key phrases: ${analysis.nounPhrases.slice(0, 5)}`);
```

### clustering.ts

#### clusterArticles
```typescript
clusterArticles(articles: Article[]): Promise<ClusteredArticle[]>
```
Groups semantically similar articles.

**Parameters:**
- `articles` - Array of articles to cluster

**Returns:**
- Promise resolving to clustered articles with metadata

**Example:**
```typescript
const articles = await fetchArticles();
const clusters = await clusterArticles(articles);

clusters.forEach(cluster => {
  if (cluster.isClusterRepresentative) {
    console.log(`Cluster of ${cluster.clusterSize} articles: ${cluster.title}`);
  }
});
```

---

## Development Guidelines

### Code Style

**TypeScript Conventions:**
```typescript
// Use explicit types
const articles: Article[] = [];

// Prefer interfaces for objects
interface ArticleMetadata {
  keywords: string[];
  entities: Entity[];
  sentiment: SentimentScore;
}

// Use enums for constants
enum Category {
  Politics = 'politics',
  Technology = 'technology',
  Business = 'business',
}

// Async/await over promises
async function fetchData() {
  const response = await fetch(url);
  return await response.json();
}
```

**React Conventions:**
```typescript
// Functional components with TypeScript
interface ArticleCardProps {
  article: Article;
  onSelect: (id: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onSelect }) => {
  return <div onClick={() => onSelect(article.id)}>{article.title}</div>;
};

// Custom hooks
export const useArticleFiltering = (articles: Article[]) => {
  const [filtered, setFiltered] = useState<Article[]>(articles);
  
  const filterByCategory = useCallback((category: Category) => {
    setFiltered(articles.filter(a => a.category === category));
  }, [articles]);
  
  return { filtered, filterByCategory };
};
```

### Testing Strategy

**Unit Tests:**
```typescript
// Test pure functions
describe('preprocessText', () => {
  it('should remove HTML tags', () => {
    const input = '<p>Hello world</p>';
    const output = preprocessText(input);
    expect(output).not.toContain('<');
  });
  
  it('should convert to lowercase', () => {
    const output = preprocessText('HELLO');
    expect(output[0]).toBe('hello');
  });
});
```

**Integration Tests:**
```typescript
// Test data flow
describe('Article clustering', () => {
  it('should group similar articles', async () => {
    const articles = [
      { id: '1', content: 'AI technology advancing' },
      { id: '2', content: 'AI tech making progress' },
      { id: '3', content: 'Sports team wins game' },
    ];
    
    const clusters = await clusterArticles(articles);
    expect(clusters.length).toBe(2);
    expect(clusters[0].clusterSize).toBe(2);
  });
});
```

### Error Handling

**Graceful Degradation:**
```typescript
// Handle API failures
async function fetchArticles() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('API error');
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    // Return cached data or empty array
    return getCachedArticles() || [];
  }
}

// Handle processing errors
async function analyzeArticle(article: Article) {
  try {
    const analysis = await performAnalysis(article);
    return analysis;
  } catch (error) {
    console.error(`Analysis failed for article ${article.id}:`, error);
    // Return partial results or defaults
    return getDefaultAnalysis(article);
  }
}
```

### Performance Monitoring

**Logging:**
```typescript
// Time expensive operations
console.time('Article clustering');
const clusters = await clusterArticles(articles);
console.timeEnd('Article clustering');

// Log performance metrics
const metrics = {
  articlesProcessed: articles.length,
  clustersFormed: clusters.size,
  avgClusterSize: totalArticles / clusters.size,
  processingTime: Date.now() - startTime,
};
console.log('Clustering metrics:', metrics);
```

**Profiling:**
```typescript
// Use browser dev tools
// Profile → Record → Perform action → Stop
// Analyze flame graph for bottlenecks

// Add performance marks
performance.mark('clustering-start');
await clusterArticles(articles);
performance.mark('clustering-end');
performance.measure('clustering', 'clustering-start', 'clustering-end');
```

---

## Deployment & Production

### Build Optimization

```bash
# Production build
npm run build

# Analyze bundle size
npm run build -- --analyze

# Key optimizations:
# - Tree shaking removes unused code
# - Code splitting per route
# - Minification and compression
# - Source maps for debugging
```

### Environment Configuration

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ai': ['@huggingface/transformers'],
          'ui': ['@radix-ui/*'],
        },
      },
    },
  },
});
```

### Monitoring & Analytics

```typescript
// Track user interactions
const logEvent = (event: string, data: any) => {
  if (process.env.NODE_ENV === 'production') {
    analytics.track(event, data);
  }
};

// Monitor performance
const reportWebVitals = (metric: Metric) => {
  if (metric.name === 'LCP') {
    console.log('Largest Contentful Paint:', metric.value);
  }
};
```

---

## Troubleshooting

### Common Issues

**1. Clustering Performance**
- **Symptom**: Slow clustering on large datasets
- **Solution**: Reduce article limit, use approximate methods
- **Code**:
  ```typescript
  const ARTICLE_LIMIT = 50; // Reduce from 100
  const articles = allArticles.slice(0, ARTICLE_LIMIT);
  ```

**2. Memory Issues**
- **Symptom**: Browser crashes with large corpora
- **Solution**: Implement pagination and virtual scrolling
- **Code**:
  ```typescript
  const BATCH_SIZE = 20;
  const loadMoreArticles = () => {
    setArticles(prev => [...prev, ...nextBatch]);
  };
  ```

**3. API Rate Limits**
- **Symptom**: Hugging Face API returning 429 errors
- **Solution**: Implement caching and request throttling
- **Code**:
  ```typescript
  const throttle = pThrottle({ limit: 1, interval: 1000 });
  const throttledFetch = throttle(computeEmbedding);
  ```

---

## Future Enhancements

### Planned Features

1. **Real-time Article Streaming**
   - WebSocket connection to news sources
   - Live updates without page refresh
   - Push notifications for breaking news

2. **Advanced ML Models**
   - Fine-tuned transformers for news-specific tasks
   - Multi-language support
   - Improved entity recognition

3. **Collaborative Features**
   - Share curated feeds
   - Collaborative fact-checking
   - Community-driven bias ratings

4. **Mobile Applications**
   - React Native mobile app
   - Offline reading mode
   - Native notifications

5. **API for Third Parties**
   - RESTful API for article access
   - Webhook support for integrations
   - Developer documentation

---

For additional support or questions, please refer to the main README.md or contact the development team.

## CI & Badges

The repository includes a GitHub Actions workflow named `CI` defined at `.github/workflows/ci.yml`. The main `README.md` contains status badges that point to this workflow (Actions), the project license, GitHub stars, and last commit. Maintain the workflow file name if you want the badges to remain accurate.
