import {
  Box,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/ConfigureStore";
import { fetchDeathTable } from "../../redux/deathtable";
import { DeathTable } from "../../types";
import DeathDataTable from "./DeathTableComponent";

export const DeathTableWrapper: React.FC = () => {
  const theme = useTheme();
  const userInput = useSelector((state: AppState) => state.userInput);
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  const current_table = useSelector(
    (state: AppState) => state.deathtables.current_table
  );
  const loaded_tables = useSelector(
    (state: AppState) => state.deathtables.loaded_tables
  );
  const dispatch = useDispatch();
  const table_data = useSelector((state: AppState) => {
    const selected: DeathTable = state.deathtables.tables.filter(
      (table: DeathTable) => table.table_name === current_table
    )[0];
    if (selected) {
      return selected.elements.map((x) => ({
        ...x,
        cause_percent: Math.round(x.cause_percent * 10000) / 100,
      }));
    } else {
      return [];
    }
  });

  useEffect(() => {
    dispatch(
      fetchDeathTable({ input: userInput, loaded_tables: loaded_tables })
    );
  }, [dispatch, loaded_tables, userInput]);

  return (
    <Grid container spacing={1} alignContent="center">
      <Grid
        item
        xs={12}
        style={{ height: mobile ? "" : "15vh", textAlign: "center" }}
      >
        <Box m={1}>
          <Typography variant="h4">Data Sources - DeathTables</Typography>
          <Typography variant="body1">
            The tables below have been sourced from{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.cdc.gov/nchs/fastats/leading-causes-of-death.htm"
              style={{ color: "white" }}
            >
              CDC Data (US)
            </a>{" "}
            Year 2017 data was used and the data was manipulated in R to
            standardize the format for use in this app.
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12} style={{ height: mobile ? "" : "85vh" }}>
        <Paper elevation={10} style={{ height: "100%" }}>
          <DeathDataTable rows={table_data} />
        </Paper>
      </Grid>
    </Grid>
  );
};
