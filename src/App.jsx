import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ProgressProvider } from "./contexts/ProgressContext";

// Páginas públicas (do projeto atual)
import Home from './pages/public/Home/Home';

// Páginas internas (do novo projeto)
import Index from "./pages/Index";
import SubjectExercises from "./pages/SubjectExercises";
import Exercise from "./pages/Exercise";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ProgressProvider>
          <Toaster />
          <Sonner />
          <Router>
            <div className="app-container">
              <Routes>
                {/* Rotas Públicas */}
                <Route path="/" element={<Home />} />
                
                {/* Rotas Internas do Novo Projeto */}
                <Route path="/index" element={<Index />} />
                <Route path="/materia/:subjectId" element={<SubjectExercises />} />
                <Route path="/exercicio/:exerciseId/:nextId" element={<Exercise />} />
                <Route path="/perfil" element={<Profile />} />
                <Route path="/admin" element={<Admin />} />
                
                {/* Rota para página não encontrada */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Router>
        </ProgressProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;