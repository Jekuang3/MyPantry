import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./auth/Login.js";
import SignUp from "./auth/SignUp.js";
import Dashboard from "./core/Dashboard.js";
import UserProfileInfoPage from "./user/UserProfileInfoPage";
import PantryProfile from "./pantry/PantryProfile.js";
import PantryPosts from "./post/PantryPosts.js";
import RegisterPantry from "./pantry/RegisterPantry.js";
import UpdatePantry from "./pantry/UpdatePantry.js";
import React, { useEffect } from "react";

function App() {
  // Update screen tab bar to show title
  useEffect(() => {
    document.title = "MyPantry";
  }, []);
  return (
    // define routes and corresponding components
    <Router>
      <Switch>
        <Route path="/" component={Dashboard} exact />
        <Route path="/SignUp" component={SignUp} exact />
        <Route path="/Login" component={Login} exact />
        <Route
          path="/UserProfileInfoPage"
          component={UserProfileInfoPage}
          exact
        />
        <Route path="/RegisterPantry" component={RegisterPantry} exact />
        <Route path="/UpdatePantry" component={UpdatePantry} exact />
        <Route path="/PantryProfile" component={PantryProfile} exact />
        <Route path="/PantryPosts" component={PantryPosts} exact />
      </Switch>
    </Router>
  );
}

export default App;
