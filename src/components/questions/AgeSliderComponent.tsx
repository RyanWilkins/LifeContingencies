import { Slider, Typography } from "@material-ui/core";
import React, { useState } from "react";
import "../../styles/howmanyyears.scss";
import { UserInputs } from "../../types";
import { useDispatch } from "react-redux";
import { updateUserInput } from "../../redux/userinputs";

interface OwnProps {
  userInput: UserInputs;
}

export const AgeSlider: React.FC<OwnProps> = (props) => {
  const userInput = props.userInput;
  const dispatch = useDispatch();

  const [sliderVal, setSliderVal] = useState(userInput.age);

  const handleAgeSliderChange = (event: any, newValue: number | number[]) => {
    var value: number = newValue as any;
    const new_inputs = { ...userInput, age: value };
    dispatch(updateUserInput(new_inputs));
  };

  const handleSliderSlide = (event: any, newValue: number | number[]) => {
    var value: number = newValue as any;
    setSliderVal(value);
  };

  return (
    <>
      <Typography gutterBottom>Current Age</Typography>
      {/* Your age is {userInput.age} and it's going to update to {sliderVal} */}
      <Slider
        defaultValue={30}
        value={sliderVal}
        step={1}
        min={0}
        max={100}
        id="user-age-slider"
        valueLabelDisplay="on"
        onChange={handleSliderSlide}
        onChangeCommitted={handleAgeSliderChange}
      />
    </>
  );
};
