import { QuestionData } from "./types";

const questionsData:QuestionData[] = [
    {
      questionNumber: 1,
      question: "Does your business operate in CA?",
      type: "boolean",
      nextStep: {
        true: 2,
        false: "END",
      },
    },
    {
        questionNumber: 2,
      question: "How many employees do you have?",
      type: "number",
      nextStep: {
      condition: "answer > 100",
      true: "END",
      false: 3,
      }
    },
    {
        questionNumber: 3,
      question: "Do you serve food?",
      type: "boolean",
      nextStep: {
        true: 4,
        false: 6,
      },
    },
    {
        questionNumber: 4,
      question: "Do you serve hot food?",
      type: "boolean",
    },
    {
        questionNumber: 5,
      question: "Are you open past midnight?",
      type: "boolean",
    },
    {
        questionNumber: 6,
      question: "Do you host live music?",
      type: "boolean",
      nextStep:{
        true: "END",
        false: "END"
      },
    },
  ];

  export default questionsData;