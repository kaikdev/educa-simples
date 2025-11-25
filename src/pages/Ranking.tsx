import { Link } from "react-router-dom";
import { useProgress } from "@/contexts/ProgressContext";
import { subjects } from "@/data/mockData";
import { ArrowLeft, User, Trophy, XCircle, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

const Ranking = () => {
  const { getStats } = useProgress();
  const stats = getStats();
  const [userPoints, setUserPoints] = useState({ total: 0, totalCorrect: 0, errors: 0 })
  const [subjectPoints, setSubjectPoints] = useState([])
  const [ranking,setRanking]=useState([])
  useEffect(() => {
    const setData = async () => {
      //let result = await getPoints()
      //setUserPoints(result)
      //let result2 = await getSubjectPoints()
      //setSubjectPoints(result2)
      let result3 = await getRanking()
      setRanking(result3)
    }
    setData()
  }, [])
  /*
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
  }*/
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
  /*
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
      if(result.msgError){
        throw new Error("erro")
      }
      return result
    } catch (e) {
      console.log(e)
      return { total: 0, totalCorrect: 0, errors: 0 }
    }
  }*/

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

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Ranking
          </h1>
          <p className="text-lg text-muted-foreground">
            Acompanhe a sua posição
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
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

export default Ranking;
