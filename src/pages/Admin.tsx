import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Select } from "@/components/ui/selectTest1";
import Swal from 'sweetalert2';
import { error } from "console";
const Admin = () => {
  useEffect(()=>{
    findSubjects()
  },[])
  const nav = useNavigate()
  const [errors, setErrors]: any = useState({});
  const [subjectArr,setSubjectArr] = useState([])
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

  const handleSubjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleFormSubmit("m")) {
      return;
    }
    console.log("Nova matéria:", subjectForm);
    let result:any=""
    try {
      //const { icon, ...payload } = subjectForm //{ email: email, password: password }
      const payload = subjectForm

      let token = `Bearer ${localStorage.getItem("token")}`
      console.log()
      result = await fetch("http://localhost:3000/quest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify(payload)
      }).then((e) => e.json())
      console.log(result)
      if (result.msgError || result.error) {
        throw new Error("erro ao cadastrar matéria");
      }
      toast.success("Matéria cadastrada com sucesso!");
      setSubjectForm({ name: "", icon: "", color: "", description: "" });
      //close()
      //navigate('/index');
      //setLoading(false);
      //setEmail('');
      //setPassword('');
      await findSubjects()
    } catch (e) {
      console.log(e)
      toast.error("erro ao cadastrar matéria")
      if (result.statusCode == 401 || result.statusCode == 403) {
        nav("/")
        localStorage.setItem("token",null)
      }
    }
    //toast.success("Matéria cadastrada com sucesso!");
    //setSubjectForm({ name: "", icon: "", color: "", description: "" });
  };

  const handleExerciseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleFormSubmit("e")) {
      return;
    }
    let fields = ["option1", "option2", "option3"]
    let answersArray = fields.map((el, i) => {
      return {
        description: exerciseForm[el],
        correct: (parseInt(exerciseForm["correctAnswer"]) == i) ? true : false
      }
    })
    let payload = {
      question: exerciseForm["question"],
      subjectId: exerciseForm["subjectId"],
      answers: answersArray
    }
    console.log(payload)
    let result:any = ""
    try {
      let token = `Bearer ${localStorage.getItem("token")}`
      //console.log()
      result = await fetch("http://localhost:3000/quest/question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify(payload)
      }).then((e) => e.json())
      console.log(result)
      if (result.msgError || result.statusCode == 403) {
        throw new Error("error ao cadastrar");
      }
      toast.success("Questão cadastrada com sucesso!");
    } catch (e) {
      console.log(e)
      toast.error("erro ao cadastrar questão")
      if (result.statusCode == 401 || result.statusCode == 403) {
        nav("/")
        localStorage.setItem("token",null)
      }
    }
    /*
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
    */
  };
  const colorClasses = {
    primary: "primary",
    secondary: "secondary",
    accent: "accent",
    warning: "warning",
    red: "red",
    yellow: "yellow",
    purple: "purple"
  };
  const icons = {
    Book: "Book",
    Library: "Library",
    FileText: "FileText",
    PenLine: "PenLine",
    Sigma: "Sigma",
    Calculator: "Calculator",
    CircleDot: "CircleDot",
    FunctionSquare: "FunctionSquare",
    SquareFunction: "SquareFunction",
    FlaskRound: "FlaskRound",
    Atom: "Atom",
    Globe: "Globe",
    Map: "Map",
    Laptop: "Laptop",
    Code2: "Code2",
    Palette: "Palette",
    Brush: "Brush"
  }
  /*const handleFormSubmit = async (e, cadType) => {
    e.preventDefault();*/
  function checkSubjectName(name){
    console.log("here")
    let repeat=false
    subjectArr.forEach((el)=>{
      if(el.name.trim() == name.trim()){
        console.log("is equal")
        repeat = true
        return;
      }
    })
    return repeat
  }
  function handleFormSubmit(cadType) {

    let validationErrors: any = {};

    if (cadType == "m") {
      if (!subjectForm.name.trim()) validationErrors.nome = "Digite o nome da matéria"
      if(subjectForm.name.trim() && checkSubjectName(subjectForm.name)) validationErrors.nome = "matéria já cadastrada"
      if (!subjectForm.icon.trim()) validationErrors.icon = "Selecione um icone"
      if (!subjectForm.color.trim()) validationErrors.color = "Selecione uma cor"
      if (!subjectForm.description.trim()) validationErrors.description = "Digite a descrição"
    }
    if (cadType == "e") {
      if (!exerciseForm.subjectId.trim()) validationErrors.subjectId = "Selecione a matéria"
      if (!exerciseForm.question.trim()) validationErrors.question = "Digite o enunciado"
      if (!exerciseForm.option1.trim()) validationErrors.option1 = "Digite a descrição"
      if (!exerciseForm.option2.trim()) validationErrors.option2 = "Digite a descrição"
      if (!exerciseForm.option3.trim()) validationErrors.option3 = "Digite a descrição"
      if (!exerciseForm.correctAnswer.trim()) validationErrors.correctAnswer = "Selecione a resposta correta"
    }

    console.log(validationErrors)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      console.log(validationErrors)
      Swal.fire({
        icon: 'error',
        title: 'Campos inválidos',
        text: 'Verifique os campos destacados.'
      });
      return false;
    }

    setErrors({}); // limpar erros
    return true
  }
  // Simulação de envio
  /*
  const payload = {
    name: cadastroNome,
    email: cadastroEmail,
    password: cadastroSenha,
    roles: [{ name: selectedRole }],
    //imagem: imageFile ? imageFile.name : null,

    // Apenas se for usuário
    ...(selectedRole === 'user' && {
      userAluno: {
        //dataNascimento: cadastroData,
        age: getAge()//cadastroData
      }
    }),

    // Apenas se for médico/admin
    ...(selectedRole === 'admin' && {
      userAdmin: {
        cpf: cadastroCpf,
        especialidade: specialty,
        apresentacao: presentation
      }
    })
  };*/
  async function findSubjects() {
    let result = await fetch("http://localhost:3000/quest", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"//,
        //"Authorization": token
      }//,
      //body: JSON.stringify(payload)
    }).then((e) => e.json())
    console.log(result)
    result = result.map((el) => {
      //el["icon"] = "calculator"
      return el
    })
    console.log(result)
    setSubjectArr(result)
  }

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
                      {errors.nome && <p>{errors.nome}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject-icon">Ícone (lucide-react)</Label>
                      <Select
                        id="subject-icon"
                        value={subjectForm.icon}
                        onChange={(e) => setSubjectForm({ ...subjectForm, icon: e.target.value })}
                        required
                      >
                        <option value="">Selecione...</option>

                        {Object.keys(icons).map((iconsKey) => (
                          <option key={iconsKey} value={iconsKey}>
                            {iconsKey}
                          </option>
                        ))}
                      </Select>
                      {errors.icon && <p>{errors.icon}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject-color">Cor</Label>

                      <Select
                        id="subject-color"
                        value={subjectForm.color}
                        onChange={(e) => setSubjectForm({ ...subjectForm, color: e.target.value })}
                        required
                      >
                        <option value="">Selecione...</option>

                        {Object.keys(colorClasses).map((colorKey) => (
                          <option key={colorKey} value={colorKey}>
                            {colorKey}
                          </option>
                        ))}
                      </Select>
                      {errors.color && <p>{errors.color}</p>}
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
                      {errors.description && <p>{errors.description}</p>}
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
                      <Select
                        id="exercise-subject"
                        value={exerciseForm.subjectId}
                        onChange={(e) =>
                          setExerciseForm({
                            ...exerciseForm,
                            subjectId: e.target.value,
                          })
                        }
                        required
                      >
                        <option value="">Selecione...</option>

                        {subjectArr.map((subject:any) => (
                          <option key={`subject${subject.id}`} value={subject.id}>
                            {subject.name}
                          </option>
                        ))}
                      </Select>
                      {errors.subjectId && <p>{errors.subjectId}</p>}
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
                      {errors.question && <p>{errors.question}</p>}
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
                      {errors.option1 && <p>{errors.option1}</p>}
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
                      {errors.option2 && <p>{errors.option2}</p>}
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
                      {errors.option3 && <p>{errors.option3}</p>}
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
                      {errors.correctAnswer && <p>{errors.correctAnswer}</p>}
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


/*
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


*/
