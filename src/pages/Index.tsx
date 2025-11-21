import { Link } from "react-router-dom";
import { subjects } from "@/data/mockData";
import SubjectCard from "@/components/SubjectCard";
import { BookOpen, User, Settings, LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImg from '../assets/image/logo-educa-simples-brown.png';

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Index = () => {
  const nav = useNavigate();
  const [role, setRole] = useState("");
  const [SubjectsArr, setSubjectsArr] = useState([]);

  useEffect(() => {
    const rol = localStorage.getItem("role");
    setRole(rol);
    findSubjects();
  }, []);

  async function findSubjects() {
    let result = await fetch("http://localhost:3000/quest", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }).then((e) => e.json());

    setSubjectsArr(result);
  }

  function LogOut() {
    localStorage.setItem("token", null);
    localStorage.setItem("role", null);
    nav("/");
  }

  return (
    <div className="min-h-screen bg-background">
      <style>
        {`
          .min-h-screen.bg-background {
            background-image: url("/src/assets/image/background-animais.webp");
            background-position: bottom center;
            background-size: 100%;
            background-repeat: no-repeat;
          }
        `}
      </style>

      <div className="container mx-auto px-4 py-12">

        {/* BOTÕES SUPERIORES */}
        <div className="flex justify-end gap-2 mb-8">
          {role === "user" && (
            <Link to="/perfil">
              <Button variant="outline" size="icon" className="btn-index">
                <User className="w-5 h-5" />
              </Button>
            </Link>
          )}

          {role === "admin" && (
            <Link to="/admin">
              <Button variant="outline" size="icon" className="btn-index">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
          )}

          <Button
            variant="outline"
            size="icon"
            className="btn-index"
            onClick={LogOut}
          >
            <LogOutIcon className="w-5 h-5" />
          </Button>
        </div>

        {/* MENSAGEM DIFERENTE POR ROLE */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-3">
            <img
              src={logoImg}
              alt="Logo Educa Simples"
              width="250"
              height="auto"
            />
          </div>

          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              marginBottom: "1rem",
              color: "#693e30",
            }}
          >
            {role === "admin"
              ? "Bem-vindo(a), Administrador!"
              : "Olá, Seja bem vindo(a)!"}
          </h1>

          <p
            className="text-xl text-muted-foreground"
            style={{ color: "#693e30" }}
          >
            {role === "admin"
              ? "Gerencie matérias, questões e o conteúdo da plataforma."
              : "Escolha uma matéria para começar a aprender!"}
          </p>
        </div>

        {/* CARDS DIFERENTES POR ROLE */}
        <div className="area-cards">
          {/* Se for ADMIN, mostra cards especiais de administração */}
          {role === "admin" && (
            <>
              <Link to="/ranking" className="card-admin transition-all hover:scale-105 hover:shadow-xl">
                <SubjectCard
                  subject={{
                    id: "ranking",
                    name: "Ranking",
                    description: "Acompanhe o desempenho semanal dos usuários na plataforma.",
                    icon: "trophy",
                  }}
                />
              </Link>

              <Link to="/admin" className="card-admin transition-all hover:scale-105 hover:shadow-xl">
                <SubjectCard
                  subject={{
                    id: "admin-1",
                    name: "Área de Criar",
                    description: "Crie as suas matérias e exercícios.",
                    icon: "book-open",
                  }}
                />
              </Link>

              <Link to="/admin/edit" className="card-admin transition-all hover:scale-105 hover:shadow-xl">
                <SubjectCard
                  subject={{
                    id: "admin-2",
                    name: "Área de Editar",
                    description: "Edite as suas matérias e exercícios.",
                    icon: "settings",
                  }}
                />
              </Link>
            </>
          )}

          {/* Se for USER, mostra as matérias retornadas da API */}
          {role === "user" &&
            SubjectsArr.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Index;