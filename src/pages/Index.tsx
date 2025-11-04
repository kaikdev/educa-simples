import { Link } from "react-router-dom";
import { subjects } from "@/data/mockData";
import SubjectCard from "@/components/SubjectCard";
import { BookOpen, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-end gap-2 mb-8">
          <Link to="/perfil">
            <Button variant="outline" size="icon">
              <User className="w-5 h-5" />
            </Button>
          </Link>
          <Link to="/admin">
            <Button variant="outline" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-12 h-12 text-primary" />
            <h1 className="text-5xl font-bold text-foreground">
              Reforço Escolar
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Escolha uma matéria para começar a aprender!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
