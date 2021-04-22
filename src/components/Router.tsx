import React from "react"
import { Switch, Route } from "react-router-dom"
import Main from "../components/MainContent"
import Register from "./Register"
import Login from "./Login"
import { Box } from "@material-ui/core"


const MainRoute: React.FC<{}> = () => {
  return (
    <Box>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
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
