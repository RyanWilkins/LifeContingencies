import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import React from "react";
import { country_list, UserInputs } from "../../types";
import "../../styles/howmanyyears.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/ConfigureStore";
import { updateUserInput } from "../../redux/userinputs";
import { fetchLifeTable } from "../../redux/lifetables";
// import '@fortawesome/fontawesome-free/js/brands.js'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCanadianMapleLeaf} from "@fortawesome/free-brands-svg-icons"
import {faFlagUsa} from "@fortawesome/free-solid-svg-icons"


interface OwnProps {
  userInput: UserInputs;
}

export const CountryInput: React.FC<OwnProps> = (props) => {
  const userInput = props.userInput;
  const loaded_tables = useSelector(
    (state: AppState) => state.lifetables.loaded_tables
  );
  const dispatch = useDispatch();

  const handleCountrySelectChange = (event: any) => {
    var value: UserInputs["country"] = event.target.value as any;

    const new_ethnicity = value === "US" 
                        ? userInput.ethnicity
                        : "All"

    const new_inputs = { ...userInput, country: value, ethnicity: new_ethnicity };
    dispatch(updateUserInput(new_inputs));
    dispatch(
      fetchLifeTable({ input: new_inputs, loaded_tables: loaded_tables })
    );
  };


  const selectItems = (tomap: string[]) => {
    return tomap.map((item: string) => {
      return (
        <MenuItem value={item} key={item}>
         <FontAwesomeIcon icon={item === "Canada" ? faCanadianMapleLeaf : faFlagUsa} /> {"  "}{item}
        </MenuItem>
      );
    });
  };

  return (
    <FormControl>
      <InputLabel style={{ marginTop: "-10px" }}>Country of Residency</InputLabel>
      <Select
        labelId="user-country-select-label"
        id="user-country-select"
        value={userInput.country}
        onChange={handleCountrySelectChange}
        style={{ minWidth: "120px" }}
      >
        {selectItems(country_list)}
      </Select>
    </FormControl>
  );
};
