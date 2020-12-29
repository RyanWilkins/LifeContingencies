import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import Main from "../src/components/containers/MainComponent";
import { store } from "./redux/ConfigureStore";


function App() {
  const theme = createMuiTheme({
    palette:{
      type: 'dark'
    }
  });

  return (
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </ThemeProvider>
    </Provider>
  );

}

export default App;
