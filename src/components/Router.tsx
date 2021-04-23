import React from "react"
import { Switch, Route } from "react-router-dom"
import Main from "../components/MainContent"
import Register from "../pages/Register"
import Login from "../pages/Login"
import { Box } from "@material-ui/core"


const MainRoute: React.FC<{}> = () => {
  return (
    <Box>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </Box>
  );
};

export default MainRoute;
