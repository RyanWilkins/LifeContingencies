import {
  MenuItem,
  Select,
  Typography,
  FormControl,
  InputLabel,
  Popover,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import React, { useState } from "react";
import { ethnicity_list, UserInputs } from "../../types";
import "../../styles/howmanyyears.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/ConfigureStore";
import { updateUserInput } from "../../redux/userinputs";
import { fetchLifeTable } from "../../redux/lifetables";
import { Help } from "@material-ui/icons";

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

interface OwnProps {
  userInput: UserInputs;
}

export const EthnicityInput: React.FC<OwnProps> = (props) => {
  const userInput = props.userInput;
  const classes = useStyles();
  const loaded_tables = useSelector(
    (state: AppState) => state.lifetables.loaded_tables
  );
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openedPopoverId, setOpenedPopoverId] = useState<string | null>(null);

  const handleEthnicitySelectChange = (event: any) => {
    var value: UserInputs["ethnicity"] = event.target.value as any;
    const new_inputs = { ...userInput, ethnicity: value };
    dispatch(updateUserInput(new_inputs));
    dispatch(
      fetchLifeTable({ input: new_inputs, loaded_tables: loaded_tables })
    );
  };

  const selectItems = (tomap: string[]) => {
    return tomap.map((item: string) => {
      return (
        <MenuItem value={item} key={item}>
          {item}
        </MenuItem>
      );
    });
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
    <FormControl disabled={props.userInput.country === "US" ? false:true}>
      <InputLabel style={{ marginTop: "-10px" }}>
        <Typography
          aria-owns={open ? "popover-ethnicity" : undefined}
          aria-haspopup="true"
          onMouseEnter={(e) => handlePopoverOpen(e, "popover-ethnicity")}
          onMouseLeave={handlePopoverClose}
        >
          Ethnicity <Help style={{ position: "relative", top: "0.2em" }} />
        </Typography>
        <Popover
          id="popover-ethnicity"
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={openedPopoverId === "popover-ethnicity"}
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
          Author's Note: Publicly available life tables divided by ethnicity
          are limited. For those not listed, please select "All"
        </Popover>
      </InputLabel>
      <Select
        labelId="user-ethnicity-select-label"
        id="user-ethnicity-select"
        value={userInput.ethnicity}
        onChange={handleEthnicitySelectChange}
        style={{ minWidth: "120px" }}
      >
        {selectItems(ethnicity_list)}
      </Select>
    </FormControl>
  );
};
