export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface Exercise {
  id: string;
  subjectId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  completed?: boolean;
}
