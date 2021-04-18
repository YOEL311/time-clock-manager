import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "./App.css";
import Router from "./router";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

const themeObject = {
  palette: {
    primary: { main: "#9A58B2" },
    type: "light",
  },
  themeName: "Blue Lagoon 2020",
  typography: {
    fontFamily: "Bitter",
  },
};

function App() {
  const themeType = useSelector((state) => state.them);
  const themeConfig = createMuiTheme({
    ...themeObject,
    palette: {
      ...themeObject.palette,
      type: themeType,
    },
  });

  return (
    <MuiThemeProvider theme={themeConfig}>
      <Router />
      <ToastContainer />
    </MuiThemeProvider>
  );
}

export default App;
