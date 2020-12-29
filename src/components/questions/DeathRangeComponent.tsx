import { Typography, useMediaQuery, useTheme } from "@material-ui/core";
import React from "react";
import { LifeTableElement, UserInputs } from "../../types";

interface OwnProps {
  userInput: UserInputs;
  cur_age: LifeTableElement;
  average_age: LifeTableElement;
  perc_25: LifeTableElement;
  perc_75: LifeTableElement;
  final_age: LifeTableElement;
}

export type DeathRangeResultsProps = OwnProps;

export const DeathRangeResults: React.FC<DeathRangeResultsProps> = (props) => {
  const theme = useTheme();
  const breakUp = useMediaQuery(theme.breakpoints.up("md"));

  var dataSource =
    props.userInput.country === "Canada" ? "Stats Canada" : "the CDC";

  var denon = props.userInput.country === "Canada" ? "Canadians" : "Americans";

  return (
    <div
      style={{
        textAlign: "center",
        alignItems: "center",
        height: "100%",
        display: "flex",
        padding: "15px",
      }}
    >
      <Typography variant={breakUp ? "h4" : "h5"}>
        According to {dataSource}, 25% of{" "}
        <span style={{ color: theme.palette.secondary.main }}>
          {props.userInput.ethnicity === "All"
            ? ""
            : props.userInput.ethnicity.toLowerCase() + " "}{" "}
        </span>
        <span
          style={{
            color:
              props.userInput.gender === "other"
                ? ""
                : theme.palette.secondary.main,
          }}
        >
          {props.userInput.gender === "other" ? " " : props.userInput.gender}{" "}
        </span>{" "}
        {denon} who are currently{" "}
        <span style={{ color: theme.palette.secondary.main }}>
          {props.userInput.age}{" "}
        </span>
        years old will die before age{" "}
        <span style={{ color: theme.palette.warning.main }}>
          {props.perc_25.age}
        </span>{" "}
        and 75% before age{" "}
        <span style={{ color: theme.palette.warning.main }}>
          {props.perc_75.age}
          {". "}
        </span>
        There is a{" "}
        <span style={{ color: theme.palette.warning.main }}>
          {props.final_age.death_chance
            ? ((1 - props.final_age.death_chance) * 100).toFixed(2)
            : 0}
          {"% chance of living past age "}
          {props.final_age.age}
          {"."}
        </span>
      </Typography>
    </div>
  );
};
