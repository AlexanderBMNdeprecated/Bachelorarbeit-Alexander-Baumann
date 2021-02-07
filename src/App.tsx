import React from "react";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import MainMenu from "./components/Menu/MainMenu";
import Task_1 from "./pages/task/easy/Task_1";
import Task_2 from "./pages/task/medium/Task_1";
import Overview from "./pages/overview/Overview";
import Testing from "./pages/testing/Testing";

import { Tasks } from "./logic/TasksContext";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./style.css";
import { Redirect, Route } from "react-router";
import { IonReactRouter } from "@ionic/react-router";

const App: React.FC = () => {
  return (
    <>
      <Tasks>
        <IonApp>
          <IonReactRouter>
            <MainMenu />
            <IonRouterOutlet id="main-menu">
              <Route path="/easyTask1" component={Task_1} exact={true} />
              <Route path="/mediumTask1" component={Task_2} exact={true} />
              <Route path="/overview" component={Overview} exact={true} />
              <Route path="/testing" component={Testing} exact={true} />
              <Route
                exact
                path="/"
                render={() => <Redirect to="/overview" />}
              />
            </IonRouterOutlet>
          </IonReactRouter>
        </IonApp>
      </Tasks>
    </>
  );
};

export default App;
