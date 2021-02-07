import {
  IonContent,
  IonIcon,
  IonItem,
  IonList,
  IonMenu,
  IonMenuToggle,
} from "@ionic/react";
import React, { useContext } from "react";
import {
  documentTextOutline,
  gameControllerOutline,
  gridOutline,
} from "ionicons/icons";
import Progress from "./Progress";
import { useLocation } from "react-router-dom";
import { TasksContext } from "../../logic/TasksContext";

const MainMenu: React.FC = () => {
  const getPath = useLocation().pathname;
  const [tasks] = useContext(TasksContext);

  function lastTask() {
    var lastTask = tasks.find((element: { id: number }) => {
      return element.id === 0;
    }).lastTask;
    if (lastTask === "") {
      return "/overview";
    } else {
      return lastTask;
    }
  }


  return (
    <IonMenu side="start" content-id="main-menu" maxEdgeStart={0}>
      <IonContent id="menuContent">
        <Progress />
        <IonList>
          <IonMenuToggle id="sideMenu">
            <IonItem
              routerLink={"/overview"}
              routerDirection="none"
              className={getPath === "/overview" ? "active" : ""}
            >
              <IonIcon icon={gridOutline}></IonIcon>
              Übersicht
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem
              routerLink={lastTask()}
              routerDirection="none"
              className={getPath === "/easyTask1" ? "active" : ""}
            >
              <IonIcon icon={documentTextOutline}></IonIcon>
              Aufgabe
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem
              routerLink={"/testing"}
              routerDirection="none"
              className={getPath === "/testing" ? "active" : ""}
            >
              <IonIcon icon={gameControllerOutline}></IonIcon>
              Testumgebung
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default MainMenu;
