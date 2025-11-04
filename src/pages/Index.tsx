import { Link } from "react-router-dom";
import { subjects } from "@/data/mockData";
import SubjectCard from "@/components/SubjectCard";
import { BookOpen, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImg from '../assets/image/logo-educa-simples-brown.png'; 

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-end gap-2 mb-8">
          <Link to="/perfil">
            <Button variant="outline" size="icon" className="btn-index">
              <User className="w-5 h-5" />
            </Button>
          </Link>
          <Link to="/admin">
            <Button variant="outline" size="icon" className="btn-index">
              <Settings className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-3">
            <img src={logoImg} alt="Logo Agilidade na Saúde" width="250" height="auto" />
          </div>
          
          <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1rem", color: "#693e30",}}>
            Olá, Seja bem vindo(a)!
          </h1>

          <p className="text-xl text-muted-foreground" style={{color: "#693e30"}}>
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
