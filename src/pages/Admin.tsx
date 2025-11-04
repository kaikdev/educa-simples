import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const Admin = () => {
  const [subjectForm, setSubjectForm] = useState({
    name: "",
    icon: "",
    color: "",
    description: "",
  });

  const [exerciseForm, setExerciseForm] = useState({
    subjectId: "",
    question: "",
    option1: "",
    option2: "",
    option3: "",
    correctAnswer: "0",
  });

  const handleSubjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nova matéria:", subjectForm);
    toast.success("Matéria cadastrada com sucesso!");
    setSubjectForm({ name: "", icon: "", color: "", description: "" });
  };

  const handleExerciseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const exerciseData = {
      subjectId: exerciseForm.subjectId,
      question: exerciseForm.question,
      options: [exerciseForm.option1, exerciseForm.option2, exerciseForm.option3],
      correctAnswer: parseInt(exerciseForm.correctAnswer),
    };
    console.log("Novo exercício:", exerciseData);
    toast.success("Exercício cadastrado com sucesso!");
    setExerciseForm({
      subjectId: "",
      question: "",
      option1: "",
      option2: "",
      option3: "",
      correctAnswer: "0",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <Link to="/index">
          <Button variant="ghost" className="mb-8 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Administração
            </h1>
            <p className="text-lg text-muted-foreground">
              Cadastre matérias e exercícios
            </p>
          </div>

          <Tabs defaultValue="subjects" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="subjects">Matérias</TabsTrigger>
              <TabsTrigger value="exercises">Exercícios</TabsTrigger>
            </TabsList>

            <TabsContent value="subjects" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Cadastrar Nova Matéria
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubjectSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject-name">Nome da Matéria</Label>
                      <Input
                        id="subject-name"
                        placeholder="Ex: Geografia"
                        value={subjectForm.name}
                        onChange={(e) =>
                          setSubjectForm({ ...subjectForm, name: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject-icon">Ícone (lucide-react)</Label>
                      <Input
                        id="subject-icon"
                        placeholder="Ex: map"
                        value={subjectForm.icon}
                        onChange={(e) =>
                          setSubjectForm({ ...subjectForm, icon: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject-color">Cor</Label>
                      <Input
                        id="subject-color"
                        placeholder="Ex: primary, secondary, accent"
                        value={subjectForm.color}
                        onChange={(e) =>
                          setSubjectForm({ ...subjectForm, color: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject-description">Descrição</Label>
                      <Input
                        id="subject-description"
                        placeholder="Ex: Explore o mundo!"
                        value={subjectForm.description}
                        onChange={(e) =>
                          setSubjectForm({
                            ...subjectForm,
                            description: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full mt-4">
                      Cadastrar Matéria
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="exercises" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Cadastrar Novo Exercício
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleExerciseSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="exercise-subject">ID da Matéria</Label>
                      <Input
                        id="exercise-subject"
                        placeholder="Ex: matematica"
                        value={exerciseForm.subjectId}
                        onChange={(e) =>
                          setExerciseForm({
                            ...exerciseForm,
                            subjectId: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="exercise-question">Pergunta</Label>
                      <Input
                        id="exercise-question"
                        placeholder="Ex: Quanto é 5 + 5?"
                        value={exerciseForm.question}
                        onChange={(e) =>
                          setExerciseForm({
                            ...exerciseForm,
                            question: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="exercise-option1">Alternativa 1</Label>
                      <Input
                        id="exercise-option1"
                        placeholder="Ex: 8"
                        value={exerciseForm.option1}
                        onChange={(e) =>
                          setExerciseForm({
                            ...exerciseForm,
                            option1: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="exercise-option2">Alternativa 2</Label>
                      <Input
                        id="exercise-option2"
                        placeholder="Ex: 10"
                        value={exerciseForm.option2}
                        onChange={(e) =>
                          setExerciseForm({
                            ...exerciseForm,
                            option2: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="exercise-option3">Alternativa 3</Label>
                      <Input
                        id="exercise-option3"
                        placeholder="Ex: 12"
                        value={exerciseForm.option3}
                        onChange={(e) =>
                          setExerciseForm({
                            ...exerciseForm,
                            option3: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="exercise-correct">
                        Resposta Correta (0, 1 ou 2)
                      </Label>
                      <Input
                        id="exercise-correct"
                        type="number"
                        min="0"
                        max="2"
                        placeholder="Ex: 1"
                        value={exerciseForm.correctAnswer}
                        onChange={(e) =>
                          setExerciseForm({
                            ...exerciseForm,
                            correctAnswer: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full mt-4">
                      Cadastrar Exercício
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;
