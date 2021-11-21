import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { Toaster } from "react-hot-toast";

import Header from "./Header";
import Footer from "./Footer";
import Generate from "./Generate";
import Stats from "./Stats";
import About from "./About";
import Report from "./Report";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Container>
        <div className="layout">
          <Header />
          <div className="center">
            <Switch>
              <Route path="/" exact component={Generate} />
              <Route path="/stats" exact component={Stats} />
              <Route path="/about" exact component={About} />
              <Route path="/report" exact component={Report} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Container>
    </BrowserRouter>
  );
};

export default App;
