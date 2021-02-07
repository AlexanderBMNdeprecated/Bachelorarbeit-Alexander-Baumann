import {  IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { get, set } from "../../logic/Storage";
import { TasksContext } from "../../logic/TasksContext";
import { useIsMount } from "../../logic/isMountedHook";


const Overwiev: React.FC = () => {
  const [tasks, setTasks] = useContext(TasksContext);

  const isMount = useIsMount();

//save and update local storage with global state data
  useEffect(() => {
    if (isMount) {
      //first Render
      get("tasksStorage").then(function(response){if(response === null){set("tasksStorage", tasks)}else{get("tasksStorage").then(function(response){setTasks(response)})}})
    } else {
      //following Renders
      get("tasksStorage").then(function(response){set("tasksStorage", tasks)})
    } // eslint-disable-next-line
  }, [tasks]);

  const onClickCanvas = (e: Event) => {
    var object: any = e.target;
    setTasks(
      tasks.map((item: { id: number }) =>
        item.id === 0 ? { ...item, lastTask: object!.parentElement.getAttribute("href")} : item
      )
    );
  };

  function createEasyCanvas() {
    var a: any = tasks.filter(function (el: any) {
      return el.difficulty === "easy";
    });
    var easyTasks = document.getElementsByClassName("easyTask");
    for (var i = 0; i < easyTasks.length; i++) {
      var c: any = easyTasks[i];
      var ctx = c!.getContext("2d");
      ctx.beginPath();
      ctx.strokeStyle = "#00ff00";
      ctx.arc(21, 21, 20, 0, 2 * Math.PI);
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();
      ctx.fillStyle = "#00ff00";
      if (a[i] !== undefined) {
        if (a[i].completed === true) {
          ctx.fillStyle = "#00ff00";
          ctx.fill();
          ctx.fillStyle = "#FFFFFF";
        }
      }
      ctx.font = "bold 20px Arial";
      ctx.fillText(i + 1, 15, 27);
      ctx.stroke();
    }
  }

  function createMediumCanvas() {
    var tasks = document.getElementsByClassName("mediumTask");
    for (var i = 0; i < tasks.length; i++) {
      var c: any = tasks[i];
      var ctx = c!.getContext("2d");
      ctx.beginPath();
      ctx.strokeStyle = "#ff8800";
      ctx.arc(21, 21, 20, 0, 2 * Math.PI);
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();
      ctx.fillStyle = "#ff8800";
      ctx.font = "bold 20px Arial";
      ctx.fillText(i + 1, 15, 27);
      ctx.stroke();
    }
  }

  function createHardCanvas() {
    var tasks = document.getElementsByClassName("hardTask");
    for (var i = 0; i < tasks.length; i++) {
      var c: any = tasks[i];
      var ctx = c!.getContext("2d");
      ctx.beginPath();
      ctx.strokeStyle = "#ff0000";
      ctx.arc(21, 21, 20, 0, 2 * Math.PI);
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();
      ctx.fillStyle = "#ff0000";
      ctx.font = "bold 20px Arial";
      ctx.fillText(i + 1, 15, 27);
      ctx.stroke();
    }
  }

  function canvasEventListener() {
    var easy = document.getElementsByClassName("easyTask");
    var medium = document.getElementsByClassName("mediumTask");
    var hard = document.getElementsByClassName("hardTask");
    for (var i = 0; i < easy.length; i++) {
      easy[i].addEventListener("click", onClickCanvas, false);
    }
    for (var j = 0; j < medium.length; j++) {
      medium[j].addEventListener("click", onClickCanvas, false);
    }
    for (var v = 0; v < hard.length; v++) {
      hard[v].addEventListener("click", onClickCanvas, false);
    }
  }

  useEffect(() => {
    canvasEventListener();
    createEasyCanvas();
    createMediumCanvas();
    createHardCanvas(); // eslint-disable-next-line
  }, [tasks]);

  return (
    <>
      <IonPage>
        <Header id={0} />
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonGrid className="easyGridStyle">
                <IonRow>
                  <div id="easyHeader">Einfach</div>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <Link to="/easyTask1">
                      <canvas
                        className="easyTask"
                        width="42"
                        height="42"
                      ></canvas>
                    </Link>
                  </IonCol>
                  <IonCol>
                    <Link to="">
                      <canvas
                        className="easyTask"
                        width="42"
                        height="42"
                      ></canvas>
                    </Link>
                  </IonCol>
                  <IonCol>
                    <Link to="">
                      <canvas
                        className="easyTask"
                        width="42"
                        height="42"
                      ></canvas>
                    </Link>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <Link to="">
                      <canvas
                        className="easyTask"
                        width="42"
                        height="42"
                      ></canvas>
                    </Link>
                  </IonCol>
                  <IonCol>
                    <Link to="">
                      <canvas
                        className="easyTask"
                        width="42"
                        height="42"
                      ></canvas>
                    </Link>
                  </IonCol>
                  <IonCol>
                    <Link to="">
                      <canvas
                        className="easyTask"
                        width="42"
                        height="42"
                      ></canvas>
                    </Link>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonRow>
          </IonGrid>
          <IonGrid>
            <IonRow>
              <IonGrid className="mediumGridStyle">
                <IonRow>
                  <div id="mediumHeader">Mittel</div>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <Link to="/mediumTask1">
                      <canvas
                        className="mediumTask"
                        width="42"
                        height="42"
                      ></canvas>
                    </Link>
                  </IonCol>
                  <IonCol>
                    <Link to="">
                      <canvas
                        className="mediumTask"
                        width="42"
                        height="42"
                      ></canvas>
                    </Link>
                  </IonCol>
                  <IonCol>
                    <Link to="">
                      <canvas
                        className="mediumTask"
                        width="42"
                        height="42"
                      ></canvas>
                    </Link>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <Link to="">
                      <canvas
                        className="mediumTask"
                        width="42"
                        height="42"
                      ></canvas>
                    </Link>
                  </IonCol>
                  <IonCol>
                    <Link to="">
                      <canvas
                        className="mediumTask"
                        width="42"
                        height="42"
                      ></canvas>
                    </Link>
                  </IonCol>
                  <IonCol>
                    <Link to="">
                      <canvas
                        className="mediumTask"
                        width="42"
                        height="42"
                      ></canvas>
                    </Link>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonRow>
          </IonGrid>
          <IonGrid>
            <IonRow>
              <IonGrid className="hardGridStyle">
                <IonRow>
                  <div id="hardHeader">Schwer</div>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <Link to="">
                      <canvas
                        className="hardTask"
                        width="42"
                        height="42"
                      ></canvas>
                    </Link>
                  </IonCol>
                  <IonCol>
                    <Link to="">
                      <canvas
                        className="hardTask"
                        width="42"
                        height="42"
                      ></canvas>
                    </Link>
                  </IonCol>
                  <IonCol>
                    <Link to="">
                      <canvas
                        className="hardTask"
                        width="42"
                        height="42"
                      ></canvas>
                    </Link>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <Link to="">
                      <canvas
                        className="hardTask"
                        width="42"
                        height="42"
                      ></canvas>
                    </Link>
                  </IonCol>
                  <IonCol>
                    <Link to="">
                      <canvas
                        className="hardTask"
                        width="42"
                        height="42"
                      ></canvas>
                    </Link>
                  </IonCol>
                  <IonCol>
                    <Link to="">
                      <canvas
                        className="hardTask"
                        width="42"
                        height="42"
                      ></canvas>
                    </Link>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};
export default Overwiev;
