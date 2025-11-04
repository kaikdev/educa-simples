import { useParams, Link } from "react-router-dom";
import { subjects, exercises } from "@/data/mockData";
import ExerciseCard from "@/components/ExerciseCard";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const SubjectExercises = () => {
  const { subjectId } = useParams();
  const subject = subjects.find((s) => s.id === subjectId);
  const subjectExercises = exercises.filter((e) => e.subjectId === subjectId);

  if (!subject) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Matéria não encontrada</p>
      </div>
    );
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
            <ExerciseCard key={exercise.id} exercise={exercise} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectExercises;
