import {
  Typography,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Popover,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import React, { useState } from "react";
import { UserInputs } from "../../types";
import "../../styles/howmanyyears.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/ConfigureStore";
import { updateUserInput } from "../../redux/userinputs";
import { fetchLifeTable } from "../../redux/lifetables";
import { Help } from "@material-ui/icons";

interface OwnProps {
  userInput: UserInputs;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: "none",
    },
    paper: {
      padding: theme.spacing(1),
    },
  })
);

export const GenderInput: React.FC<OwnProps> = (props) => {
  const userInput = props.userInput;
  const classes = useStyles();
  const loaded_tables = useSelector(
    (state: AppState) => state.lifetables.loaded_tables
  );
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openedPopoverId, setOpenedPopoverId] = useState<string | null>(null);

  const handleGenderSelectChange = (event: any) => {
    var value: UserInputs["gender"] = event.target.value as any;
    const new_inputs = { ...userInput, gender: value };
    dispatch(updateUserInput(new_inputs));
    dispatch(
      fetchLifeTable({ input: new_inputs, loaded_tables: loaded_tables })
    );
  };

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string
  ) => {
    setOpenedPopoverId(id);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setOpenedPopoverId(null);
  };

  const open = Boolean(anchorEl);

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">
        <Typography
          aria-owns={open ? "popover-gender" : undefined}
          aria-haspopup="true"
          onMouseEnter={(e) => handlePopoverOpen(e, "popover-gender")}
          onMouseLeave={handlePopoverClose}
        >
          Gender <Help style={{ position: "relative", top: "0.2em" }} />
        </Typography>
        <Popover
          id="popover-gender"
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={openedPopoverId === "popover-gender"}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          Author's Note: Unfortunately there are no publicly available life
          tables for non-binary persons.
        </Popover>
      </FormLabel>
      <RadioGroup
        row
        aria-label="gender"
        name="gender1"
        value={userInput.gender}
        onChange={handleGenderSelectChange}
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel
          value="other"
          control={<Radio />}
          label="No Specification"
        />
      </RadioGroup>
    </FormControl>
  );
};
