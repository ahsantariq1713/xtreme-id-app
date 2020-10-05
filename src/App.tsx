import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, IonContent } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";



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

//Component Imports

import Splash from "./pages/Splash";
import Organization from "./pages/Organization";
import Form from "./pages/Form";

const App: React.FC = () => (
  <Provider store={store}>
    <IonApp>
      <IonContent>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/" component={Splash} exact={true} />
            <Route path="/form" component={Form} exact={true} />
            <Route path="/organization" component={Organization} exact={true} />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonContent>
    </IonApp>
  </Provider>
);

export default App;
