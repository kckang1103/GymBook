import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";

import HeaderTitle from "./components/HeaderTitle";
import MenuBar from "./components/MenuBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";
import Profile from "./pages/Profile.js";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <HeaderTitle />
          <MenuBar />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/posts/:postId" component={SinglePost} />
          <Route exact path="/profile/:username" component={Profile} />
        </Container>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
