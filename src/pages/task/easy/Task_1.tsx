import {
  IonButton,
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
} from "@ionic/react";
import React, { useContext, useEffect } from "react";
import Header from "../../../components/Header";
import { TasksContext } from "../../../logic/TasksContext";

const Task_1: React.FC = () => {
  const [tasks, setTasks] = useContext(TasksContext);

  //Loads the last Stage you Ended at
  function loadStages() {
    var taskStage = tasks.find((element: { id: number }) => {
      return element.id === 1;
    }).stage;
    if(taskStage >= 1){
      document.getElementById("help")!.style["display"] = "block";
    }
    if(taskStage >= 2){
      document.getElementById("defineProblem")!.style["display"] = "block";
    }
    if(taskStage >= 3){
      var answer1: HTMLCollectionOf<Element> = document
      .getElementById("setProblemDiv")
      ?.getElementsByClassName("item")!;
      var checked1: number[] = [0,2,3];
      document
      .getElementById("answerStyle1")!
      .setAttribute("style", "color: green; display: inline");
    for (var i = 0; i < answer1.length; i++) {
      answer1[i].firstElementChild?.setAttribute("disabled", "true");
    }
    for(var p = 0; p < checked1.length; p++){
      answer1[checked1[p]].firstElementChild?.setAttribute("checked", "true")
    }
    document.getElementById("solveProblem")!.style["display"] = "block";
    }
    if(taskStage >= 4){

      var answer2: HTMLCollectionOf<Element> = document
      .getElementById("solveProblemDiv")
      ?.getElementsByClassName("item")!;
      var checked2: number[] = [1,2];
      document
        .getElementById("answerStyle2")!
        .setAttribute("style", "color: green; display: inline");

      for (var j = 0; j < answer2.length; j++) {
        answer2[j].firstElementChild?.setAttribute("disabled", "true");
      }
      for(var o = 0; o < checked2.length; o++){
        answer2[checked2[o]].firstElementChild?.setAttribute("checked", "true")
      }
      document.getElementById("taskCompleted")!.style["display"] = "block";
    }
  }

  useEffect(() => {
    loadStages();// eslint-disable-next-line
  }, []);

  //Always show assigned div and set global stage state
  function onClickHelp() {
    document.getElementById("help")!.style["display"] = "block";
    var taskStage = tasks.find((element: { id: number }) => {
      return element.id === 1;
    }).stage;
    if (taskStage === 0) {
      setTasks(
        tasks.map((item: { id: number }) =>
          item.id === 1 ? { ...item, stage: 1 } : item
        )
      );
    }
  }
  function onClickSucess() {
    document.getElementById("defineProblem")!.style["display"] = "block";
    setTasks(
      tasks.map((item: { id: number }) =>
        item.id === 1 ? { ...item, stage: 2 } : item
      )
    );
  }
  
  const wrapText = {
    whiteSpace: "normal",
    fontSize: "16px",
  };

  function checkAnswer1() {
    var answer: HTMLCollectionOf<Element> = document
      .getElementById("setProblemDiv")
      ?.getElementsByClassName("item")!;
    var checked: number[] = [];
    for (var i = 0; i < answer.length; i++) {
      if (answer[i].getAttribute("class")?.includes("item-checkbox-checked"))
        checked.push(i);
    }
    if (
      checked[0] === 0 &&
      checked[1] === 2 &&
      checked[2] === 3 &&
      checked.length === 3
    ) {
      setTasks(
        tasks.map((item: { id: number }) =>
          item.id === 1 ? { ...item, stage: 3 } : item
        )
      );
      document
        .getElementById("answerStyle1")!
        .setAttribute("style", "color: green; display: inline");
      for (var j = 0; j < answer.length; j++) {
        answer[j].firstElementChild?.setAttribute("disabled", "true");
      }
      document.getElementById("solveProblem")!.style["display"] = "block";
    } else {
      document
        .getElementById("answerStyle1")!
        .setAttribute("style", "color: red; display: inline");
    }
  }

  function checkAnswer2() {
    var answer: HTMLCollectionOf<Element> = document
      .getElementById("solveProblemDiv")
      ?.getElementsByClassName("item")!;
    var checked: number[] = [];
    for (var i = 0; i < answer.length; i++) {
      if (answer[i].getAttribute("class")?.includes("item-checkbox-checked"))
        checked.push(i);
    }
    if (checked[0] === 1 && checked[1] === 2 && checked.length === 2) {
      setTasks(
        tasks.map((item: { id: number }) =>
          item.id === 1 ? { ...item, stage: 4, completed: true } : item
        )
      );
      document
        .getElementById("answerStyle2")!
        .setAttribute("style", "color: green; display: inline");

      for (var j = 0; j < answer.length; j++) {
        answer[j].firstElementChild?.setAttribute("disabled", "true");
      }
      document.getElementById("taskCompleted")!.style["display"] = "block";
    } else {
      document
        .getElementById("answerStyle2")!
        .setAttribute("style", "color: red; display: inline");
    }
  }

  return (
    <>
      <IonPage>
        <Header id={1} />
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol id="task">
                <div id="taskDiv">
                  <h3>Aufgabe:</h3>
                  <p>
                    Das Ziel des Hasen ist es durch das Labyrinth zu laufen und
                    auf seinem Weg so viele Eier wie möglich zu sammeln. In dem
                    Labyrinth patrollieren jedoch 2 Wölfe und versuchen den Hase
                    aufzuhalten. Aktuell ist es jedoch noch sehr schwer für den
                    Hase viele Eier zu sammeln, bevor die Wölfe ihn finden.{" "}
                    <br />
                    <br />
                    Begebe dich in die Testumgebung und versuche Herauszufinden,
                    wo das Problem liegt.
                  </p>
                </div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton
                  color="warning"
                  onClick={() => {
                    onClickHelp();
                  }}
                >
                  Ich benötige Hilfe!
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton
                  color="success"
                  onClick={() => {
                    onClickSucess();
                  }}
                >
                  Ich kenne das Problem!
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol id="help">
                <div id="helpDiv">
                  <p>
                    Achte genau auf den Hase und was du tun musst um ihn
                    vorwärts laufen zu lassen. Mache dir Gedanken darüber ob das
                    so wohl geplant ist oder ob er sich anders verhalten sollte.
                  </p>
                </div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol id="defineProblem" color="blueBackground">
                <div id="setProblemDiv">
                  <p>Wähle die Aussagen aus, die das Problem beschreiben:</p>
                  <IonList className="removePadding">
                    <IonItem color="blueBackground">
                      <IonCheckbox slot="start"></IonCheckbox>
                      <IonLabel style={wrapText}>
                        Der Hase läuft immer nur genau einen Schritt
                      </IonLabel>
                    </IonItem>
                    <IonItem color="blueBackground">
                      <IonCheckbox slot="start"></IonCheckbox>
                      <IonLabel style={wrapText}>
                        Die Testumgebung stürzt nach einem Schritt ab
                      </IonLabel>
                    </IonItem>
                    <IonItem color="blueBackground">
                      <IonCheckbox slot="start"></IonCheckbox>
                      <IonLabel style={wrapText}>
                        Der Hase ist zu langsam
                      </IonLabel>
                    </IonItem>
                    <IonItem color="blueBackground">
                      <IonCheckbox slot="start"></IonCheckbox>
                      <IonLabel style={wrapText}>
                        Der Hase kann keine Eier einsammeln
                      </IonLabel>
                    </IonItem>
                    <IonItem color="blueBackground">
                      <IonCheckbox slot="start"></IonCheckbox>
                      <IonLabel style={wrapText}>
                        Die Wölfe sind zu schnell
                      </IonLabel>
                    </IonItem>
                  </IonList>
                  <IonButton
                    style={{ marginLeft: "65px" }}
                    onClick={() => {
                      checkAnswer1();
                    }}
                  >
                    Fertig!
                  </IonButton>
                  <label id="answerStyle1">
                    {tasks.find((element: { id: number }) => {
                      return element.id === 1;
                    }).stage === 2
                      ? "Falsch"
                      : "Richtig"}
                  </label>
                </div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol id="solveProblem" color="blueBackground">
                <div id="solveProblemDiv">
                  <p>
                    Wähle die Schritte aus, die unternommen werden müssen, um
                    das Problem zu lösen:
                  </p>
                  <IonList className="removePadding">
                    <IonItem color="pinkBackground">
                      <IonCheckbox slot="start" color="pink"></IonCheckbox>
                      <IonLabel style={wrapText}>
                        Der Hase soll größere Schritte machen
                      </IonLabel>
                    </IonItem>
                    <IonItem color="pinkBackground">
                      <IonCheckbox slot="start" color="pink"></IonCheckbox>
                      <IonLabel style={wrapText}>
                        Der Hase soll wiederholt kleine Schritte machen
                      </IonLabel>
                    </IonItem>
                    <IonItem color="pinkBackground">
                      <IonCheckbox slot="start" color="pink"></IonCheckbox>
                      <IonLabel style={wrapText}>
                        Der Hase soll eigenständig in die geswipte Richtung
                        laufen
                      </IonLabel>
                    </IonItem>
                    <IonItem color="pinkBackground">
                      <IonCheckbox slot="start" color="pink"></IonCheckbox>
                      <IonLabel style={wrapText}>
                        Der Hase soll nach einem Swipe bis an die Wand laufen
                      </IonLabel>
                    </IonItem>
                  </IonList>
                  <IonButton
                    style={{ marginLeft: "65px" }}
                    onClick={() => {
                      checkAnswer2();
                    }}
                    color="pink"
                  >
                    Fertig!
                  </IonButton>
                  <label id="answerStyle2">
                    {tasks.find((element: { id: number }) => {
                      return element.id === 1;
                    }).stage === 3
                      ? "Falsch"
                      : "Richtig"}
                  </label>
                </div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol id="taskCompleted">
                <div className="taskCompletedDiv">
                  <p>Du hast die Aufgabe erfolgreich abgeschlossen!</p>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Task_1;
