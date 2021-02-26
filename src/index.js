import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.4.0";
import "assets/demo/demo.css?v=1.4.0";
import "assets/demo/react-demo.css?v=1.4.0";
import "assets/demo/nucleo-icons-page-styles.css?v=1.4.0";
// pages
import AboutUs from "views/examples/AboutUs.js";
// import BlogPost from "views/examples/BlogPost.js";
// import BlogPosts from "views/examples/BlogPosts.js";
import ContactUs from "views/examples/ContactUs.js";
import Ecommerce from "views/examples/Ecommerce.js";
import Index from "views/Index.js";
import LandingPage from "views/examples/LandingPage.js";
// import LoginPage from "views/examples/LoginPage.js";
// import NucleoIcons from "views/NucleoIcons.js";
import Presentation from "views/Presentation.js";
// import Pricing from "views/examples/Pricing.js";
import ProductPage from "views/examples/ProductPage.js";
// import ProfilePage from "views/examples/ProfilePage.js";
// import Sections from "views/Sections.js";
// import SignupPage from "views/examples/SignupPage.js";
import CartPage from "views/examples/CartPage.js";
// others

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/about-us" render={(props) => <AboutUs {...props} />} />
      {/* <Route path="/blog-post" render={(props) => <BlogPost {...props} />} />
      <Route path="/blog-posts" render={(props) => <BlogPosts {...props} />} /> */}
      <Route path="/contact-us" render={(props) => <ContactUs {...props} />} />
      <Route path="/e-commerce" render={(props) => <Ecommerce {...props} />} />
      <Route path="/index" render={(props) => <Index {...props} />} />
      <Route
        path="/landing-page"
        render={(props) => <LandingPage {...props} />}
      />
      {/* <Route path="/login-page" render={(props) => <LoginPage {...props} />} /> */}
      {/* <Route
        path="/nucleo-icons"
        render={(props) => <NucleoIcons {...props} />}
      /> */}
      <Route
        path="/presentation"
        render={(props) => <Presentation {...props} />}
      />
      {/* <Route path="/pricing" render={(props) => <Pricing {...props} />} /> */}
      <Route
        path="/products/:id"
        render={(props) => <ProductPage {...props} />}
      />
      <Route path="/cart" render={(props) => <CartPage {...props} />} />
      {/* <Route
        path="/profile-page"
        render={(props) => <ProfilePage {...props} />}
      /> */}
      {/* <Route path="/sections" render={(props) => <Sections {...props} />} />
      <Route path="/sign-up" render={(props) => <SignupPage {...props} />} /> */}
      <Route path="/" render={(props) => <Presentation {...props} />} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
