import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { ArticleCard } from "@/components/ArticleCard";
import { ConversationalQuery } from "@/components/ConversationalQuery";
import { CleanReaderModal } from "@/components/CleanReaderModal";
import { ClusterModal } from "@/components/ClusterModal";
import { DailyBriefScore } from "@/components/DailyBriefScore";
import { loadArticles, Article, ContextLens } from "@/lib/articles";
import { fetchLiveNewsCached, validateNewsApiKey } from "@/lib/newsApi";
import { clusterArticles, ClusteredArticle } from "@/lib/clustering";
import { Button } from "@/components/ui/button";
import { Loader2, Rss, GitMerge } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isConversational, setIsConversational] = useState(false);
  const [activeFilter, setActiveFilter] = useState("brief");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [readerOpen, setReaderOpen] = useState(false);
  const [contextLens, setContextLens] = useState<ContextLens>("none");
  const [isLiveNews, setIsLiveNews] = useState(false);
  const [liveArticles, setLiveArticles] = useState<Article[]>([]);
  const [newsApiKeyValid, setNewsApiKeyValid] = useState<boolean | null>(null);
  const [isLoadingNews, setIsLoadingNews] = useState(false);
  const [enableClustering, setEnableClustering] = useState(false);
  const [clusteredArticles, setClusteredArticles] = useState<ClusteredArticle[]>([]);
  const [isClusteringInProgress, setIsClusteringInProgress] = useState(false);
  const [selectedCluster, setSelectedCluster] = useState<Article[]>([]);
  const [clusterModalOpen, setClusterModalOpen] = useState(false);
  const [isAIAvailable, setIsAIAvailable] = useState(false);
  
  const navigate = useNavigate();
  const staticArticles = useMemo(() => loadArticles(), []);
  // Read NewsAPI key presence for UI disabling
  const hasNewsApiKey = (import.meta as any).env?.VITE_NEWSAPI_KEY;
  const articles = enableClustering && clusteredArticles.length > 0 
    ? clusteredArticles 
    : isLiveNews 
    ? liveArticles 
    : staticArticles;

  useEffect(() => {
    const loadLiveNews = async () => {
      if (isLiveNews && liveArticles.length === 0) {
        setIsLoadingNews(true);
        try {
          const news = await fetchLiveNewsCached(undefined, undefined, 50);
          setLiveArticles(news);
          toast({
            title: "Live news loaded",
            description: `Fetched ${news.length} articles from NewsAPI`,
          });
        } catch (error) {
          toast({
            title: "Failed to load live news",
            description: "Please check your API key in newsApi.ts",
            variant: "destructive",
          });
          setIsLiveNews(false);
        } finally {
          setIsLoadingNews(false);
        }
      }
    };

    loadLiveNews();
  }, [isLiveNews, liveArticles.length]);

  useEffect(() => {
    // Validate API key on mount if possible
    const checkKey = async () => {
      const valid = await validateNewsApiKey();
      setNewsApiKeyValid(valid);
    };
    checkKey();
  }, []);

  useEffect(() => {
    const performClustering = async () => {
      if (enableClustering && !isClusteringInProgress) {
        setIsClusteringInProgress(true);
        toast({
          title: "Clustering stories...",
          description: "Analyzing articles to find similar coverage",
        });
        
        try {
          const sourceArticles = isLiveNews ? liveArticles : staticArticles;
          const clustered = await clusterArticles(sourceArticles.slice(0, 100)); // Limit to 100 for performance
          setClusteredArticles(clustered);
          
          const totalClusters = clustered.length;
          const multiSourceClusters = clustered.filter(a => a.clusterSize > 1).length;
          
          toast({
            title: "Clustering complete",
            description: `Found ${multiSourceClusters} stories with multiple sources from ${totalClusters} total clusters`,
          });
        } catch (error) {
          toast({
            title: "Clustering failed",
            description: "Could not cluster articles",
            variant: "destructive",
          });
          setEnableClustering(false);
        } finally {
          setIsClusteringInProgress(false);
        }
      }
    };

    performClustering();
  }, [enableClustering, isLiveNews, liveArticles, staticArticles, isClusteringInProgress]);

  const filteredArticles = useMemo(() => {
    let result = articles;
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (article) =>
          article.content.toLowerCase().includes(query) ||
          article.category.toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (activeFilter === "brief") {
      result = result.slice(0, 100); // Daily brief - top 100
    } else if (activeFilter === "trending") {
      // Trending: High sentiment articles
      result = result
        .filter(a => Math.abs(a.sentiment.compound) > 0.3)
        .slice(0, 50);
    } else if (activeFilter === "bias") {
      // Show only articles with Bias Radar
      result = result.filter(a => a.deep_dive_format === "Bias Radar");
    } else if (activeFilter !== "all" && activeFilter !== "topics" && activeFilter !== "audio") {
      // Filter by specific category
      result = result.filter(a => a.category.toLowerCase() === activeFilter.toLowerCase());
    }

    return result;
  }, [articles, searchQuery, activeFilter]);

  const handleReadMore = (article: Article) => {
    setSelectedArticle(article);
    setReaderOpen(true);
  };

  const handleCitationClick = (articleId: number) => {
    const article = articles.find(a => a.id === articleId);
    if (article) {
      setSelectedArticle(article);
      setReaderOpen(true);
    }
  };

  const handleDeepDive = (articleId: number) => {
    navigate(`/deep-dive/${articleId}`);
  };

  const handleViewCluster = (article: ClusteredArticle) => {
    if (article.clusterArticles && article.clusterArticles.length > 0) {
      setSelectedCluster(article.clusterArticles);
      setClusterModalOpen(true);
    }
  };

  const handleToggleClustering = () => {
    if (!enableClustering) {
      setEnableClustering(true);
    } else {
      setEnableClustering(false);
      setClusteredArticles([]);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isConversational={isConversational}
        onToggleMode={() => setIsConversational(!isConversational)}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        contextLens={contextLens}
        onContextLensChange={setContextLens}
        onAIAvailabilityChange={setIsAIAvailable}
      />

      <main className="container px-4 md:px-8 py-8">
        {isConversational && searchQuery ? (
          <ConversationalQuery 
            query={searchQuery} 
            onCitationClick={handleCitationClick}
            articles={articles}
          />
        ) : (
          <>
            <div className="mb-8 animate-fade-in flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tight text-foreground mb-4">
                  {enableClustering && "Clustered Stories"}
                  {isLiveNews && !enableClustering && "Live News"}
                  {!isLiveNews && !enableClustering && "Quick Read"}
                </h2>
                <p className="text-xl text-muted-foreground">
                  {filteredArticles.length} {filteredArticles.length === 1 ? "story" : "stories"} found
                  {enableClustering && clusteredArticles.length > 0 && (
                    <span className="ml-2 text-sm">
                      ({clusteredArticles.filter(a => (a as ClusteredArticle).clusterSize > 1).length} with multiple sources)
                    </span>
                  )}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={isLiveNews ? "default" : "outline"}
                  size="lg"
                  onClick={() => setIsLiveNews(!isLiveNews)}
                  disabled={isLoadingNews || enableClustering || !hasNewsApiKey}
                  className="gap-2"
                >
                  {isLoadingNews ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Rss className="h-5 w-5" />
                  )}
                  {isLiveNews ? "Archived" : "Live News"}
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={async () => {
                    // Force refresh live news
                    setIsLoadingNews(true);
                    try {
                      const news = await fetchLiveNewsCached(undefined, undefined, 50, true);
                      setLiveArticles(news);
                      toast({ title: "Live news refreshed", description: `Fetched ${news.length} articles` });
                    } catch (e) {
                      toast({ title: "Refresh failed", description: "Could not refresh live news", variant: "destructive" });
                    } finally {
                      setIsLoadingNews(false);
                    }
                  }}
                  disabled={!hasNewsApiKey}
                >
                  Refresh
                </Button>
                <div className="flex items-center gap-2">
                  {newsApiKeyValid === null ? (
                    <span className="text-sm text-muted-foreground">Checking key…</span>
                  ) : newsApiKeyValid ? (
                    // Hide positive confirmation to reduce UI clutter for end users
                    null
                  ) : (
                    <span className="text-sm text-destructive">Invalid NewsAPI key</span>
                  )}
                </div>
                {!hasNewsApiKey && (
                  <div className="text-sm text-muted-foreground mt-1">
                    Live News disabled — set <code>VITE_NEWSAPI_KEY</code> in a <code>.env</code> file to enable.
                  </div>
                )}
                <Button
                  variant={enableClustering ? "default" : "outline"}
                  size="lg"
                  onClick={handleToggleClustering}
                  disabled={isClusteringInProgress || !isAIAvailable}
                  className="gap-2"
                  title={!isAIAvailable ? "AI server required for clustering. Start the inference server to enable." : ""}
                >
                  {isClusteringInProgress ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <GitMerge className="h-5 w-5" />
                  )}
                  {enableClustering ? "Unclustered" : "Cluster"}
                </Button>
              </div>
            </div>

            {activeFilter === "brief" && (
              <DailyBriefScore
                noveltyScore={72}
                diversityScore={85}
                totalArticles={filteredArticles.length}
              />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredArticles.map((article, index) => (
                <div key={article.id} style={{ animationDelay: `${index * 0.05}s` }}>
                  <ArticleCard 
                    article={article} 
                    index={index}
                    onReadMore={handleReadMore}
                    onDeepDive={handleDeepDive}
                    onViewCluster={
                      enableClustering && 
                      (article as ClusteredArticle).clusterSize > 1
                        ? () => handleViewCluster(article as ClusteredArticle)
                        : undefined
                    }
                  />
                </div>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-16">
                <p className="text-2xl text-muted-foreground">No articles found matching your search.</p>
              </div>
            )}
          </>
        )}
      </main>

      <CleanReaderModal
        article={selectedArticle}
        open={readerOpen}
        onOpenChange={setReaderOpen}
      />
      
      <ClusterModal
        articles={selectedCluster}
        open={clusterModalOpen}
        onOpenChange={setClusterModalOpen}
        onArticleSelect={(article) => {
          setSelectedArticle(article);
          setReaderOpen(true);
        }}
      />
    </div>
  );
};

export default HomePage;
