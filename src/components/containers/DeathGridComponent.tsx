import {
  faBaby,
  faBabyCarriage,
  faBacteria,
  faBacterium,
  faBrain,
  faCarCrash,
  faCrow,
  faDiagnoses,
  faDisease,
  faDna,
  faFemale,
  faHeadSideCough,
  faHeartbeat,
  faHSquare,
  faLungs,
  faLungsVirus,
  faRadiationAlt,
  faShieldVirus,
  faUser,
  faUserInjured,
  faWeight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { Inbox } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/ConfigureStore";
import { fetchDeathTable } from "../../redux/deathtable";
import "../../styles/howmanyyears.scss";
import { DeathTable, DeathTableElement } from "../../types";
import { AgeSlider } from "../questions/AgeSliderComponent";
import { GenderInput } from "../questions/GenderInputComponent"
import { DeathSvg } from "./DeathSvgComponent";
import { DeathTypeNote } from "./DeathTypeNoteComponent";

interface OwnProps {
  //   question: QuestionType;
  // userInput: UserInputs;
  // updateUserInputs: (input: UserInputs) => void;
}

interface resType {
  cause: string;
  symbol: JSX.Element;
  int_prop: number;
}

export interface toMapType {
  cause: string;
  symbol: JSX.Element;
}

interface stylesType {
  fontSize: string;
}

interface svgMapType {
  [key: string]: JSX.Element;
}

const svgMapFunc = (styles: stylesType): svgMapType => ({
  "Perinatal Period Conditions": (
    <FontAwesomeIcon
      icon={faFemale}
      style={{ ...styles, color: "lightpink" }}
    />
  ),
  Deformations: (
    <FontAwesomeIcon icon={faDna} style={{ ...styles, color: "slateblue" }} />
  ),
  "Other Accidents": (
    <FontAwesomeIcon
      icon={faUserInjured}
      style={{ ...styles, color: "darkorange" }}
    />
  ),
  SIDS: <FontAwesomeIcon icon={faBabyCarriage} style={{ ...styles }} />,
  "Heart Disease": (
    <FontAwesomeIcon icon={faHeartbeat} style={{ ...styles, color: "red" }} />
  ),
  "Other Disease": (
    <FontAwesomeIcon icon={faBacterium} style={{ ...styles, color: "green" }} />
  ),
  "Kidney Disease": (
    <FontAwesomeIcon icon={faDisease} style={{ ...styles, color: "brown" }} />
  ),
  Influenza: <FontAwesomeIcon icon={faHeadSideCough} style={{ ...styles }} />,

  Diabetes: (
    <FontAwesomeIcon
      icon={faWeight}
      style={{ ...styles, color: "lightblue" }}
    />
  ),
  Homicide: (
    <FontAwesomeIcon icon={faCrow} style={{ ...styles, color: "crimson" }} />
  ),

  "Motor Vehicle Accident": (
    <FontAwesomeIcon icon={faCarCrash} style={{ ...styles }} />
  ),
  Cancer: (
    <FontAwesomeIcon
      icon={faRadiationAlt}
      style={{ ...styles, color: "gold" }}
    />
  ),
  Suicide: (
    <FontAwesomeIcon
      icon={faUser}
      style={{ ...styles, color: "darkturquoise" }}
    />
  ),

  "Lower Respiratory Disease": (
    <FontAwesomeIcon icon={faLungs} style={{ ...styles, color: "pink" }} />
  ),
  "Pregnancy or Childbirth": (
    <FontAwesomeIcon icon={faBaby} style={{ ...styles, color: "violet" }} />
  ),
  HIV: (
    <FontAwesomeIcon icon={faHSquare} style={{ ...styles, color: "orange" }} />
  ),
  "All Other": (
    <FontAwesomeIcon icon={faDiagnoses} style={{ ...styles, color: "green" }} />
  ),

  "Liver Disease": (
    <FontAwesomeIcon
      icon={faShieldVirus}
      style={{ ...styles, color: "lightgreen" }}
    />
  ),

  Tuberculosis: (
    <FontAwesomeIcon icon={faLungsVirus} style={{ ...styles, color: "pink" }} />
  ),

  "Peptic Ulcer": <Inbox style={{ ...styles }} />,
  Syphilis: <FontAwesomeIcon icon={faBacteria} style={{ ...styles }} />,

  Alzheimers: (
    <FontAwesomeIcon icon={faBrain} style={{ ...styles, color: "plum" }} />
  ),
});

const getIntegerAmounts = (elems: DeathTableElement[]): resType[] => {
  // console.log(elems)
  let results: resType[] = [];
  let total = 0;
  const styles = {
    fontSize: "40px",
  };
  const svgMap = svgMapFunc(styles);

  elems.map((x) => {
    let nextElem = {
      cause: x.cause,
      symbol: svgMap[x.cause],
      int_prop: Math.round(x.cause_percent * 100),
    };
    total = total + nextElem.int_prop;
    results.push(nextElem);
    return null;
  });

  let adj = true;

  let maxCause = Math.max(...results.map((res) => res.int_prop));

  return results.map((e) => {
    if (e.int_prop === maxCause && adj) {
      adj = false;
      return { ...e, int_prop: e.int_prop + (100 - total) };
    } else {
      return e;
    }
  });
};

const mapToList = (elems: resType[]): toMapType[] => {
  let toReturn: toMapType[] = [];

  // console.log(elems)

  elems.map((group: resType) => {
    let entries = [...Array(group.int_prop)].map(() => ({
      cause: group.cause,
      symbol: group.symbol,
    }));
    toReturn.push(...entries);
    return null;
  });

  return toReturn;
};

export const DeathGrid: React.FC<OwnProps> = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  const userInput = useSelector((state: AppState) => state.userInput);
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
      return selected.elements;
    } else {
      return [];
    }
  });
  const cur_elems = table_data.filter(
    (x: DeathTableElement) => x.age === userInput.age
  );
  const mappedElems = getIntegerAmounts(cur_elems);
  const listForGrid = mapToList(mappedElems);

  // Inputs needed for graph and results

  useEffect(() => {
    dispatch(
      fetchDeathTable({ input: userInput, loaded_tables: loaded_tables })
    );
    // lifeGraph(userInput.age, table_data, current_table)
  }, [dispatch, loaded_tables, userInput]);

  return (
    <>
      <Grid item xs={12} md={6} style={{ height: mobile ? "" : "80vh" }}>
        <Paper style={{ height: "100%", width: "100%" }} elevation={10}>
          <Grid
            item
            container
            // xs={12}
            style={{
              // display: mobile ? "none" : "",
              height: "8%",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <AgeSlider userInput={userInput} />
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
          <Grid item xs={12} style={{ height: "80%" }}>
            <DeathSvg listForGrid={listForGrid} />
          </Grid>
          <Grid
            item
            container
            // xs={12}
            style={{
              // display: mobile ? "" : "none",
              height: "12%",
              width: "100%",
              alignItems: "center",
              marginBottom:mobile?"10px":""
            }}
          >
            <Grid item xs={1}></Grid>
            <Grid item xs={11} style={{zoom:mobile?"75%":""}}>
              <GenderInput userInput={userInput} />
            </Grid>
            
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6} style={{ height: mobile ? "" : "80vh" }}>
        <Paper style={{ height: "100%", width: "100%" }} elevation={10}>
          <DeathTypeNote
            listForNote={cur_elems}
            svgMap={svgMapFunc({ fontSize: "0.9em" })}
            userInput={userInput}
          />
        </Paper>
      </Grid>

      <Grid item xs={12} style={{ height: mobile ? "" : "5vh" }}>
        <Paper style={{ height: "100%", width: "100%" }} elevation={10}>
          <div
            style={{
              textAlign: "center",
              alignItems: "center",
              height: "100%",
              display: "flex",
              padding: "15px",
            }}
          >
            <Typography variant="h6">
              Thanks for checking out my work - more features to come! In the meantime you can see all my projects on{" "}
              <a
                target="_blank"
                rel="noreferrer"
                style={{ color: "white" }}
                href="https://www.rjwilkins.com/"
              >
                my homepage
              </a>{" "}
              or follow me on{" "}
              <a
                target="_blank"
                rel="noreferrer"
                style={{ color: "white" }}
                href="https://twitter.com/WilkinsRyanJ"
              >
                Twitter
              </a>{" "}
              and{" "}
              <a
                target="_blank"
                rel="noreferrer"
                style={{ color: "white" }}
                href="https://github.com/RyanWilkins"
              >
                GitHub
              </a>
              .
            </Typography>
          </div>
        </Paper>
      </Grid>
    </>
  );
};
