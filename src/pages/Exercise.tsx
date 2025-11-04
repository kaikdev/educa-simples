import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { exercises } from "@/data/mockData";
import { useProgress } from "@/contexts/ProgressContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

const Exercise = () => {
  const { exerciseId } = useParams();
  const navigate = useNavigate();
  const { addResult } = useProgress();
  const exercise = exercises.find((e) => e.id === exerciseId);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  if (!exercise) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Exercício não encontrado</p>
      </div>
    );
  }

  const handleConfirm = () => {
    if (selectedOption === null) {
      toast.error("Por favor, selecione uma resposta!");
      return;
    }

    const isCorrect = selectedOption === exercise.correctAnswer;
    setShowResult(true);
    
    addResult({
      exerciseId: exercise.id,
      subjectId: exercise.subjectId,
      isCorrect,
      timestamp: Date.now(),
    });

    if (isCorrect) {
      toast.success("Parabéns! Você acertou! 🎉", {
        duration: 3000,
      });
    } else {
      toast.error("Ops! Tente novamente! 💪", {
        duration: 3000,
      });
    }
  };

  const handleNext = () => {
    navigate(`/materia/${exercise.subjectId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <Button
          variant="ghost"
          className="mb-8 gap-2"
          onClick={() => navigate(`/materia/${exercise.subjectId}`)}
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>

        <div className="max-w-3xl mx-auto">
          <Card className="mb-8 border-2">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-center text-foreground mb-6">
                {exercise.question}
              </h2>
            </CardContent>
          </Card>

          <div className="space-y-4 mb-8">
            {exercise.options.map((option, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all border-2 ${
                  selectedOption === index
                    ? showResult
                      ? index === exercise.correctAnswer
                        ? "border-success bg-success/10"
                        : "border-destructive bg-destructive/10"
                      : "border-primary bg-primary/10"
                    : showResult && index === exercise.correctAnswer
                    ? "border-success bg-success/10"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => !showResult && setSelectedOption(index)}
              >
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {showResult && index === exercise.correctAnswer ? (
                      <CheckCircle2 className="w-8 h-8 text-success" />
                    ) : showResult && selectedOption === index ? (
                      <XCircle className="w-8 h-8 text-destructive" />
                    ) : (
                      <div
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                          selectedOption === index
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-muted-foreground"
                        }`}
                      >
                        {selectedOption === index && (
                          <div className="w-3 h-3 rounded-full bg-primary-foreground" />
                        )}
                      </div>
                    )}
                  </div>
                  <p className="text-lg font-medium text-foreground">{option}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center">
            {!showResult ? (
              <Button
                size="lg"
                className="text-lg px-12 py-6"
                onClick={handleConfirm}
              >
                Confirmar Resposta
              </Button>
            ) : (
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-12 py-6"
                onClick={handleNext}
              >
                Próximo Exercício
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exercise;
