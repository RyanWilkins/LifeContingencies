import { Grid, Typography, useTheme } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/ConfigureStore";
import "../../styles/howmanyyears.scss";
import { AgeSlider } from "./AgeSliderComponent";
import { CountryInput } from "./CountryInputComponent";
import { EthnicityInput } from "./EthnicityInputComponent";
import { GenderInput } from "./GenderInputComponent";

interface OwnProps {}

export type InputPanelProps = OwnProps;

export const InputPanel: React.FC<InputPanelProps> = (props) => {
  const theme = useTheme();
  const userInput = useSelector((state: AppState) => state.userInput);

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      style={{
        padding: theme.spacing(3),
        minHeight: "100%",
      }}
    >
      <Grid item xs={12}>
          <Typography variant="h5" style={{ textAlign: "center" }}>
            Demographics Input
          </Typography>
          <Typography variant="body1" style={{ textAlign: "center" }}>
            <span style={{color:theme.palette.secondary.light}}>Provide inputs to determine which life table to pull estimates from.</span>
          </Typography>
      </Grid>
      <Grid item xs={12}>
        <GenderInput userInput={userInput} />
      </Grid>
      <Grid item xs={12}>
        <AgeSlider userInput={userInput} />
      </Grid>
      <Grid item xs={6}>
        <CountryInput userInput={userInput} />
      </Grid>
      <Grid item xs={6}>
        <EthnicityInput userInput={userInput} />
      </Grid>
    </Grid>
  );
};
