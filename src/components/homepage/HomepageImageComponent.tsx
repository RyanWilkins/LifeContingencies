import { Typography } from "@material-ui/core";
import React from "react";
import ActuarialNotation from "../../shared/img/ActuarialNotation.svg";

// interface svgObjs {
//   label: string;
//   element: JSX.Element;
// }

// const svgList: svgObjs[]  = [
//     {
//         label: "npx",
//         element:
//     }
// ]

interface OwnProps {}

export const HomepageImageComponent: React.FC<OwnProps> = () => {
  return (
    <>
      <img
        src={ActuarialNotation}
        alt="Actuarial Notation"
        style={{ fill: "white" }}
      />
      <br />
      <br />
      {/* <div style={{ position: "relative", width: "100%" }}> */}
      <Typography
        variant="caption"
        //   style={{ position: "absolute", bottom: "0" }}
      >
        Image Source:{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://en.wikipedia.org/wiki/Actuarial_notation#/media/File:Actuarial_notation.svg"
          style={{ color: "white" }}
        >
          Actuarial Notation by Delimata on Wikipedia
        </a>
      </Typography>
      {/* </div> */}
    </>
  );
};
