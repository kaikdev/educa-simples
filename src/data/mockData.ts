import { Subject, Exercise } from "@/types";

export const subjects: Subject[] = [
  {
    id: "matematica",
    name: "Matemática",
    icon: "calculator",
    color: "primary",
    description: "Adição, subtração e muito mais!",
  },
  {
    id: "portugues",
    name: "Português",
    icon: "book-open",
    color: "secondary",
    description: "Leitura e escrita divertida!",
  },
  {
    id: "historia",
    name: "História",
    icon: "scroll",
    color: "accent",
    description: "Viaje no tempo!",
  },
];

export const exercises: Exercise[] = [
  // Matemática
  {
    id: "mat-1",
    subjectId: "matematica",
    question: "Quanto é 5 + 3?",
    options: ["7", "8", "9"],
    correctAnswer: 1,
  },
  {
    id: "mat-2",
    subjectId: "matematica",
    question: "Quanto é 10 - 4?",
    options: ["5", "6", "7"],
    correctAnswer: 1,
  },
  {
    id: "mat-3",
    subjectId: "matematica",
    question: "Quanto é 2 × 4?",
    options: ["6", "8", "10"],
    correctAnswer: 1,
  },
  // Português
  {
    id: "port-1",
    subjectId: "portugues",
    question: "Qual palavra está escrita corretamente?",
    options: ["Kaza", "Casa", "Caza"],
    correctAnswer: 1,
  },
  {
    id: "port-2",
    subjectId: "portugues",
    question: "Quantas vogais tem a palavra ESCOLA?",
    options: ["2", "3", "4"],
    correctAnswer: 1,
  },
  {
    id: "port-3",
    subjectId: "portugues",
    question: "Qual é o plural de FLOR?",
    options: ["Flores", "Flors", "Florês"],
    correctAnswer: 0,
  },
  // História
  {
    id: "hist-1",
    subjectId: "historia",
    question: "Quem descobriu o Brasil?",
    options: ["Pedro Álvares Cabral", "Cristóvão Colombo", "Dom Pedro I"],
    correctAnswer: 0,
  },
  {
    id: "hist-2",
    subjectId: "historia",
    question: "Em que ano o Brasil foi descoberto?",
    options: ["1492", "1500", "1822"],
    correctAnswer: 1,
  },
  {
    id: "hist-3",
    subjectId: "historia",
    question: "Qual foi o primeiro presidente do Brasil?",
    options: ["Getúlio Vargas", "Juscelino Kubitschek", "Deodoro da Fonseca"],
    correctAnswer: 2,
  },
];
