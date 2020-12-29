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
import { percGraph } from "../../exhibits/percgraph";
import { AppState } from "../../redux/ConfigureStore";
import { fetchLifeTable } from "../../redux/lifetables";
import "../../styles/howmanyyears.scss";
import { LifeTable, LifeTableElement } from "../../types";
import { DeathRangeResults } from "../questions/DeathRangeComponent";
import { InputPanel } from "../questions/InputPanelComponent";

interface OwnProps {
  //   question: QuestionType;
  // userInput: UserInputs;
  // updateUserInputs: (input: UserInputs) => void;
}

export type HowManyYearsProps = OwnProps;

export const ChancesOfLiving: React.FC<HowManyYearsProps> = () => {
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

  // Inputs needed for graph and results
  const cur_age_data = table_data.filter((x) => x.age === userInput.age)[0];
  const filtered_ages = table_data
    .filter((x) => x.age >= userInput.age)
    .map((age_data) => {
      const death_chance = 1 - age_data.lx / cur_age_data.lx;
      return { ...age_data, death_chance: death_chance };
    });
  const average_age = filtered_ages.filter(
    (x) => x.age >= Math.floor(cur_age_data.age + cur_age_data.ex)
  )[0];
  const perc_25 = filtered_ages.filter((x) => x.death_chance >= 0.25)[0];
  const perc_75 = filtered_ages.filter((x) => x.death_chance >= 0.75)[0];
  const final_age = filtered_ages[filtered_ages.length - 1];

  const emptyEntry: LifeTableElement = {
    age: 0,
    qx: 0,
    dx: 0,
    ex: 0,
    lx: 0,
    Lx: 0,
    Tx: 0,
    death_chance: 0,
  };

  useEffect(() => {
    dispatch(
      fetchLifeTable({ input: userInput, loaded_tables: loaded_tables })
    );
    // lifeGraph(userInput.age, table_data, current_table)
  }, [dispatch, loaded_tables, userInput]);

  useEffect(() => {
    const handleResize = () => {
      percGraph(
        userInput.age,
        filtered_ages,
        current_table,
        cur_age_data,
        average_age,
        perc_25,
        perc_75,
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
      percGraph(
        userInput.age,
        filtered_ages,
        current_table,
        cur_age_data,
        average_age,
        perc_25,
        perc_75,
        final_age,
        theme
      );
      // console.log("resizing");
    }
  }, [userInput, table_data, filtered_ages, current_table, cur_age_data, average_age, perc_25, perc_75, final_age, theme]);

  return (
    <>
      <Grid item xs={12} md={4} className="inputGridItem">
        <Paper style={{ height: "100%", width: "100%" }} elevation={10}>
          <InputPanel />
        </Paper>
      </Grid>
      <Grid item xs={12} md={8} className="chartGridItem">
        <Paper style={{ height: "100%", width: "100%" }} elevation={10}>
          <div
            id="perc-graph-container"
            style={{ height: "100%", width: "100%" }}
          >
            <svg
              id="perc-graph"
              style={{ overflow: "visible", width: "100%" }}
            />
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} className="resultsGridItem">
        <Paper style={{ height: "100%", width: "100%" }} elevation={10}>
          <DeathRangeResults
            userInput={userInput}
            cur_age={cur_age_data ? cur_age_data : emptyEntry}
            average_age={average_age ? average_age : emptyEntry}
            perc_25={perc_25 ? perc_25 : emptyEntry}
            perc_75={perc_75 ? perc_75 : emptyEntry}
            final_age={final_age ? final_age : emptyEntry}
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
          href="/Question/3"
          style={{
            backgroundColor: theme.palette.secondary.main,
            display: breakUp ? "none" : "",
          }}
        >
          How Will I Die? <ArrowForward />
        </Button>
      </Grid>
      <Button
        href="/Question/3"
        style={{
          position: "fixed",
          backgroundColor: theme.palette.secondary.main,
          bottom: 15,
          right: 15,
          display: breakUp ? "" : "none",
        }}
      >
        How Will I Die? <ArrowForward />
      </Button>
    </>
  );
};
