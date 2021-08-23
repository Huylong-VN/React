import React from "react";
import Home from "./Pages/Client/Home";
import About from "./Pages/Client/About";
import Login from "./Pages/Client/Login";
import { Route,Redirect, BrowserRouter as Router } from "react-router-dom";
import Client from "./Layouts/client";
import admin from "./Layouts/admin";
import Manage_users from "./Pages/Admin/Manage_users";
import Manage_product from "./Pages/Admin/Manage_product";
import { DashBoard } from "./Components/Admin/DashBoard";
import Detail from "./Pages/Client/Detail"

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      <Layout>
        <Component {...props}></Component>
      </Layout>
    )}
  ></Route>
);

const App = () => {
  return (
    <Router>
        <AppRoute
          path="/admin"
          exact
          layout={admin}
          component={() => localStorage.getItem("token") == null ?<Redirect to="/" />:<DashBoard />}
        />
        <AppRoute path="/" exact layout={Client} component={Home} />
        <AppRoute path="/home" exact layout={Client} component={Home} />

        <AppRoute path="/about" exact layout={Client} component={About} />
        <AppRoute path="/detail/:productId" exact layout={Client} component={Detail} />
        <Route path="/login" exact component={Login} />
        <AppRoute
          path="/admin/product"
          exact
          layout={admin}
          component={Manage_product}
        />
          <AppRoute
            path="/admin/user"
            exact
            layout={admin}
            component={Manage_users}
          />
    </Router>
  );
};

export default App;
