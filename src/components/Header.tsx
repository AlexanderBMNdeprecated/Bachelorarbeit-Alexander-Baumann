import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import { TasksContext } from "../logic/TasksContext";
import Difficulty from "./difficulty";

const Header: React.FC<{ id: number }> = (props) => {
  const [tasks] = useContext(TasksContext);
  const amountTasks: number = tasks.length - 1;
  const [amountCompletedTasks, setAmountCompletedTasks] = useState(Number);
  const [progressPercent, setProgressPercent] = useState(Number);
  const [current, setCurrent] = useState(
    tasks.find((element: { id: number }) => {
      return element.id === props.id;
    })
  );

  function updateCompleted() {
    var newArray = tasks.filter(function (el: any) {
      return el.completed === true;
    });
    if (newArray.length !== amountCompletedTasks) {
      setAmountCompletedTasks(newArray.length);
    }
  }

  function updateProgress() {
    setProgressPercent((amountCompletedTasks / amountTasks) * 100);
  }

  useEffect(() => {
    updateCompleted();
    setCurrent(
      tasks.find((element: { id: number }) => {
        return element.id === props.id;
      })
    ); // eslint-disable-next-line
  }, [tasks]);

  useEffect(() => {
    updateProgress(); // eslint-disable-next-line
  }, [amountCompletedTasks]);

  function loadProgress() {
    document.getElementsByClassName("progressBar")[0].setAttribute("style", "");
    setTimeout(() => {
      if (amountCompletedTasks === 0) {
        document
          .getElementsByClassName("progressBar")[0]
          .setAttribute(
            "style",
            "opacity: 1; margin-left: 50%; transition:0.5s ease; "
          );
      } else {
        document
          .getElementsByClassName("progressBar")[0]
          .setAttribute(
            "style",
            "opacity: 1; width: " + progressPercent + "%; transition:0.5s ease;"
          );
      }
      document.getElementsByClassName("progressBar")[0].innerHTML =
        progressPercent.toString() + "%";
    }, 200);
  }

  function addDifficulty() {
    if (current.id !== 0) {
      return <Difficulty id={current.id} />;
    }
  }
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start" onClick={() => loadProgress()}>
            <IonMenuButton auto-hide="false" id="main-menu"></IonMenuButton>
          </IonButtons>
          <IonTitle >{current.task}</IonTitle>
          {addDifficulty()}
        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default Header;
