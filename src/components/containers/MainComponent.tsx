import React from "react";
import { Content } from "./ContentComponent";
import { ControlPanel } from "./ControlPanelComponent";

// this stuff will have to go into store
const dw = 240;

interface OwnProps {
  fake?: string;
}

type Props = OwnProps;

const Main: React.FC<Props> = (props) => {
  return (
    <>
      <ControlPanel drawerWidth={dw} />
      <Content drawerWidth={dw} />
    </>
  );
};

export default Main;
