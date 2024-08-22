import { useCallback, useMemo, useState } from "react";
import { QuestionResponse } from "./types";
import { Box, Divider } from "@mui/material";
import questionsData from "./QuestionData";
import Question from "../../components/questions-form/question";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "80px",
  },
});
const QuestionsForm = () => {
  const classes = useStyles();
  const [questionNumber, setQuestionNumber] = useState(1);
  const [answersEnded, setAnswersEnded] = useState(false);
  const [answers, setAnswers] = useState<QuestionResponse[]>([]);
  const currentQuestion = questionsData.find(
    (ques) => ques.questionNumber === questionNumber
  )!;
  const currentAnswer = useMemo(
    () => answers.find((ques) => ques.questionNumber === questionNumber)!,
    [questionNumber, answers]
  );

  const saveAnswer = useCallback(
    (value: string | number) => {
      const updatedAnswers = answers.filter(
        (ans) => ans.questionNumber !== currentQuestion.questionNumber
      );
      updatedAnswers.push({
        questionNumber: currentQuestion.questionNumber,
        question: currentQuestion.question,
        answer: value,
      });
      updatedAnswers.sort(function (a, b) {
        return a.questionNumber - b.questionNumber;
      });
      setAnswers(updatedAnswers);
    },
    [questionNumber, answers]
  );

  const onNextClick = () => {
    if (!currentQuestion.nextStep) {
      setQuestionNumber((qn) => qn + 1);
      return;
    }
    const selectedAnswer = answers.find(
      (ans) => ans.questionNumber === currentQuestion.questionNumber
    )!;
    let nextStep = null;
    if (currentQuestion.nextStep?.condition) {
      const conditionFn = new Function(
        "answer",
        `return ${currentQuestion.nextStep.condition};`
      );
      const result = conditionFn(selectedAnswer.answer);
      nextStep = result
        ? currentQuestion.nextStep["Yes"]
        : currentQuestion.nextStep["No"];
    } else {
      nextStep = currentQuestion.nextStep[selectedAnswer.answer];
    }
    if (nextStep) {
      if (nextStep === "END") setAnswersEnded(true);
      setQuestionNumber(+nextStep);
    }
  };

  return (
    <Box className={classes.container}>
      {answersEnded ? (
        <div> Thank You</div>
      ) : (
        <Question
          currentQuestion={currentQuestion}
          selectedAnswer={currentAnswer}
          onBackClick={() => {}}
          onNextClick={onNextClick}
          saveAnswer={saveAnswer}
          showBack={currentQuestion.questionNumber !== 1}
        />
      )}
    </Box>
  );
};

export default QuestionsForm;
