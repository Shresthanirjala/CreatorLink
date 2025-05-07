import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react"
import NotFound from "./pages/NotFound"
// import Test from "./pages/test"

const Index = lazy(() => import("./pages/Index"))
const Explore = lazy(() => import("./pages/Explore"))
const CreatorProfile = lazy(() => import("./pages/CreatorProfile"))
const Portfolio = lazy(() => import("./pages/Portfolio"))
const CreatorOnboarding = lazy(() => import("./pages/CreatorOnboarding"))

const AppRoutes = () => {
  return (
    <>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/creator/:id" element={<CreatorProfile />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/become-creator" element={<CreatorOnboarding />} />
              {/* <Route path="/test" element={<Test />} /> */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </>
  )
}
export default AppRoutes
