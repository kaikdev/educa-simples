import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Subject } from "@/types";
import * as LucideIcons from "lucide-react";
import { DeleteIcon } from "lucide-react";
import { relative } from "path";
import { toast } from "sonner";
interface SubjectCardProps {
  subject: Subject;
}

const SubjectCard = ({ subject }: SubjectCardProps) => {
  let nav = useNavigate()
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
    red: "bg-primary hover:bg-primary/90 shadow-primary/20",
    yellow: "bg-secondary hover:bg-secondary/90 shadow-secondary/20",
    purple: "bg-accent hover:bg-accent/90 shadow-accent/20"
  };
  async function deleteSubject(id) {
    console.log("deleting id" + id)
    let result: any = ""
    try {
      //const { icon, ...payload } = subjectForm //{ email: email, password: password }
      //const payload = subjectForm

      let token = `Bearer ${localStorage.getItem("token")}`
      //console.log()
      result = await fetch(`http://localhost:3000/quest/Subject/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
        //body: JSON.stringify(payload)
      }).then((e) => e.json())
      //console.log(result)
      if (result.msgError || result.error) {
        throw new Error("erro ao deletar materia");
      }
      //toast.success("Matéria cadastrada com sucesso!");
      //setSubjectForm({ name: "", icon: "", color: "", description: "" });
      //await findSubjects()
      window.location.reload();
    } catch (e) {
      console.log(e)
      toast.error("erro ao deletar matéria")
      if (result.statusCode == 401 || result.statusCode == 403) {
        nav("/")
        localStorage.setItem("token", null)
        localStorage.setItem("role", null)
      }
    }
  }
  return (
    <Link to={(localStorage.getItem("role") == "user") ? `/materia/${subject.id}` : ""}>
      <Card className="overflow-hidden transition-all hover:scale-105 hover:shadow-xl border-0">
        <CardContent className="p-0">
          <div style={{ position: "relative" }}
            className={`${colorClasses[subject.color as keyof typeof colorClasses]} p-8 text-center transition-colors shadow-lg`}
          >
            {localStorage.getItem("role") == "admin" && <DeleteIcon style={{
              position: "absolute", top: "0px", right: "0px",
              height: "5vh", aspectRatio: "1/1", margin: "5px"
            }} className="text-white"
              onClick={(e) => deleteSubject(subject.id)}></DeleteIcon>}
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
