import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { exercises } from "@/data/mockData";
import { useProgress } from "@/contexts/ProgressContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

const Exercise = () => {
  const { exerciseId } = useParams();
  const { nextId } = useParams();
  const navigate = useNavigate();
  const { addResult } = useProgress();
  //const exercise = exercises.find((e) => e.id === exerciseId);
  const [exercise, setExercise] = useState(null)
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [nextE,setNextE]:any = useState([]);
  const [params] = useSearchParams();
  useEffect(() => {
    getExercise()
    setArr()
  }, [])
  async function setArr() {
    const data = JSON.parse(params.get("data"));
    console.log("params is ")
    console.log(data)
    setNextE(data)
  }
  async function getExercise() {
    let result = await fetch(`http://localhost:3000/quest/${exerciseId}/byId`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    }).then((e) => e.json())
    if (!result.msgError) {
      let ca = 0
      Array.from(result.answers).forEach((el: any, i) => {
        if (el.correct) {
          ca = i
        }
      })
      //console.log("the exercise is " + ca)
      setExercise({
        id: result.id, question: result.question,
        subjectId: result.subject.id, options: result.answers, correctAnswer: ca
      })
    }
    //console.log(result)
  }
  if (!exercise) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Exercício não encontrado</p>
      </div>
    );
  }

  const handleConfirm = async () => {
    if (selectedOption === null) {
      toast.error("Por favor, selecione uma resposta!");
      return;
    }

    //let isCorrect:any = selectedOption //selectedOption === exercise.correctAnswer;
    //console.log(`selected ${selectedOption} - exercise ${exercise.correctAnswer}`)
    let isCorrect = selectedOption === exercise.correctAnswer;
    setShowResult(true);

    addResult({
      exerciseId: exercise.id,
      subjectId: exercise.subjectId,
      isCorrect,
      timestamp: Date.now(),
    });

    await insertPoints(isCorrect)

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

  async function insertPoints(correctA) {
    let token = `Bearer ${localStorage.getItem("token")}`
    try {
      let result = await fetch(`http://localhost:3000/userAnswer/${exercise.subjectId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({ correct: correctA, questionID: exerciseId })
      }).then((e) => e.json())
      //console.log(result)
    } catch (e) {
      console.log(e)
    }
  }

  const handleNext = () => {
    //navigate(`/materia/${exercise.subjectId}`);
    console.log("here is the vals")
    console.log(nextId)
    console.log(nextE)
    let current=0
    if((nextE.length-1) >= (parseInt(nextId)+1)){
      current = (parseInt(nextId)+1)
    }
    let str = `/exercicio/${nextE[nextId]}/${current}?data=${encodeURIComponent(JSON.stringify(nextE))}`
    console.log(str)
    navigate(str);
    window.location.reload()
  };

  return (
    <div className="min-h-screen bg-background">
      <style>
        {`
          .min-h-screen.bg-background {
            background-image: url("../src/assets/image/background-exercicios.webp");
            background-position: left center;
            background-size: contain;
            background-repeat: no-repeat;
          }
        `}
      </style>

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
                  //selectedOption === index
                  selectedOption === index
                    //option.correct
                    //selectedOption
                    ? showResult
                      ? index === exercise.correctAnswer //option.correct //index === exercise.correctAnswer
                        ? "border-success bg-success/10"
                        : "border-destructive bg-destructive/10"
                      : "border-primary bg-primary/10"
                    : showResult && index === exercise.correctAnswer //option.correct //index === exercise.correctAnswer
                      ? "border-success bg-success/10"
                      : "border-border hover:border-primary/50"
                  }`}
                onClick={() => !showResult && setSelectedOption(index)}//option.correct)}//index)}
              >
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {showResult && /*option.correct*/ index === exercise.correctAnswer ? (
                      <CheckCircle2 className="w-8 h-8 text-success" />
                    ) : showResult && /*selectedOption*/ selectedOption === index ? (
                      <XCircle className="w-8 h-8 text-destructive" />
                    ) : (
                      <div
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${selectedOption === index
                          //selectedOption
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-muted-foreground"
                          }`}
                      >
                        {selectedOption === index /*selectedOption*/ && (
                          <div className="w-3 h-3 rounded-full bg-primary-foreground" />
                        )}
                      </div>
                    )}
                  </div>
                  <p className="text-lg font-medium text-foreground">{option.description}</p>
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
