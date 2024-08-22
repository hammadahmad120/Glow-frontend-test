import {
    Box,
    Typography,
  } from "@mui/material";
  import { makeStyles } from "@mui/styles";
  import {
    QuestionResponse,
  } from "../../containers/questions-form/types";
  
  interface DisplayAnswersProps {
    answers: QuestionResponse[];
    answersCompleted: boolean;
  }
  
  const useStyles = makeStyles({
    container: {
    margin: "40px"
    }
  });
  const DisplayAnswers = ({
    answers,
    answersCompleted
  }: DisplayAnswersProps) => {
    const classes = useStyles();
    return (
      <Box className={classes.container}>
        {answers?.length > 0 &&(
            <Typography component="h4" variant="h6">
            {answersCompleted ? 'Your Answers' : 'History'}
          </Typography>
        )}
        {answers.map(ans => {
            return(
                <Box key={ans.questionNumber}> {ans.question} : <b>{ans.answer}</b></Box>
            )
        })}
        </Box>
    );
  };
  
  export default DisplayAnswers;
  