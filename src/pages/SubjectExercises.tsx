import { useParams, Link } from "react-router-dom";
import { subjects, exercises } from "@/data/mockData";
import ExerciseCard from "@/components/ExerciseCard";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { describe } from "node:test";
import { Description } from "@radix-ui/react-dialog";
const SubjectExercises = () => {
  const { subjectId } = useParams();
  const [nextE,setNextE] = useState();
  useEffect(() => {
    findSubject()
    findSubjectExercises()
  }, [])
  async function findSubject(){
    let result = await fetch(`http://localhost:3000/quest/${subjectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    }).then((e)=>e.json())
    //console.log(result)
    if(!result.msgError){
      setSubject({subjectId:result.id,description:result.description,name:result.name})
    }
  }
  async function findSubjectExercises() {
    //http://[::1]:3000/quest/3/quest
    let result = await fetch(`http://localhost:3000/quest/${subjectId}/quest`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    }).then((e)=>e.json())
    if(!result.msgError){
      let el = convertToIdsArr(result)
      setNextE(el)
      setSubjectExercises(result)
    }
    //console.log(result)
  }
  const [subject,setSubject] = useState(null)
  //const subject = subjects.find((s) => s.id === subjectId);
  const [subjectExercises,setSubjectExercises] = useState([])
  //const subjectExercises = exercises.filter((e) => e.subjectId === subjectId);

  if (!subject) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Matéria não encontrada</p>
      </div>
    );
  }
  function convertToIdsArr(subjectExercisesp){
    return subjectExercisesp.map((el)=>el.id)
  }

  return (
    <div className="min-h-screen bg-background">
      <style>
        {`
          .min-h-screen.bg-background {
            background-image: url("/src/assets/image/background-criancas.webp");
            background-position: center center;
            background-size: cover;
            background-repeat: no-repeat;
          }
        `}
      </style>

      <div className="container mx-auto px-4 py-12">
        <Link to="/index">
          <Button variant="ghost" className="mb-8 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {subject.name}
          </h1>
          <p className="text-lg text-muted-foreground">
            {subject.description}
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          
          {subjectExercises.map((exercise, index) => (
            <ExerciseCard key={exercise.id} exercise={exercise} index={index} 
            next={(subjectExercises.length-1 >= (index+1)) ? index+1 : 0}
            arr = {nextE}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectExercises;
