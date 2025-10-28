import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AudioPlayer } from "@/components/AudioPlayer";
import { loadArticles } from "@/lib/articles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AudioPage = () => {
  const articles = loadArticles().slice(0, 10); // Top 10 articles
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);
  const selectedArticle = articles.find(a => a.id === selectedArticleId);

  const briefingText = articles
    .map((article, index) => `Article ${index + 1}. ${article.content.substring(0, 300)}`)
    .join(". ");

  return (
    <div className="min-h-screen bg-background text-foreground pb-32">
      <div className="container max-w-4xl px-4 md:px-8 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="space-y-8 animate-fade-in">
          <div className="flex items-center gap-4">
            <Headphones className="h-12 w-12 text-primary" />
            <div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight">Audio Briefings</h1>
              <p className="text-xl text-muted-foreground mt-2">
                Listen to your personalized news digest
              </p>
            </div>
          </div>

          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardHeader>
              <CardTitle>Full Daily Briefing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {articles.length} articles • Approx. {Math.round(briefingText.split(' ').length / 150)} min
              </p>
              <AudioPlayer articleText={briefingText} title="Daily Briefing" />
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Individual Articles</h2>
            {articles.map((article) => (
              <Card
                key={article.id}
                className="bg-card border-border hover:border-primary transition-colors cursor-pointer"
                onClick={() => setSelectedArticleId(article.id)}
              >
                <CardContent className="p-4">
                  <p className="font-semibold mb-2">#{article.id} • {article.category}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {article.content.substring(0, 150)}...
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {selectedArticle && (
        <div className="fixed bottom-0 left-0 right-0 p-4">
          <AudioPlayer
            articleText={selectedArticle.content}
            title={`Article #${selectedArticle.id}`}
          />
        </div>
      )}
    </div>
  );
};

export default AudioPage;