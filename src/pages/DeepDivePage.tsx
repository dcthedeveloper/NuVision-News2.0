import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getArticleById } from "@/lib/articles";
import { lazy, Suspense } from "react";

const BiasRadar = lazy(() => import("@/components/deep-dive/BiasRadar").then((m) => ({ default: m.BiasRadar })));
const EventTimeline = lazy(() => import("@/components/deep-dive/EventTimeline").then((m) => ({ default: m.EventTimeline })));
const KnowledgeMap = lazy(() => import("@/components/deep-dive/KnowledgeMap").then((m) => ({ default: m.KnowledgeMap })));
const DeepVisionMode = lazy(() => import("@/components/deep-dive/DeepVisionMode").then((m) => ({ default: m.DeepVisionMode })));

const DeepDivePage = () => {
  const { id } = useParams();
  const article = getArticleById(Number(id));

  if (!article || !article.deep_dive_format) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Deep Dive Not Available</h1>
          <p className="text-muted-foreground mb-8">
            This article doesn't have a Deep Dive experience.
          </p>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed top-4 left-4 z-50">
        <Link to="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Exit Deep Dive
          </Button>
        </Link>
      </div>

      <Suspense fallback={<div className="p-8 text-center">Loading experience…</div>}>
        {article.deep_dive_format === "Bias Radar" && <BiasRadar article={article} />}
        {article.deep_dive_format === "Event Timeline" && <EventTimeline article={article} />}        
        {article.deep_dive_format === "Knowledge Map" && <KnowledgeMap article={article} />}
        {article.deep_dive_format === "Deep Vision" && <DeepVisionMode article={article} />}
      </Suspense>
    </div>
  );
};

export default DeepDivePage;
