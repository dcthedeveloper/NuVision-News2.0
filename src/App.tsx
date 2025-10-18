import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Lazy load all pages for code splitting
const HomePage = lazy(() => import("./pages/HomePage"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const DeepDivePage = lazy(() => import("./pages/DeepDivePage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const AudioPage = lazy(() => import("./pages/AudioPage"));
const BiasRadarPage = lazy(() => import("./pages/BiasRadarPage"));
const TopicsPage = lazy(() => import("./pages/TopicsPage"));
const NotificationSettingsPage = lazy(() => import("./pages/NotificationSettingsPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/article/:id" element={<ArticlePage />} />
              <Route path="/deep-dive/:id" element={<DeepDivePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/audio" element={<AudioPage />} />
              <Route path="/bias-radar" element={<BiasRadarPage />} />
              <Route path="/topics" element={<TopicsPage />} />
              <Route path="/notifications" element={<NotificationSettingsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
