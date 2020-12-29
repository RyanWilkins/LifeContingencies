import {
  Box,


  Paper,
  Typography,
  useTheme
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { AppState } from "../../redux/ConfigureStore";
import { activateQuestion } from "../../redux/question";
import {
  QuestionType
} from "../../types";

const StyledPaper = styled(Paper)`
  height: 100%;
`;

type Props = QuestionType;

const Question: React.FC<Props> = (props) => {
  const theme = useTheme();
  const history = useHistory();
  const dispatch = useDispatch();

  const questions = useSelector(
    (state: AppState) => state.questionlist.questions
  );

  var classes = (props: Props) => {
    var myclass = questions.map((x) => x.expanded).includes(true)
      ? props.expanded
        ? "questionBox active"
        : "questionBox inactive"
      : "questionBox";

    return myclass;
  };

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const clickedQuestion = questions.filter(
      (question) => question.index === props.index
    )[0];
    dispatch(activateQuestion(clickedQuestion));
    console.log(clickedQuestion.link);
    setTimeout(
      () => history.push("/Question/" + clickedQuestion.index.toString()),
      4000
    );
  };

  return (
    <Box
      onClick={(event) => handleClick(event)}
      className={classes(props)}
      style={{ textAlign: "center" }}
    >
      <StyledPaper theme={theme} elevation={3}>
        {/* {props.index} */}
        <div className="questionTextBox">
          <div className="questionText">
            <Typography variant="h4">{props.question_text}</Typography>
          </div>
        </div>
      </StyledPaper>
    </Box>
  );
};

export default Question;
