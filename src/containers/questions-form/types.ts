export interface QuestionResponse {
    questionNumber: number;
    question: string;
    response: boolean | number | string;
}

export interface QuestionData {
    questionNumber: number;
      question: string;
      type: string;
      nextStep?: {
        [key: string] : number | string; 
      },
}