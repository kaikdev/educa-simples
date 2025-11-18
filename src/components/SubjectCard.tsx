import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Subject } from "@/types";
import * as LucideIcons from "lucide-react";

interface SubjectCardProps {
  subject: Subject;
}

const SubjectCard = ({ subject }: SubjectCardProps) => {
  const Icon = (LucideIcons as any)[
    subject.icon.split("-").map((word, i) => 
      i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join("")
  ] || LucideIcons.Book;

  const colorClasses = {
    primary: "bg-primary hover:bg-primary/90 shadow-primary/20",
    secondary: "bg-secondary hover:bg-secondary/90 shadow-secondary/20",
    accent: "bg-accent hover:bg-accent/90 shadow-accent/20",
    warning: "bg-warning hover:bg-warning/90 shadow-warning/20",
    red:"bg-primary hover:bg-primary/90 shadow-primary/20",
    yellow:"bg-secondary hover:bg-secondary/90 shadow-secondary/20",
    purple:"bg-accent hover:bg-accent/90 shadow-accent/20"
  };

  return (
    <Link to={`/materia/${subject.id}`}>
      <Card className="overflow-hidden transition-all hover:scale-105 hover:shadow-xl border-0">
        <CardContent className="p-0">
          <div
            className={`${colorClasses[subject.color as keyof typeof colorClasses]} p-8 text-center transition-colors shadow-lg`}
          >
            <Icon className="w-16 h-16 mx-auto mb-4 text-white" />
            <h3 className="text-2xl font-bold text-white mb-2">{subject.name}</h3>
            <p className="text-white/90 text-sm">{subject.description}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default SubjectCard;
