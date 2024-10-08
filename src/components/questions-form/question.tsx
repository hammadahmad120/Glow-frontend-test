import {
  Box,
  Button,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  QuestionData,
  QuestionResponse,
} from "../../containers/questions-form/types";
import { isAcceptedAnswer } from "../../utils";

interface QuestionProps {
  currentQuestion: QuestionData;
  selectedAnswer?: QuestionResponse;
  onNextClick: () => void;
  onBackClick: () => void;
  saveAnswer: (value: number | string) => void;
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
}: QuestionProps) => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Typography component="h1" variant="h5">
        {currentQuestion.question}
      </Typography>
      <Box className={classes.answerSection}>
        <Typography component="h1" variant="h5">
          {currentQuestion.type === "Yes/No" && (
            <ToggleButtonGroup
              color="secondary"
              value={selectedAnswer?.answer || ""}
              exclusive
              onChange={(_, value) => saveAnswer(value)}
            >
              <ToggleButton value={"Yes"}>Yes</ToggleButton>
              <ToggleButton value={"No"}>No</ToggleButton>
            </ToggleButtonGroup>
          )}

          {currentQuestion.type === "number" && (
            <TextField
              id="outlined-number"
              label="Number"
              type="number"
              value={selectedAnswer?.answer}
              onChange={(e) =>{ 
                if(Number(e.target.value) > 0){
                  saveAnswer(e.target.value)
                }else saveAnswer("");
                }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        </Typography>
      </Box>
      <Box className={classes.buttonActions}>
        {showBack && (
          <Button variant="contained" color="primary" onClick={onBackClick}>
            Back
          </Button>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={onNextClick}
          disabled={!isAcceptedAnswer(selectedAnswer?.answer)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default Question;
