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
import { fetchLifeTable } from "../../redux/lifetables";
import { LifeTable } from "../../types";
import { CountryInput } from "../questions/CountryInputComponent";
import { EthnicityInput } from "../questions/EthnicityInputComponent";
import { GenderInput } from "../questions/GenderInputComponent";
import LifeDataTable from "./LifeTableComponent";

export const DataTableWrapper: React.FC = () => {
  const theme = useTheme();
  const userInput = useSelector((state: AppState) => state.userInput);
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
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

  useEffect(() => {
    dispatch(
      fetchLifeTable({ input: userInput, loaded_tables: loaded_tables })
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
          <Typography variant="h4">Data Sources - Life Tables</Typography>
          <Typography variant="body1">
            The tables below have been sourced from{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.cdc.gov/nchs/products/life_tables.htm"
              style={{ color: "white" }}
            >
              CDC Data (US)
            </a>{" "}
            and{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www150.statcan.gc.ca/n1/en/catalogue/84-537-X"
              style={{ color: "white" }}
            >
              Stats Canada.
            </a>{" "}
            For the US, 2018 year data was used. For Canada, their compiled life
            tables for years 2017-2019 were used. In both cases the data was
            manipulated in R to standardize the format for use in this app.
            Descriptions of the notiation used in life tables can be found at{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.ssa.gov/OACT/HistEst/CohLifeTables/LifeTableDefinitions.pdf"
              style={{ color: "white" }}
            >
              this link from the Social Security Website.
            </a>
          </Typography>
        </Box>
      </Grid>
      <Grid container style={{ padding: "10px", height: mobile ? "" : "10vh" }}>
        <Grid
          item
          xs={12}
          md={8}
          style={{ height: mobile ? "" : "100%", padding: "10px" }}
        >
          {/* <Paper elevation={0} style={{ height: "100%"}}> */}
          <Box m={-1}>
            <GenderInput userInput={userInput} />{" "}
            <EthnicityInput userInput={userInput} />{" "}
            <CountryInput userInput={userInput} />
          </Box>
          {/* </Paper> */}
        </Grid>
        <Grid item xs={12} style={{ height: mobile ? "" : "75vh" }}>
          <Paper elevation={10} style={{ height: "100%" }}>
            <LifeDataTable rows={table_data} />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};
