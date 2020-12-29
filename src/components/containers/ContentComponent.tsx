import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import styled from "styled-components";
// import { DataSourceComponent } from "../datasource/DataSourceComponent";
import { DataTableWrapper } from "../datasource/DataSourceWrapperComponent";
import { DeathTableWrapper } from "../datasource/DeathTableWrapperComponent";

import { HomePage } from "../homepage/HomepageComponent";
import AnswerWrapper from "./AnswerWrapper";

interface OwnProps {
  drawerWidth: number;
  breakUp?: boolean;
}

type ContentProps = OwnProps;

const StyledMain = styled.main`
  width: ${(props) =>
    props.breakUp ? `calc(100% - ${props.drawerWidth}px)` : "100%"};
  flexgrow: 1;
  margin-left: ${(props: OwnProps) =>
    props.breakUp ? props.drawerWidth + "px" : 0};
  background-color: ${(props) => props.theme.palette.background.paper};
`;

export const Content = (props: ContentProps) => {
  const theme = useTheme();
  const breakUp = useMediaQuery(theme.breakpoints.up("md"));

  // useEffect( () => console.log("mount"), [] );
  // useEffect( () => () => console.log("unmount"), [] );

  return (
    <StyledMain {...props} theme={theme} breakUp={breakUp}>
      <Switch>
        <Route path="/home" render={() => <HomePage />} />
        <Route
          path="/Question/:questionIndex"
          render={(routerProps) => (
            <AnswerWrapper selected={routerProps.match.params} />
          )}
        />
        {/* <Route path="/DataSource" render = {() => <DataSourceComponent />} /> */}
        <Route path="/DataSource/lifetables" render={() => <DataTableWrapper />} />
        <Route path="/DataSource/deathtables" render={() => <DeathTableWrapper />} />
        <Redirect to="/home" />
      </Switch>
    </StyledMain>
  );
};
