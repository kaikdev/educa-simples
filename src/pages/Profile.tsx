import { Link } from "react-router-dom";
import { useProgress } from "@/contexts/ProgressContext";
import { subjects } from "@/data/mockData";
import { ArrowLeft, User, Trophy, XCircle, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

const Profile = () => {
  const { getStats } = useProgress();
  const stats = getStats();
  const [userPoints, setUserPoints] = useState({ total: 0, totalCorrect: 0, errors: 0 })
  const [subjectPoints, setSubjectPoints] = useState([])
  const [ranking, setRanking] = useState([])
  useEffect(() => {
    const setData = async () => {
      let result = await getPoints()
      setUserPoints(result)
      let result2 = await getSubjectPoints()
      setSubjectPoints(result2)
      let result3 = await getRanking()
      setRanking(result3)
    }
    setData()
  }, [])
  async function getPoints() {
    let token = `Bearer ${localStorage.getItem("token")}`
    try {
      let result = await fetch(`http://localhost:3000/userAnswer`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }//,
        //body: JSON.stringify({ correct: correctA })
      }).then((e) => e.json())
      //console.log(result)
      return result
    } catch (e) {
      console.log(e)
      return { total: 0, totalCorrect: 0, errors: 0 }
    }
  }
  async function getRanking() {
    //let token = `Bearer ${localStorage.getItem("token")}`
    try {
      let result = await fetch(`http://localhost:3000/userAnswer/leaderBoard`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          //"Authorization": token
        }//,
        //body: JSON.stringify({ correct: correctA })
      }).then((e) => e.json())
      //console.log(result)
      console.log(result)
      return result
    } catch (e) {
      console.log(e)
      return { total: 0, totalCorrect: 0, errors: 0 }
    }
  }
  async function getSubjectPoints() {
    let token = `Bearer ${localStorage.getItem("token")}`
    try {
      let result = await fetch(`http://localhost:3000/userAnswer/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }//,
        //body: JSON.stringify({ correct: correctA })
      }).then((e) => e.json())
      //console.log(result)
      if (result.msgError) {
        throw new Error("erro")
      }
      console.log("this is the subject info")
      console.log(result)
      //result.i.
      return result
    } catch (e) {
      console.log(e)
      return { total: 0, totalCorrect: 0, errors: 0 }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <style>
        {`
          .min-h-screen.bg-background {
            background-image: url("/image/background-profile.webp");
            background-position: bottom center;
            background-size: 100%;
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

        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                    <User className="w-12 h-12" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    Meu Perfil
                  </h1>
                  <p className="text-muted-foreground">
                    Acompanhe seu progresso nos estudos!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Total de Respostas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">
                  {userPoints.total /*stats.total.correct + stats.total.incorrect*/}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2 text-success">
                  <Trophy className="w-4 h-4" />
                  Acertos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-success">
                  {userPoints.totalCorrect /*stats.total.correct*/}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2 text-destructive">
                  <XCircle className="w-4 h-4" />
                  Erros
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-destructive">
                  {userPoints.errors /*stats.total.incorrect*/}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Desempenho por Matéria</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {subjectPoints.length > 0 && subjectPoints.map((subject) => {
                const subjectStats = stats.bySubject[subject.i.id] || {
                  correct: 0,
                  incorrect: 0,
                };
                const total = subject.i.userAnswer.length //subjectStats.correct + subjectStats.incorrect;

                const totalCorrect = subject.i.userAnswer.reduce((sum, subject) => {
                  return sum + (subject.correctAnswer ? 1 : 0);
                }, 0);
                return (
                  <div key={subject.i.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">
                        {subject.nameSubject/*subject.name*/}
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        {total} {total === 1 ? "resposta" : "respostas"}
                      </span>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Trophy className="w-4 h-4 text-success" />
                        <span className="text-success font-medium">
                          {totalCorrect/*subject.i.correctAnswers*//*subjectStats.correct*/} acertos
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <XCircle className="w-4 h-4 text-destructive" />
                        <span className="text-destructive font-medium">
                          { total - totalCorrect /*subject.i.totalAnwers - subject.i.correctAnswers*//*subjectStats.incorrect*/} erros
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
          <br></br>
          <Card>
            <CardHeader>
              <CardTitle>Ranking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {ranking.length > 0 && ranking.map((rank) => {
                /*
                const subjectStats = stats.bySubject[subject.i.id] || {
                  correct: 0,
                  incorrect: 0,
                };*/
                //const total = subject.i.totalAnwers //subjectStats.correct + subjectStats.incorrect;

                return (
                  <div key={rank.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">
                        {rank.name/*subject.name*/}
                      </h3>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Trophy className="w-4 h-4 text-success" />
                        <span className="text-success font-medium">
                          {rank.points/*subjectStats.correct*/} pontos
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
