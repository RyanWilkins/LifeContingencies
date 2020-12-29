import { Typography, useMediaQuery, useTheme } from "@material-ui/core";
import React from "react";
import { UserInputs } from "../../types";

interface OwnProps {
  userInput: UserInputs;
  ex: number;
}

export type DeathYearResultsProps = OwnProps;

export const DeathYearResults: React.FC<DeathYearResultsProps> = (props) => {
  const theme = useTheme();
  const breakUp = useMediaQuery(theme.breakpoints.up("md"));

  var currentTime = new Date();
  var start = new Date(currentTime.getFullYear(), 0, 0);
  var diff = currentTime.getTime() - start.getTime();
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);
  var yearFrac = currentTime.getFullYear() + day / 365;

  var dataSource =
    props.userInput.country === "Canada" ? "Stats Canada" : "the CDC";

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
        According to {dataSource}, as a{" "}
        <span style={{ color: theme.palette.secondary.main }}>
          {props.userInput.age}{" "}
        </span>
        year old{" "}
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
          {props.userInput.gender === "other"
            ? "person"
            : props.userInput.gender}{" "}
        </span>
        from{" "}
        <span style={{ color: theme.palette.secondary.main }}>
          {props.userInput.country === "US"
            ? "the US"
            : props.userInput.country}
        </span>
        , you can expect to live{" "}
        <span style={{ color: theme.palette.warning.main }}>
          {props.ex.toFixed(2)}
        </span>{" "}
        more years. This would put your expected date of death sometime during{" "}
        <span style={{ color: theme.palette.warning.main }}>
          {Math.floor(yearFrac + props.ex)}{" "}
        </span>
        at the age of{" "}
        <span style={{ color: theme.palette.warning.main }}>
          {Math.floor(props.userInput.age + props.ex)}
        </span>
        .
      </Typography>
    </div>
  );
};
