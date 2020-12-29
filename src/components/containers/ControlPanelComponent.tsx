import {
  faCat,
  faHome,
  faQuestionCircle,
  faTable,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { KeyboardArrowUp, MenuOpen } from "@material-ui/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";

type CPTypes = {
  drawerWidth: number;
};

const useStyles = makeStyles((theme) => ({
  drawerpaper: {
    background: theme.palette.background.default,

    marginBottom: theme.spacing(5),
  },

  openmenu: {
    background: theme.palette.background.default,
    borderRadius: "20%",
    color: "white",
    position: "fixed",
    bottom:"5px",
    left:"5px"
    
  },

  closeicon: {
    display: "none",
  },
}));

interface ControlPanelItem {
  label: string;
  icon: any;
  link: string;
  id: number;
}

const CPList: ControlPanelItem[] = [
  {
    label: "When Will I Die?",
    icon: <FontAwesomeIcon icon={faQuestionCircle} />,
    link: "/question/1",
    id: 1,
  },
  {
    label: "What If I'm Lucky?",
    icon: <FontAwesomeIcon icon={faQuestionCircle} />,
    link: "/question/2",
    id: 2,
  },
  {
    label: "How Will I Die?",
    icon: <FontAwesomeIcon icon={faQuestionCircle} />,
    link: "/question/3",
    id: 3,
  },
  // {
  //   label: "Submit a Question",
  //   icon: <FontAwesomeIcon icon={faQuestionCircle} />,
  //   link: "/question/4",
  //   id: 3,
  // },
];

export const ControlPanel: React.FC<CPTypes> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const breakUp = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = useState(false);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const drawerList = (props: CPTypes) => (
    <div
      style={{
        width: breakUp ? props.drawerWidth + "px" : "100%",
        height: "100%",
      }}
    >
      <List style={{ alignItems: "center" }} onClick={handleDrawerClose}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItem button key="home">
            <ListItemIcon>
              <FontAwesomeIcon icon={faHome} />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
        </Link>
        <Divider />
        <ListItem>
          <Typography variant="h6">Life Expectancy</Typography>
        </ListItem>
        <Divider />
        {CPList.map((elem, i) => (
          <Link
            to={elem.link}
            style={{ textDecoration: "none", color: "inherit" }}
            onClick={handleDrawerClose}
            key={i}
          >
            <ListItem button key={elem.id}>
              <ListItemIcon>{elem.icon}</ListItemIcon>
              <ListItemText primary={elem.label} />
            </ListItem>
          </Link>
        ))}
        <Divider />
        {/* <ListItem>
          <Typography variant="h6">Life Contingencies</Typography>
        </ListItem>
        <Divider />
        <ListItem button key="lifetables">
          <ListItemIcon>
            <FontAwesomeIcon icon={faExclamationCircle} />
          </ListItemIcon>
          <ListItemText primary={"Coming Soon!"} />
        </ListItem>
        <Divider /> */}
        <ListItem>
          <Typography variant="h6">Data Sources</Typography>
        </ListItem>
        <Divider />
        <Link
          to="/DataSource/lifetables"
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={handleDrawerClose}
        >
          <ListItem button key="lifetables">
            <ListItemIcon>
              <FontAwesomeIcon icon={faTable} />
            </ListItemIcon>
            <ListItemText primary={"Life Tables"} />
          </ListItem>
        </Link>
        <Link
          to="/DataSource/deathtables"
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={handleDrawerClose}
        >
          <ListItem button key="deathtables">
            <ListItemIcon>
              <FontAwesomeIcon icon={faTable} />
            </ListItemIcon>
            <ListItemText primary={"Death Tables"} />
          </ListItem>
        </Link>
      </List>
      <List style={{ bottom: 0, position: breakUp ? "absolute" : "relative" }}>
        <a
          href="https://www.rjwilkins.com"
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItem button key="homepage">
            <ListItemIcon>
              <FontAwesomeIcon icon={faCat} />
            </ListItemIcon>
            <ListItemText primary={"Visit My Homepage!"} />
          </ListItem>
        </a>
      </List>
    </div>
  );

  return (
    <>
      <IconButton onClick={handleDrawerOpen} className={classes.openmenu}>
        <MenuOpen />
      </IconButton>
      <Drawer
        anchor={breakUp ? "left" : "top"}
        open={open}
        variant={breakUp ? "permanent" : "persistent"}
        PaperProps={{ className: classes.drawerpaper }}
      >
        {drawerList(props)}
        <IconButton
          onClick={handleDrawerClose}
          className={breakUp ? classes.closeicon : "none"}
        >
          <KeyboardArrowUp />
        </IconButton>
      </Drawer>
    </>
  );
};
