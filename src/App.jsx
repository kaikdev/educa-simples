import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ProgressProvider } from "./contexts/ProgressContext";

// Rotas protegidas
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

// Páginas públicas (do projeto atual)
import Home from './pages/public/Home/Home';

// Páginas internas (do novo projeto)
import Index from "./pages/Index";
import SubjectExercises from "./pages/SubjectExercises";
import Exercise from "./pages/Exercise";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

//new Pages
import Ranking from "./pages/Ranking"
import AdminEdit from "./pages/AdminEdit"

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

                {/* Rotas internas (qualquer usuário logado) */}
                <Route
                  path="/index"
                  element={
                    <PrivateRoute>
                      <Index />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/materia/:subjectId"
                  element={
                    <PrivateRoute>
                      <SubjectExercises />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/exercicio/:exerciseId"
                  element={
                    <PrivateRoute>
                      <Exercise />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/exercicio/:exerciseId/:nextId"
                  element={
                    <PrivateRoute>
                      <Exercise />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/perfil"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />

                {/*ranking*/}
                <Route
                  path="/ranking"
                  element={
                    <PrivateRoute>
                      <Ranking />
                    </PrivateRoute>
                  }
                />
                
                {/* Rotas de admin */}
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <Admin />
                    </AdminRoute>
                  }
                />
                
                <Route
                  path="/admin/edit"
                  element={
                    <AdminRoute>
                      <AdminEdit></AdminEdit>
                    </AdminRoute>
                  }
                />

                {/* Página não encontrada */}
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