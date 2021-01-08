import "./i18n";
import { Suspense, useEffect } from "react";
import Home from "./pages/home";
import ReactGA from "react-ga";
import { LinearProgress } from "@material-ui/core";

const App = () => {
  useEffect(() => {
    ReactGA.initialize("258291945");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <Suspense fallback={<LinearProgress />}>
      <Home />
    </Suspense>
  );
};

export default App;
