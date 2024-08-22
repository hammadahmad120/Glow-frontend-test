import { QuestionData } from "./types";

const questionsData:QuestionData[] = [
    {
      questionNumber: 1,
      question: "Does your business operate in CA?",
      type: "Yes/No",
      nextStep: {
        "Yes": 2,
        "No": "END",
      },
    },
    {
        questionNumber: 2,
      question: "How many employees do you have?",
      type: "number",
      nextStep: {
      condition: "answer > 100",
      Yes: "END",
      No: 3,
      }
    },
    {
        questionNumber: 3,
      question: "Do you serve food?",
      type: "Yes/No",
      nextStep: {
        "Yes": 4,
        "No": 6,
      },
    },
    {
        questionNumber: 4,
      question: "Do you serve hot food?",
      type: "Yes/No",
    },
    {
        questionNumber: 5,
      question: "Are you open past midnight?",
      type: "Yes/No",
    },
    {
        questionNumber: 6,
      question: "Do you host live music?",
      type: "Yes/No",
      nextStep:{
        "Yes": "END",
        "No": "END"
      },
    },
  ];

  export default questionsData;