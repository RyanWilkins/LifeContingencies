import {
  Button,
  Grid,
  Paper,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { lifeGraph } from "../../exhibits/exgraphjs";
import { AppState } from "../../redux/ConfigureStore";
import { fetchLifeTable } from "../../redux/lifetables";
import "../../styles/howmanyyears.scss";
import { LifeTable, LifeTableElement, QuestionType } from "../../types";
import { DeathYearResults } from "../questions/DeathYearComponent";
import { InputPanel } from "../questions/InputPanelComponent";

interface OwnProps {
  question: QuestionType;
  // userInput: UserInputs;
  // updateUserInputs: (input: UserInputs) => void;
}

export type HowManyYearsProps = OwnProps;

export const HowManyYears: React.FC<HowManyYearsProps> = (props) => {
  const theme = useTheme();
  const breakUp = useMediaQuery(theme.breakpoints.up("md"));
  const userInput = useSelector((state: AppState) => state.userInput);
  const current_table = useSelector(
    (state: AppState) => state.lifetables.current_table
  );
  const loaded_tables = useSelector(
    (state: AppState) => state.lifetables.loaded_tables
  );
  const dispatch = useDispatch();
  const table_data = useSelector((state: AppState) => {
    const selected: LifeTable = state.lifetables.tables.filter(
      (table: LifeTable) => table.table_name === current_table
    )[0];
    if (selected) {
      return selected.elements;
    } else {
      return [];
    }
  });

  const age_data = table_data.filter(
    (x: LifeTableElement) => x.age === userInput.age
  )[0];
  const average_age = table_data.filter(
    (x) => x.age >= Math.floor(age_data.age + age_data.ex)
  )[0];
  const final_age = table_data[table_data.length - 1];

  // const debounceRenderGraph = (input: UserInput, table: LifeTable, current: string) => debounce(lifeGraph(input,table,current), 1000)

  useEffect(() => {
    dispatch(
      fetchLifeTable({ input: userInput, loaded_tables: loaded_tables })
    );
    // lifeGraph(userInput.age, table_data, current_table)
  }, [dispatch, loaded_tables, userInput]);

  useEffect(() => {
    const handleResize = () => {
      lifeGraph(
        userInput.age,
        table_data,
        current_table,
        average_age,
        final_age,
        theme,
        true
      );
    };
    window.addEventListener("resize", handleResize);
  });

  useEffect(() => {
    if (table_data.length !== 0) {
      // console.log(table_data)
      lifeGraph(
        userInput.age,
        table_data,
        current_table,
        average_age,
        final_age,
        theme
      );
      // console.log("resizing");
    }
  }, [userInput, table_data, current_table, average_age, final_age, theme]);

  return (
    <>
      <Grid item xs={12} md={4} className="inputGridItem">
        <Paper style={{ height: "100%", width: "100%" }} elevation={10}>
          <InputPanel />
        </Paper>
      </Grid>
      <Grid item xs={12} md={8} className="chartGridItem">
        <Paper style={{ height:"100%", width: "100%" }} elevation={10}>
          <div
            id="ex-graph-container"
            style={{ height:"100%", width: "100%" }}
          >
            <svg id="ex-graph" style={{ overflow: "visible", width: "100%" }} />
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} className="resultsGridItem">
        <Paper style={{ height: "100%", width: "100%" }} elevation={10}>
          <DeathYearResults
            userInput={userInput}
            ex={age_data ? age_data.ex : 0}
          />
        </Paper>
      </Grid>
      <Grid
        item
        xs={12}
        className="nextPageButton"
        style={{ display: breakUp ? "none" : "", textAlign: "center" }}
      >
        <Button
          href="/Question/2"
          style={{
            backgroundColor: theme.palette.secondary.main,
            display: breakUp ? "none" : "",
          }}
        >
          What If I Live Longer Than Average? <ArrowForward />
        </Button>
      </Grid>
      <Button
        href="/Question/2"
        style={{
          position: "fixed",
          backgroundColor: theme.palette.secondary.main,
          bottom: 15,
          right: 15,
          display: breakUp ? "" : "none",
        }}
      >
        What If I Live Longer Than Average? <ArrowForward />
      </Button>
    </>
  );
};
