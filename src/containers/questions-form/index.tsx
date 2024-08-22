import { useCallback, useMemo, useState } from "react";
import { QuestionResponse } from "./types";
import { Box, Typography } from "@mui/material";
import questionsData from "./QuestionData";
import Question from "../../components/questions-form/question";
import { makeStyles } from "@mui/styles";
import DisplayAnswers from "../../components/questions-form/DisplayAnswers";

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
  const [stack, setStack] = useState<number[]>([]);
  const currentQuestion = useMemo(()=> questionsData.find(
    (ques) => ques.questionNumber === questionNumber
  )!,[questionNumber]);
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
    [ answers, currentQuestion]
  );

  const onNextClick = useCallback(() => {
    setStack( stack =>[...stack, questionNumber]);
    if (!currentQuestion.nextStep) {
      setQuestionNumber((qn) => qn + 1);
      return;
    }
    const selectedAnswer = answers.find(
      (ans) => ans.questionNumber === currentQuestion.questionNumber
    )!;
    let nextStep: number | string;
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
      if (nextStep === "END"){
        // In case when you go back and select selection which now move to end then we need to remove all answers that are not valid anymore
        setAnswers(answers => answers.filter(ans => ans.questionNumber <= currentQuestion.questionNumber))
         setAnswersEnded(true);
      }
      // In case when you go back and select selection which now skips some steps then we need to remove those steps answers
      setAnswers(answers => answers.filter(ans => ans.questionNumber <= currentQuestion.questionNumber || ans.questionNumber >= Number(nextStep) ))
      setQuestionNumber(nextStep as number);
    }
  },[questionNumber, currentQuestion, answers]);

  const onBackClick = useCallback(()=>{
    const updatedStack = [...stack];
    setQuestionNumber(updatedStack.pop()!);
    setStack(updatedStack);
  },[stack])

  return (
    <Box className={classes.container}>
      {answersEnded ? (
        <Typography component="h1" variant="h5">
        Thank You !!!
      </Typography>
      ) : (
        <>
        <Question
          currentQuestion={currentQuestion}
          selectedAnswer={currentAnswer}
          onBackClick={onBackClick}
          onNextClick={onNextClick}
          saveAnswer={saveAnswer}
          showBack={currentQuestion.questionNumber !== 1}
        />
        </>
      )}
      <DisplayAnswers answers={answers} answersCompleted={answersEnded} />
    </Box>
  );
};

export default QuestionsForm;
