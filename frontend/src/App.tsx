import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '@google/model-viewer';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Contact from "./pages/Contact";
import { EarthSection as Home } from "./components/EarthSection";
import { AboutSection as About } from "./components/AboutSection";
import { GalaxySection as Facts} from "./components/GalaxySection";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Additional routes share the same layout; Index already has content spacing */}
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/facts" element={<Facts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
  <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
