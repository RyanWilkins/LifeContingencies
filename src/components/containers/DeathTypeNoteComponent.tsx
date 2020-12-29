import {
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";
import React from "react";
import "../../styles/howmanyyears.scss";
import { DeathTableElement, UserInputs } from "../../types";

interface OwnProps {
  listForNote: DeathTableElement[];
  userInput: UserInputs;
  svgMap: any;
}

export const DeathTypeNote: React.FC<OwnProps> = (props) => {
  const leading: DeathTableElement[] = props.listForNote.sort(
    (a, b) => b.cause_percent - a.cause_percent
  );
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid
      container
      style={{
        textAlign: "left",
        alignItems: "center",
        height: "100%",
        display: "flex",
        padding: "15px",
      }}
    >
      <Grid item xs={12}>
        <Typography variant="h5">
          According to the CDC, the leading causes of death for
          <span
            style={{
              color:
                props.userInput.gender === "other"
                  ? ""
                  : theme.palette.secondary.main,
            }}
          >
            {" "}{props.userInput.gender === "other"
              ? "people"
              : props.userInput.gender + "s"}
          </span>{" "}
          aged{" "}
          <span style={{ color: theme.palette.secondary.main }}>
            {props.userInput.age}{" "}
          </span>
          in the United States are:
          <div
            style={{
              marginLeft: mobile ? "1em" : "2em",
              fontSize: mobile ? "0.7em" : "0.9em",
            }}
          >
            {leading.map((x, index) => {
              if (index < 10) {
                return (
                  <p key={index}>
                    <span style={{ display: "inline-block", width: "30px" }}>
                      {props.svgMap[x.cause]}
                    </span>{" "}
                    {index + 1}
                    {". "}
                    {x.cause}: {(x.cause_percent * 100).toFixed(2)}
                    {"%"}
                  </p>
                );
              }
              return "";
            })}
          </div>
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Button
          href="/DataSource/deathtables"
          // size="large"
          style={{
            backgroundColor: theme.palette.secondary.main,
            margin:"5px"
          }}
        >
          See Data Sources <ArrowForward />
        </Button>
        {"  "}
        <Button
          href="/"
          // size="large"
          style={{
            backgroundColor: theme.palette.secondary.main,
            margin: "5px",
            // marginTop: xsonly? "5px" : "",
          }}
        >
          HomePage <ArrowForward />
        </Button>
      </Grid>
    </Grid>
  );
};
