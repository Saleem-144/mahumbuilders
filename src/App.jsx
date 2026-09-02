import { RouterProvider, Switch, Route, ScrollToTop } from "./router/Router";
import SmoothScroll from "./components/SmoothScroll/SmoothScroll";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import BackToTop from "./components/BackToTop/BackToTop";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Services from "./pages/Services/Services";
import Projects from "./pages/Projects/Projects";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";
import Contact from "./pages/Contact/Contact";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <RouterProvider>
      <SmoothScroll>
        <ScrollToTop />
        <Header />
        <main>
          <Switch>
            <Route path="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/services">
              <Services />
            </Route>
            <Route path="/projects">
              <Projects />
            </Route>
            <Route path="/projects/:slug">
              <ProjectDetails />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <NotFound />
          </Switch>
        </main>
        <Footer />
        <BackToTop />
      </SmoothScroll>
    </RouterProvider>
  );
}

export default App;
