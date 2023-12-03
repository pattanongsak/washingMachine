import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Webfont from "webfontloader";
import AllWashingMachine from "./components/allWashingMachine";
import WashingMachine from "./components/washingMachine.js";

function App() {
  useEffect(() => {
    Webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={AllWashingMachine} />
        <Route
          exact
          path="/washing/machine/detail/:id"
          component={WashingMachine}
        />
      </Switch>
    </Router>
  );
}

export default App;
