import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface ExerciseResult {
  exerciseId: string;
  subjectId: string;
  isCorrect: boolean;
  timestamp: number;
}

interface ProgressContextType {
  results: ExerciseResult[];
  addResult: (result: ExerciseResult) => void;
  getStats: () => {
    total: { correct: number; incorrect: number };
    bySubject: Record<string, { correct: number; incorrect: number }>;
  };
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [results, setResults] = useState<ExerciseResult[]>(() => {
    const saved = localStorage.getItem("exerciseResults");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("exerciseResults", JSON.stringify(results));
  }, [results]);

  const addResult = (result: ExerciseResult) => {
    setResults((prev) => [...prev, result]);
  };

  const getStats = () => {
    const total = { correct: 0, incorrect: 0 };
    const bySubject: Record<string, { correct: number; incorrect: number }> = {};

    results.forEach((result) => {
      if (result.isCorrect) {
        total.correct++;
      } else {
        total.incorrect++;
      }

      if (!bySubject[result.subjectId]) {
        bySubject[result.subjectId] = { correct: 0, incorrect: 0 };
      }

      if (result.isCorrect) {
        bySubject[result.subjectId].correct++;
      } else {
        bySubject[result.subjectId].incorrect++;
      }
    });

    return { total, bySubject };
  };

  return (
    <ProgressContext.Provider value={{ results, addResult, getStats }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within ProgressProvider");
  }
  return context;
};
