import { Article } from "./articles";
import { computeEmbedding, cosineSimilarity } from "./aiService";

export interface ClusteredArticle extends Article {
  clusterId: string;
  isClusterRepresentative: boolean;
  clusterSize: number;
  clusterArticles?: Article[];
}

const SIMILARITY_THRESHOLD = 0.75; // Articles with >75% similarity are clustered

export const clusterArticles = async (
  articles: Article[]
): Promise<ClusteredArticle[]> => {
  console.log("Starting article clustering...");
  
  // Compute embeddings for all articles
  const embeddings: { article: Article; embedding: number[] }[] = [];
  
  for (const article of articles.slice(0, 100)) { // Limit for performance
    try {
      const text = article.content.slice(0, 500); // Use first 500 chars for efficiency
      const embedding = await computeEmbedding(text);
      embeddings.push({ article, embedding });
    } catch (error) {
      console.error(`Failed to embed article ${article.id}:`, error);
    }
  }

  if (embeddings.length === 0) {
    return [];
  }

  // Cluster similar articles
  const clusters: Map<string, Article[]> = new Map();
  const processed = new Set<number>();
  
  embeddings.forEach((item, index) => {
    if (processed.has(item.article.id)) return;
    
    const cluster: Article[] = [item.article];
    const clusterId = `cluster-${item.article.id}`;
    
    // Find similar articles
    embeddings.forEach((other, otherIndex) => {
      if (index === otherIndex || processed.has(other.article.id)) return;
      
      const similarity = cosineSimilarity(item.embedding, other.embedding);
      
      if (similarity >= SIMILARITY_THRESHOLD) {
        cluster.push(other.article);
        processed.add(other.article.id);
      }
    });
    
    processed.add(item.article.id);
    clusters.set(clusterId, cluster);
  });

  // Create clustered articles with metadata
  const clusteredArticles: ClusteredArticle[] = [];
  
  clusters.forEach((clusterMembers, clusterId) => {
    // Sort by date (most recent first) or sentiment impact
    const sorted = [...clusterMembers].sort((a, b) => {
      const dateA = new Date(a.date || 0).getTime();
      const dateB = new Date(b.date || 0).getTime();
      return dateB - dateA;
    });
    
    const representative = sorted[0];
    
    clusteredArticles.push({
      ...representative,
      clusterId,
      isClusterRepresentative: true,
      clusterSize: clusterMembers.length,
      clusteredSources: clusterMembers.length, // Update the existing field
      clusterArticles: clusterMembers,
    });
  });

  console.log(`Clustered ${embeddings.length} articles into ${clusters.size} clusters`);
  return clusteredArticles;
};

export const getClusterById = (
  clusteredArticles: ClusteredArticle[],
  clusterId: string
): Article[] => {
  const cluster = clusteredArticles.find((a) => a.clusterId === clusterId);
  return cluster?.clusterArticles || [];
};
