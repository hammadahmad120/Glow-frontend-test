import { useState } from "react";
import { QuestionResponse } from "./types";
import { Box, makeStyles } from "@material-ui/core";
import questionsData from "./QuestionData";

const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: theme.spacing(10)
    }
  }));
const QuestionsForm = () =>{
    const classes = useStyles();
    const [questionNumber, setQuestionNumber] = useState(1);
    const [responses, setResponses] = useState<QuestionResponse[]>([]);
    const currentQuestion = questionsData.find(ques => ques.questionNumber === questionNumber)!;

    return(
      <Box className={classes.container}>
        Hello World
        </Box>
    )
}

export default QuestionsForm;