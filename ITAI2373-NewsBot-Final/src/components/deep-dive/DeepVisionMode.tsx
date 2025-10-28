import { useState, useEffect } from "react";
import { Article, getHeadline } from "@/lib/articles";
import { analyzeBias } from "@/lib/biasAnalysis";
import { extractTimeline } from "@/lib/timelineExtraction";
import { Newspaper, TrendingUp, Clock, Users } from "lucide-react";

interface DeepVisionModeProps {
  article: Article;
}

export const DeepVisionMode = ({ article }: DeepVisionModeProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [biasData, setBiasData] = useState<any>(null);
  const [timeline, setTimeline] = useState<any[]>([]);


  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Extract bias analysis and timeline
    const loadData = async () => {
      try {
        const bias = analyzeBias([article]);
        setBiasData(bias);
        
        const events = await extractTimeline([article]);
        setTimeline(events);
      } catch (error) {
        console.error("Failed to load Deep Vision data:", error);
      }
    };
    
    loadData();
  }, [article]);

  return (
    <div className="relative bg-background text-foreground">
      {/* Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-border z-50">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl text-center space-y-8 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary rounded-full text-primary text-sm font-semibold mb-4">
            DEEP VISION MODE
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-tight">
            {getHeadline(article.content)}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            An immersive exploration of this story's context, evolution, and impact
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Newspaper className="h-4 w-4" />
              {article.publisher}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {new Date(article.date || 0).toLocaleDateString()}
            </div>
          </div>
        </div>
      </section>

      {/* Context Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20 bg-card/30">
        <div className="max-w-4xl space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold">The Context</h2>
            <p className="text-xl text-muted-foreground">Understanding the bigger picture</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 bg-background border border-border rounded-lg space-y-4">
              <TrendingUp className="h-10 w-10 text-primary" />
              <h3 className="text-2xl font-bold">Why This Matters</h3>
              <p className="text-muted-foreground leading-relaxed">
                {article.content.slice(0, 200)}...
              </p>
            </div>
            
            <div className="p-8 bg-background border border-border rounded-lg space-y-4">
              <Users className="h-10 w-10 text-primary" />
              <h3 className="text-2xl font-bold">Who's Involved</h3>
              <div className="space-y-2">
                {["Key stakeholder 1", "Key stakeholder 2", "Key stakeholder 3"].map((stakeholder, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-muted-foreground">{stakeholder}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Landscape */}
      {biasData && (
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-4xl w-full space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-6xl font-bold">The Media Landscape</h2>
              <p className="text-xl text-muted-foreground">How different outlets are covering this</p>
            </div>
            
            <div className="grid grid-cols-3 gap-8 text-center">
              <div className="space-y-4">
                <div className="text-5xl font-black text-chart-1">{biasData.leftCount || 0}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Left-Leaning</div>
              </div>
              <div className="space-y-4">
                <div className="text-5xl font-black text-chart-3">{biasData.centerCount || 0}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Center</div>
              </div>
              <div className="space-y-4">
                <div className="text-5xl font-black text-chart-2">{biasData.rightCount || 0}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Right-Leaning</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Timeline */}
      {timeline.length > 0 && (
        <section className="min-h-screen flex items-center justify-center px-4 py-20 bg-card/30">
          <div className="max-w-4xl w-full space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-6xl font-bold">The Story Evolution</h2>
              <p className="text-xl text-muted-foreground">Key moments in this narrative</p>
            </div>
            
            <div className="space-y-8">
              {timeline.slice(0, 5).map((event, index) => (
                <div key={index} className="flex gap-6 animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-primary" />
                    {index < timeline.length - 1 && (
                      <div className="w-0.5 h-full bg-border mt-2" />
                    )}
                  </div>
                  <div className="pb-8 flex-1">
                    <div className="text-sm text-muted-foreground mb-2">{event.dateString}</div>
                    <h3 className="text-xl font-bold mb-2">{event.headline}</h3>
                    <p className="text-muted-foreground">{event.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Key Perspectives */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl w-full space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold">Key Perspectives</h2>
            <p className="text-xl text-muted-foreground">Different viewpoints on this issue</p>
          </div>
          
          <div className="space-y-6">
            {[
              { title: "Economic Impact", content: "Analysis of financial implications..." },
              { title: "Social Implications", content: "How this affects communities..." },
              { title: "Political Dynamics", content: "The role of policy and governance..." },
            ].map((perspective, index) => (
              <div key={index} className="p-8 bg-background border border-border rounded-lg space-y-3">
                <h3 className="text-2xl font-bold">{perspective.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{perspective.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
