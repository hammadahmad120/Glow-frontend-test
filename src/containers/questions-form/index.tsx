import { useState } from "react";
import { QuestionResponse } from "./types";
import { Box } from "@mui/material";
import questionsData from "./QuestionData";
import Question from "../../components/questions-form/question";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "80px"
    }
  });
const QuestionsForm = () =>{
    const classes = useStyles();
    const [questionNumber, setQuestionNumber] = useState(1);
    const [responses, setResponses] = useState<QuestionResponse[]>([]);
    const currentQuestion = questionsData.find(ques => ques.questionNumber === questionNumber)!;

    return(
      <Box className={classes.container}>
        <Question currentQuestion = {currentQuestion} onBackClick={()=>{}} onNextClick={()=>{}} saveAnswer={(val) =>{}} showBack showNext />
        </Box>
    )
}

export default QuestionsForm;