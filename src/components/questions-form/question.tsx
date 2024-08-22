import { Box, Button, Typography, ToggleButton, ToggleButtonGroup} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  QuestionData,
  QuestionResponse,
} from "../../containers/questions-form/types";


interface QuestionProps {
  currentQuestion: QuestionData;
  selectedAnswer?: QuestionResponse;
  onNextClick: () => void;
  onBackClick: () => void;
  saveAnswer: (value: boolean | number | string) => void;
  showNext: boolean;
  showBack: boolean;
}

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  answerSection: {
    marginTop: "48px",
    display: "flex",
    justifyContent: "center",
  },
  buttonActions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "96px",
  },
});
const Question = ({
  currentQuestion,
  selectedAnswer,
  onNextClick,
  onBackClick,
  saveAnswer,
  showBack,
  showNext,
}: QuestionProps) => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Typography component="h1" variant="h5">
        {currentQuestion.question}
      </Typography>
      <Box className={classes.answerSection}>
        <Typography component="h1" variant="h5">
          {currentQuestion.type === "boolean" ? (
            <ToggleButtonGroup
              color="secondary"
              value={true}
              exclusive
              onChange={(_, value) => saveAnswer(value)}
            >
              <ToggleButton value={true}>Yes</ToggleButton>
              <ToggleButton value={false}>No</ToggleButton>
            </ToggleButtonGroup>
          ) : (
            <input type="number" onBlur={(e) => saveAnswer(e.target.value)} />
          )}
        </Typography>
      </Box>
      <Box className={classes.buttonActions}>
        <Button variant="contained" color="primary">
          Back
        </Button>

        <Button variant="contained" color="primary" disabled={ selectedAnswer && selectedAnswer.response !== null ? false: true}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default Question;
