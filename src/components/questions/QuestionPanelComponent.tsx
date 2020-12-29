import { Box, useTheme } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AppState } from "../../redux/ConfigureStore";
import { deactivateQuestion } from "../../redux/question";
import '../../styles/question.scss';
import Question from './QuestionComponent';


export interface QuestionPanelProps {
  };


const StyledBox = styled(Box)`
`

export const QuestionPanel = (props: QuestionPanelProps) => {
    console.log(props)
    const theme = useTheme()
    const dispatch = useDispatch()
    const questions = useSelector((state: AppState) => state.questionlist.questions)

    useEffect(() => {
        dispatch(deactivateQuestion([]));
      }, []);

    return(
        <StyledBox height="100%" theme={theme}>
            {questions.map((question) => (
                <Question {...question} key={question.index}/>
            ))}
        </StyledBox>
    )

}