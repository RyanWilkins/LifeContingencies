import React from "react";
import { toMapType } from "./DeathGridComponent";

//  [1] "Perinatal Period Conditions" "Deformations"                 "Other Accidents"              "SIDS"
//  [5] "Heart Disease"                "Other"                        "Kidney Disease"               "Influenza"
//  [9] "Diabetes"                     "Homicide"                     "Motor Vehicle Accident"       "Cancer"
// [13] "Suicide"                      "Lower Respiratory Disease"    "Pregnancy or Childbirth"      "HIV"
// [17] "All Other"                    "Liver Disease"                "Tuberculosis"                 "Peptic Ulcer"
// [21] "Syphilis"                     "Alzheimers"



interface OwnProps {
  listForGrid: toMapType[];
}

export const DeathSvg: React.FC<OwnProps> = (props) => {


  return (
    <>
        <svg height="100%" width="100%" viewBox="0 0 100 100">
        {props.listForGrid.map((x, index) => 
          <svg height="9%" width="9%" x={`${(index % 10)*10}%`} y={`${Math.floor((index / 10))*10}%`} key={index}>
              {x.symbol}
            </svg>
        )}
        </svg>
    </>
  );
};
