import { BrowserRouter, Route, Switch } from "react-router-dom";
import Index from "./pages/Index";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Article from "./pages/Article";
import Articles from "./pages/Articles";
import Category from "./pages/Category";
import ToTop from "./components/ToTop";
import About from "./pages/About";
import "./App.css";

import Page404 from "./pages/Page404";
import Profile from "./pages/Profile";

function App() {


  return (
    <>
      <BrowserRouter>
        <ToTop />
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Index />
          </Route>
          <Route path="/article/:url">
            <Article />
          </Route>
          <Route path="/category/:id">
            <Category />
          </Route>
          <Route path="/articles/">
            <Articles />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>

          <Route>
            <Page404 />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
