import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";
import { Exercise } from "@/types";

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
}

const ExerciseCard = ({ exercise, index }: ExerciseCardProps) => {
  return (
    <Link to={`/exercicio/${exercise.id}`}>
      <Card className="transition-all hover:scale-105 hover:shadow-lg border-2">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="flex-shrink-0">
            {exercise.completed ? (
              <CheckCircle2 className="w-8 h-8 text-success" />
            ) : (
              <Circle className="w-8 h-8 text-muted-foreground" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Exercício {index + 1}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {exercise.question}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ExerciseCard;
