import articlesData from "@/data/nuvision_2k.json";

export interface Article {
  id: number;
  content: string;
  category: string;
  sentiment: {
    polarity: number;
    compound: number;
  };
  url?: string;
  urlToImage?: string | null;
  deep_dive_format?: "Bias Radar" | "Event Timeline" | "Knowledge Map" | "Deep Vision" | null;
  isBreaking?: boolean;
  publisher?: string;
  author?: string;
  date?: string;
  region?: string;
  clusteredSources?: number;
  recommendationReason?: string;
  // Trust Project fields
  contentType?: "news" | "opinion" | "analysis";
  authorExpertise?: string;
  primarySources?: Array<{ name: string; url: string }>;
}

export type ContextLens = "beginner" | "analyst" | "executive" | "student" | "none";

export const getSentimentColor = (compound: number) => {
  if (compound > 0.05) return "success";
  if (compound < -0.05) return "danger";
  return "warning";
};

export const getSentimentLabel = (compound: number) => {
  if (compound > 0.05) return "Positive";
  if (compound < -0.05) return "Negative";
  return "Neutral";
};

export const assignDeepDiveFormat = (category: string): Article["deep_dive_format"] => {
  const upperCategory = category.toUpperCase();
  
  if (["POLITICS", "WORLD NEWS", "WORLDPOST"].includes(upperCategory)) {
    return "Bias Radar";
  }
  if (upperCategory === "CRIME") {
    return "Event Timeline";
  }
  if (["BUSINESS", "TECH"].includes(upperCategory)) {
    return "Knowledge Map";
  }
  if (["ENVIRONMENT", "SCIENCE", "WELLNESS", "STYLE & BEAUTY"].includes(upperCategory)) {
    return "Deep Vision";
  }
  return null;
};

const mockPublishers = ["Reuters", "AP News", "BBC", "CNN", "The Guardian", "NYT", "WSJ", "Bloomberg"];
const mockAuthors = ["Sarah Johnson", "Michael Chen", "Alex Rivera", "Emma Thompson", "David Kim", "Maria Garcia"];
const mockRegions = ["US", "UK", "EU", "Asia", "Global"];
const mockReasons = [
  "Trending in your region",
  "Matches your interests in {category}",
  "High source diversity (7 sources)",
  "Counter-perspective to your usual reads",
  "Breaking news in {category}",
  "Popular among analysts"
];

const mockExpertise = [
  "15+ years covering politics",
  "PhD in Economics",
  "Former White House correspondent",
  "Tech industry analyst",
  "Medical degree, health journalist",
  "Environmental policy expert",
  "Award-winning investigative reporter",
  "Former diplomat, foreign affairs expert"
];

const mockPrimarySources = [
  [
    { name: "Official Statement", url: "#" },
    { name: "Research Paper", url: "#" }
  ],
  [
    { name: "Government Report", url: "#" },
    { name: "Court Documents", url: "#" }
  ],
  [
    { name: "Study Results", url: "#" },
    { name: "Press Release", url: "#" }
  ],
  [
    { name: "Congressional Record", url: "#" }
  ]
];

const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generateMetadata = (article: Omit<Article, "deep_dive_format">, index: number): Partial<Article> => {
  const daysAgo = Math.floor(Math.random() * 7);
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  
  // Determine content type based on category and randomness
  const contentTypes: Array<"news" | "opinion" | "analysis"> = ["news", "opinion", "analysis"];
  const weights = article.category.toUpperCase().includes("POLITICS") 
    ? [0.5, 0.3, 0.2]  // More opinions in politics
    : [0.7, 0.1, 0.2]; // More news in other categories
  
  const rand = Math.random();
  let contentType: "news" | "opinion" | "analysis";
  if (rand < weights[0]) contentType = "news";
  else if (rand < weights[0] + weights[1]) contentType = "opinion";
  else contentType = "analysis";
  
  return {
    publisher: getRandomItem(mockPublishers),
    author: getRandomItem(mockAuthors),
    date: date.toISOString().split('T')[0],
    region: getRandomItem(mockRegions),
    clusteredSources: Math.random() > 0.6 ? Math.floor(Math.random() * 8) + 2 : undefined,
    recommendationReason: getRandomItem(mockReasons).replace("{category}", article.category),
    isBreaking: Math.random() > 0.9, // 10% chance of being breaking news
    contentType,
    authorExpertise: Math.random() > 0.3 ? getRandomItem(mockExpertise) : undefined,
    primarySources: Math.random() > 0.5 ? getRandomItem(mockPrimarySources) : undefined
  };
};

export const loadArticles = (): Article[] => {
  return (articlesData as Omit<Article, "deep_dive_format">[]).map((article, index) => ({
    ...article,
    deep_dive_format: assignDeepDiveFormat(article.category),
    ...generateMetadata(article, index)
  }));
};

export const getArticleById = (id: number): Article | undefined => {
  const articles = loadArticles();
  return articles.find((article) => article.id === id);
};

export const getHeadline = (content: string): string => {
  const sentences = content.split(". ");
  return sentences[0];
};

export const getSummary = (content: string): string => {
  const sentences = content.split(". ");
  return sentences.slice(1, 3).join(". ");
};
