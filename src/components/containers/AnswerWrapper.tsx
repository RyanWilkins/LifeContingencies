import { Grid, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { AppState } from "../../redux/ConfigureStore";
import "../../styles/answers.scss";
import { QuestionType } from "../../types";
import { ChancesOfLiving } from "./ChancesOfLivingComponent";
import { DeathGrid } from "./DeathGridComponent";
import { HowManyYears } from "./HowManyYearsComponent";
import {subtitles} from "../../shared/subtitles"

interface OwnProps {
  // questions: QuestionType[];
  // TODO: This is janky... couldn't figure out Route typing
  selected: any;
}

type AnswerWrapperProps = OwnProps;

const StyledAnswersWrapper = styled.div`
  padding: 10px;
`;

const AnswerWrapper: React.FC<AnswerWrapperProps> = (props) => {
  const theme = useTheme();
  const questions = useSelector(
    (state: AppState) => state.questionlist.questions
  );

  // const myUserInput: UserInputs = {
  //   age: 25,
  //   ethnicity: "White",
  //   country: "US",
  //   gender: "male",
  //   smoking: "all"
  // }

  useEffect(() => {
    // console.log("fire in the hole");
    // dispatch(fetchLifeTable({input: userInput, loaded_tables: loaded_tables}))
  }, []);

  const questionToPass: QuestionType = questions.filter(
    (x) => x.index === parseInt(props.selected.questionIndex)
  )[0];

  // const renderQuestion: React.FC<HowManyYearsProps> = () => {
  //   return <HowManyYears question={questionToPass}
  //   />;
  // };

  return (
    <StyledAnswersWrapper theme={theme}>
      <Grid container className="mainGrid" spacing={2}>
        <Grid
          container
          // xs={12}
          style={{ textAlign: "center", display: "flex", alignItems: "center" }}
          className="questionHeader"
        >
          <Grid item xs={12}>
            <Typography variant="h3" style={{ width: "100%" }}>
              <div className="questionTitle">
                {questionToPass.question_text}
              </div>
            </Typography>
          </Grid>
          {questionToPass.question_subtitle ? (
            <Grid item xs={12}>
              <Typography variant="subtitle1" style={{ marginLeft:"10px", display:"block" }}>
                <div className="questionTitle">
                  {subtitles[questionToPass.index]}
                </div>
              </Typography>{" "}
            </Grid>
          ) : (
            ""
          )}
        </Grid>

        <Switch>
          <Route
            path="/Question/1"
            render={() => <HowManyYears question={questionToPass} />}
          />
          <Route path="/Question/2" render={() => <ChancesOfLiving />} />
          <Route path="/Question/3" render={() => <DeathGrid />} />
        </Switch>
      </Grid>
    </StyledAnswersWrapper>
  );
};

export default AnswerWrapper;
