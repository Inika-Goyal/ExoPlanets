import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { EarthSection as Home } from "./components/EarthSection";
import { AboutSection as About } from "./components/AboutSection";
import { Footer as Contact } from "./components/Footer";
import { GalaxySection as Facts} from "./components/GalaxySection";
=======
import '@google/model-viewer';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Header } from "./components/Header";
import { EarthSection as Home } from "./components/EarthSection";
import { PartnersSection as About } from "./components/AboutSection";
import { Footer as Contact } from "./components/Footer";
import { GalaxySection as Facts} from "./components/GalaxySection";

>>>>>>> origin/Albert
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
<<<<<<< HEAD
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Additional routes share the same layout; Index already has content spacing */}
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
=======
      <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
>>>>>>> origin/Albert
          <Route path="/facts" element={<Facts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
