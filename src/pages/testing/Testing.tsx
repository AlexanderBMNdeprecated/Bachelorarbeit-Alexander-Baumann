import {
  IonAlert,
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useIsMount } from "../../logic/isMountedHook";
import { refreshOutline } from "ionicons/icons";
import { useLocation } from "react-router";
import { TasksContext } from "../../logic/TasksContext";

var nextDirectionRabbit: string = "";
var idRabbit: any;
var idWolf1: any;
var idWolf2: any;
var points: number = 0;
var testingArea: any;
var haseTot: number = 0;
var swipeCount: number = 0;
var refillInterval: any;
var mapIndexCounterX: number = 0;
var mapIndexCounterY: number = 0;
// var lastRabbitIndexX: number;
// var lastRabbitIndexY: number;
// var wegFrei: boolean;

//hook for previous state
function usePrevious(data: string) {
  const ref = useRef<string>();
  useEffect(() => {
    ref.current = data;
  }, [data]);
  return ref.current;
}

const Testing: React.FC = () => {
  const [directionRabbit, setDirectionRabbit] = useState(String);
  const [directionWolf1, setDirectionWolf1] = useState(String);
  const [directionWolf2, setDirectionWolf2] = useState(String);
  const [showAlert, setShowAlert] = useState(false);
  const prevDirectionRabbit = usePrevious(directionRabbit);
  const [tasks] = useContext(TasksContext);

  const isMount = useIsMount();

  //change visual direction if swipe direction changes
  useEffect(() => {
    if (isMount) {
      //first Render
    } else {
      //following Renders
      clearInterval(idWolf2);
      changedirectionWolf("wolf2");
    } // eslint-disable-next-line
  }, [directionWolf2]);

  //change visual direction if swipe direction changes
  useEffect(() => {
    if (isMount) {
      //first Render
    } else {
      //following Renders
      clearInterval(idWolf1);
      changedirectionWolf("wolf1");
    } // eslint-disable-next-line
  }, [directionWolf1]);

  //change visual direction if swipe direction changes
  useEffect(() => {
    if (isMount) {
      //first Render
    } else {
      //following Renders
      clearInterval(idRabbit);
      changeDirectionRabbit();
    }
    // eslint-disable-next-line
  }, [directionRabbit]);

  //make object turn visualy
  function changeDirectionStyle(moveObject: string, direction: string) {
    var object: any;
    if (moveObject === "rabbit") {
      object = document.getElementsByClassName("rabbit")[0];
    } else if (moveObject === "wolf1") {
      object = document.getElementsByClassName("wolf1")[0];
    } else if (moveObject === "wolf2") {
      object = document.getElementsByClassName("wolf2")[0];
    }
    if (direction === "left") {
      object.style["transform"] = "scaleX(1)";
    } else if (direction === "right") {
      object.style["transform"] = "scaleX(-1)";
    }
    return object;
  }

  function changeDirectionRabbit() {
    var object = changeDirectionStyle("rabbit", directionRabbit);
    //Wenn die aktuelle richtung eine kolission hat und die davor keine
    if (
      colissionDetection(directionRabbit, "wall", object, 1) !== undefined &&
      colissionDetection(prevDirectionRabbit!, "wall", object, 1) === undefined
    ) {
      if (prevDirectionRabbit === "") {
        //Für 1. Ausführung falls Benutzer in Wand swiped
        return;
      } else {
        nextDirectionRabbit = directionRabbit;
        setDirectionRabbit(prevDirectionRabbit!);
      }
    } else {
      idRabbit = setInterval(movingRabbit, 10, object);
    }
  }

  //selecting random position out of direction array
  function randomDirection(direction: string[]) {
    return direction[Math.floor(Math.random() * direction.length)];
  }

  function movingRabbit(object: any) {
    var posLeft = object.offsetLeft;
    var posTop = object.offsetTop;
    //wenns eine Kolission in nextDirection und direction mit Wand gibt stehen bleiben
    if (
      colissionDetection(nextDirectionRabbit, "wall", object, 1) !==
        undefined &&
      colissionDetection(directionRabbit, "wall", object, 1) !== undefined
    ) {
      nextDirectionRabbit = "";
      clearInterval(idRabbit);
    } //wenns eine Kolission in nextdirection mit Wand gibt oder next direction nicht definiert ist
    else if (
      colissionDetection(nextDirectionRabbit, "wall", object, 1) !==
        undefined ||
      nextDirectionRabbit === ""
    ) {
      //wenn es keine Kolission zwischen Hase und Wand gibt
      if (
        colissionDetection(directionRabbit, "wall", object, 1) === undefined
      ) {
        //wenn es eine Kollision mit einem Ei gibt
        if (
          colissionDetection(directionRabbit, "egg", object, -15) !== undefined
        ) {
          colissionDetection(directionRabbit, "egg", object, -15)!.className =
            "ground";
          points++;
        }
        //Ein Pixel bewegen je nach richtung
        if (directionRabbit === "left") {
          posLeft--;
          object.style["left"] = posLeft + "px";
        } else if (directionRabbit === "right") {
          posLeft++;
          object.style["left"] = posLeft + "px";
        } else if (directionRabbit === "up") {
          posTop--;
          object.style["top"] = posTop + "px";
        } else if (directionRabbit === "down") {
          posTop++;
          object.style["top"] = posTop + "px";
        }
      } else {
        //wird ausgeführt wenn es eine Kollision mit der Wand gibt
        clearInterval(idRabbit);
      }
    } else {
      //wird ausgeführt wenn weg in nextDirection frei ist
      clearInterval(idRabbit);
      setDirectionRabbit(nextDirectionRabbit);
      nextDirectionRabbit = "";
    }
    //Wenn Hase links/rechts raus läuft auf der anderen seite wieder reinkommen
    if (posLeft === -10) {
      object.style["left"] = 370 + "px";
    } else if (posLeft === 370) {
      object.style["left"] = -10 + "px";
    }
    //check ob Aufgabe 1 gemacht wurde
    var taskCompleted = tasks.find((element: { id: number }) => {
      return element.id === 1;
    }).completed;
    if (taskCompleted === false) {
      setDirectionRabbit("");
      clearInterval(idRabbit);
    }
    //Ansatz für Performance optimierung - funktioniert noch nicht
    // var index: any = getRabbitIndex(object, directionRabbit);
    // if (wegFrei === true) {
    //   setNextDirection();
    // }
    // if (nextDirectionRabbit !== "") {
    //   directionChangeHandler(index, 1);
    // }

    // if (colissionDetection(directionRabbit, "wall", object, 1) === undefined) {
    //   if (directionRabbit === "left") {
    //     posLeft--;
    //     object.style["left"] = posLeft + "px";
    //   } else if (directionRabbit === "right") {
    //     posLeft++;
    //     object.style["left"] = posLeft + "px";
    //   } else if (directionRabbit === "up") {
    //     posTop--;
    //     object.style["top"] = posTop + "px";
    //   } else if (directionRabbit === "down") {
    //     posTop++;
    //     object.style["top"] = posTop + "px";
    //   }
    // }
  }

  function changedirectionWolf(wolfId: string) {
    var object: any;
    //überprüfen um welchen wolf es sich handelt und das jeweilige wolfobject dann in den Intervall übergeben
    if (wolfId === "wolf1") {
      object = changeDirectionStyle(wolfId, directionWolf1);
      idWolf1 = setInterval(movingWolf, 10, object, directionWolf1);
    } else if (wolfId === "wolf2") {
      object = changeDirectionStyle(wolfId, directionWolf2);
      idWolf2 = setInterval(movingWolf, 10, object, directionWolf2);
    }
  }

  function movingWolf(object: any, directionWolf: string) {
    var posLeft = object.offsetLeft;
    var posTop = object.offsetTop;
    var possibleDirections = [];
    //Bewegt sich um 1 Pixel je nach directionWolf
    if (directionWolf === "left") {
      posLeft--;
      object.style["left"] = posLeft + "px";
    } else if (directionWolf === "right") {
      posLeft++;
      object.style["left"] = posLeft + "px";
    } else if (directionWolf === "up") {
      posTop--;
      object.style["top"] = posTop + "px";
    } else if (directionWolf === "down") {
      posTop++;
      object.style["top"] = posTop + "px";
    }
    //Wenn es eine Kolission mit dem Hase gibt, dann alles stehen bleiben, Alert anzeigen und haseTot auf 1 setzen
    if (
      colissionDetection("left", "rabbit", object, 0) !== undefined ||
      colissionDetection("right", "rabbit", object, 0) !== undefined ||
      colissionDetection("up", "rabbit", object, 0) !== undefined ||
      colissionDetection("down", "rabbit", object, 0) !== undefined
    ) {
      clearInterval(idRabbit);
      clearInterval(idWolf1);
      clearInterval(idWolf2);
      if (swipeCount !== 0) {
        setShowAlert(true);
      }
      haseTot = 1;
    }

    //wenn der Weg zu den richtungen im Lot frei ist und wenn man auf eine wand prallt wird eine gewichteter array durch mehrfachnennungen erstellt
    if (directionWolf === "right" || directionWolf === "left") {
      if (colissionDetection(directionWolf, "wall", object, 1) !== undefined) {
        if (colissionDetection("up", "wall", object, 1) === undefined) {
          possibleDirections.push("up", "up", "up");
        }
        if (colissionDetection("down", "wall", object, 1) === undefined) {
          possibleDirections.push("down", "down", "down");
        }
        if (directionWolf === "left") {
          possibleDirections.push("right");
        } else if (directionWolf === "right") {
          possibleDirections.push("left");
        }
      } else {
        possibleDirections.push(directionWolf, directionWolf, directionWolf);
        if (colissionDetection("up", "wall", object, 1) === undefined) {
          possibleDirections.push("up");
        } else if (
          colissionDetection("down", "wall", object, 1) === undefined
        ) {
          possibleDirections.push("down");
        }
      }
    } else if (directionWolf === "down" || directionWolf === "up") {
      if (colissionDetection(directionWolf, "wall", object, 1) !== undefined) {
        if (colissionDetection("left", "wall", object, 1) === undefined) {
          possibleDirections.push("left", "left", "left");
        }
        if (colissionDetection("right", "wall", object, 1) === undefined) {
          var helpWall2: any = document.getElementsByClassName("wall")[57];
          if (
            helpWall2.offsetTop + helpWall2.offsetHeight + 1 === posTop &&
            posLeft === helpWall2.offsetLeft - helpWall2.offsetWidth + 1
          ) {
            //Wolf cant walk outside right side
          } else {
            possibleDirections.push("right", "right", "right");
          }
        }
        if (directionWolf === "up") {
          possibleDirections.push("down");
        } else if (directionWolf === "down") {
          possibleDirections.push("up");
        }
      } else {
        possibleDirections.push(directionWolf, directionWolf, directionWolf);
        if (colissionDetection("left", "wall", object, 1) === undefined) {
          var helpWall3: any = document.getElementsByClassName("wall")[49];
          if (
            helpWall3.offsetTop + helpWall3.offsetHeight + 1 === posTop &&
            posLeft === helpWall3.offsetLeft + helpWall3.offsetWidth + 1
          ) {
            //Wolf cant walk outside left side
            return;
          } else {
            possibleDirections.push("left");
          }
        } else if (
          colissionDetection("right", "wall", object, 1) === undefined
        ) {
          var helpWall: any = document.getElementsByClassName("wall")[49];
          if (
            helpWall.offsetTop + helpWall.offsetHeight + 1 === posTop &&
            posLeft === helpWall.offsetLeft + helpWall.offsetWidth + 1
          ) {
            //Wolf cant walk outside left side
            return;
          } else {
            possibleDirections.push("right");
          }
        }
      }
    }

    //zufällige auswahl aus zuvor erstelltem gewichteten array
    var selectedDirection = randomDirection(possibleDirections);
    if (selectedDirection === directionWolf) {
      return;
    } else {
      if (object.className === "wolf1") {
        clearInterval(idWolf1);
        setDirectionWolf1(selectedDirection);
      } else if (object.className === "wolf2") {
        clearInterval(idWolf2);
        setDirectionWolf2(selectedDirection);
      }
    }
  }

  //swipe direction event handler
  var xTouch: number | null = null;
  var yTouch: number | null = null;

  function getTouches(evt: any) {
    return evt.touches;
  }

  function handleTouchStart(evt: any) {
    const firstTouch = getTouches(evt)[0];
    xTouch = firstTouch.clientX;
    yTouch = firstTouch.clientY;
  }

  function handleTouchMove(evt: any) {
    if (!xTouch || !yTouch) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xTouch - xUp;
    var yDiff = yTouch - yUp;

    if (haseTot === 0) {
      //Workaround, da removeEventListener nicht funktioniert
      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          setDirectionRabbit("left");
          swipeCount++;
        } else {
          setDirectionRabbit("right");
          swipeCount++;
        }
      } else {
        if (yDiff > 0) {
          setDirectionRabbit("up");
          swipeCount++;
        } else {
          setDirectionRabbit("down");
          swipeCount++;
        }
      }
    } else {
      return;
    }
    //wird 1 mal beim 1. swipe ausgeführt
    if (swipeCount === 1) {
      setRefillInterval(7000);
      setDirectionWolf1("up");
      setDirectionWolf2("down");
    }
    xTouch = null;
    yTouch = null;
  }

  //fügt swipe eventhandler hinzu
  function addEventHandler() {
    testingArea.addEventListener("touchstart", handleTouchStart, false);
    testingArea.addEventListener("touchmove", handleTouchMove, false);
  }

  useEffect(() => {
    if (isMount) {
      //first Render
      testingArea = document.getElementById("field")!;
      addEventHandler();
    } else {
      //following Renders
    }
    // eslint-disable-next-line
  }, []);

  //Array der Karte
  const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 2, 2, 3, 1],
    [1, 2, 1, 3, 2, 2, 2, 2, 2, 1, 2, 1],
    [1, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1],
    [1, 2, 2, 2, 1, 2, 2, 3, 2, 1, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1],
    [2, 2, 1, 2, 2, 3, 1, 2, 3, 1, 2, 2],
    [1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1],
    [1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1],
    [1, 3, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1],
    [1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 1],
    [1, 2, 1, 2, 2, 2, 2, 1, 2, 1, 3, 1],
    [1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1],
    [1, 2, 1, 3, 1, 3, 1, 1, 2, 2, 2, 1],
    [1, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  //Mappen des Karten Arrays zu: 1= Wall, 2=Ground, 3=Egg
  const mapLong = map.map((arrays) =>
    arrays.map((number) =>
      number === 1
        ? "wall"
        : number === 2
        ? "ground"
        : number === 3
        ? "egg"
        : "nothing"
    )
  );

  //generiert divs für jedes Kartenelement
  const mapComponents = mapLong.map((row, key) => {
    return (
      <div key={key}>
        {row.map((element, key) => (
          <div className={element} key={key}></div>
        ))}
        <br />
      </div>
    );
  });

  //Resettet Rabbit auf die Anfangsposition und lässt ihn anhalten
  function resetRabbit() {
    var object: any = document.getElementsByClassName("rabbit")[0];
    setDirectionRabbit("");
    nextDirectionRabbit = "";
    setTimeout(() => {
      object.style["cssText"] = "";
    }, 15);
  }
  //Resettet Wolf1 auf die Anfangsposition und lässt ihn anhalten
  function resetWolf1() {
    var object: any = document.getElementsByClassName("wolf1")[0];

    setDirectionWolf1("");
    setTimeout(() => {
      object.style["cssText"] = "";
    }, 15);
  }
  //Resettet Wolf2 auf die Anfangsposition und lässt ihn anhalten
  function resetWolf2() {
    var object: any = document.getElementsByClassName("wolf2")[0];
    setDirectionWolf2("");
    setTimeout(() => {
      object.style["cssText"] = "";
    }, 15);
  }

  let location = useLocation();

  //Resettet alles auf den Anfangszustand
  function reset() {
    resetRabbit();
    resetWolf1();
    resetWolf2();
    points = 0;
    haseTot = 0;
    refillEggs(true);
    clearInterval(refillInterval);
    swipeCount = 0;
  }

  useEffect(() => {
    reset(); // eslint-disable-next-line
  }, [location]);

  //Eier werden im Intervall x nachgeneriert
  function setRefillInterval(x: number) {
    refillInterval = setInterval(() => {
      refillEggs(false);
    }, x);
  }

  function refillEggs(reset: boolean) {
    var eggs = document.getElementsByClassName("egg");
    var ground = document.getElementsByClassName("ground");
    //Stellt bei einem reset alle 9 Eier wieder her
    if (reset === false) {
      if (eggs.length < 9) {
        ground[Math.floor(Math.random() * ground.length)].className = "egg";
      }
    }//Generiert wenn weniger als 9 Eier auf dem Spielfeld sind ein neues
    else if (reset === true) {
      for (var i = eggs.length; i < 9; i++) {
        ground[Math.floor(Math.random() * ground.length)].className = "egg";
      }
    }
  }
  //Fügt Spielfiguren hinzu
  const addFigures = (
    <div>
      <img src="images/Hase.png" className="rabbit" alt="Hase" />
      <img src="images/Wolf.png" className="wolf1" alt="Wolf" />
      <img src="images/Wolf.png" className="wolf2" alt="Wolf" />
    </div>
  );

  //Ansatz für Performance optimierung - funktioniert noch nicht
  // function colissionRelevant(relevantWall: any) {
  //   var x: any = relevantWall[0];
  //   var y: any = relevantWall[1];
  //   if (map[y][x] === 1) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // function getRelevantIndex(rabbitIndex: any, moveDirection: string) {
  //   var x: any = rabbitIndex[0];
  //   var y: any = rabbitIndex[1];
  //   if (moveDirection === "right") {
  //     return [x + 1, y];
  //   } else if (moveDirection === "left") {
  //     return [x - 1, y];
  //   } else if (moveDirection === "down") {
  //     return [x, y + 1];
  //   } else if (moveDirection === "up") {
  //     return [x, y - 1];
  //   }
  // }

  // function colissionDetectionNew(
  //   colissionObject: any,
  //   colissionObject2: any,
  //   moveDirection: any,
  //   error: number
  // ) {
  //   //console.log((colissionObject2.offsetLeft - error))
  //   //console.log((colissionObject.offsetLeft + colissionObject.getBoundingClientRect().width))
  //   if (moveDirection === "right") {
  //     if (
  //       colissionObject.offsetLeft - error ===
  //       colissionObject2.offsetLeft +
  //         colissionObject2.getBoundingClientRect().width
  //     ) {
  //       return colissionObject;
  //     }
  //   } else if (moveDirection === "left") {
  //     if (
  //       colissionObject.offsetLeft +
  //         colissionObject.getBoundingClientRect().width +
  //         error ===
  //       colissionObject2.offsetLeft
  //     ) {
  //       return colissionObject;
  //     }
  //   } else if (moveDirection === "down") {
  //     if (
  //       colissionObject.offsetTop - error ===
  //       colissionObject2.offsetTop +
  //         colissionObject2.getBoundingClientRect().height
  //     ) {
  //       return colissionObject;
  //     }
  //   } else if (moveDirection === "up") {
  //     if (
  //       colissionObject.offsetTop +
  //         colissionObject.getBoundingClientRect().height +
  //         error ===
  //       colissionObject2.offsetTop
  //     ) {
  //       return colissionObject;
  //     }
  //   }
  // }

  // function isNewBlock(index: any) {
  //   var currentX = index[0];
  //   var currentY = index[1];
  //   var rtn: any;

  //   //Wenn neuer Block
  //   if (currentX !== lastRabbitIndexX || currentY !== lastRabbitIndexY) {
  //     rtn = true;
  //   } else {
  //     rtn = false;
  //   }
  //   lastRabbitIndexX = index[0];
  //   lastRabbitIndexY = index[1];

  //   return rtn;
  // }

  // function isWalkable(x: any, y: any) {
  //   if (map[y][x] !== 1) {
  //     return true;
  //   }
  // }

  // function setNextDirection() {
  //   clearInterval(idRabbit);
  //   setDirectionRabbit(nextDirectionRabbit);
  //   nextDirectionRabbit = "";
  //   wegFrei = false;
  // }

  // function directionChangeHandler(index: any, error: any) {
  //   var currentX = index[0];
  //   var currentY = index[1];

  //   if (isNewBlock(index)) {
  //     var test: any = document.getElementsByClassName("rabbit")[0];

  //     if (
  //       nextDirectionRabbit === "right" &&
  //       colissionDetection(nextDirectionRabbit, "", test, error) === undefined
  //       //isWalkable(currentX - 1, currentY)
  //     ) {
  //       wegFrei = true;
  //     } else if (
  //       nextDirectionRabbit === "left" &&
  //       colissionDetection(nextDirectionRabbit, "", test, error) === undefined
  //       //isWalkable(currentX - 1, currentY)
  //     ) {

  //       wegFrei = true;
  //     } else if (
  //       nextDirectionRabbit === "down" &&
  //       colissionDetection(nextDirectionRabbit, "", test, error) === undefined
  //       //isWalkable(currentX, currentY + 1)
  //     ) {

  //       wegFrei = true;
  //     } else if (
  //       nextDirectionRabbit === "up" &&
  //       colissionDetection(nextDirectionRabbit, "", test, error) === undefined
  //       //isWalkable(currentX, currentY - 1)
  //     ) {

  //       wegFrei = true;
  //     }
  //   }
  // }
  
  //Funktion zur erkennung, wo sich der Hase aktuell im Map-Raster befindet
  function getRabbitIndex(colissionObjects: any) {
    var haseX = colissionObjects.offsetLeft;
    var haseY = colissionObjects.offsetTop;
    var haseX2 = haseX + colissionObjects.getBoundingClientRect().width;
    var haseY2 = colissionObjects.getBoundingClientRect().height;

    var fieldHeight: number = document
      .getElementById("field")!
      ?.getBoundingClientRect().height;
    var fieldWidth: number = document
      .getElementById("field")!
      ?.getBoundingClientRect().width;
    var blockHeight = document
      .getElementsByClassName("wall")[0]
      .getBoundingClientRect().height;
    var blockWidth = document
      .getElementsByClassName("wall")[0]
      .getBoundingClientRect().width;
    //Iteriert durch höhe
    for (var i = blockHeight; i < fieldHeight; i = i + blockHeight) {
      mapIndexCounterY++;
      mapIndexCounterX = 0;
      //Iteriert durch Breite
      for (var j = blockWidth; j < fieldWidth; j = j + blockWidth) {
        mapIndexCounterX++;
        //Wenn position des Hasen übereinstimmt mit position im Raster
        if (haseX < j && haseY < i && haseX2 < j && haseY2 < i) {
          var tempX = mapIndexCounterX - 1;
          var tempY = mapIndexCounterY - 1;
          mapIndexCounterX = 0;
          mapIndexCounterY = 0;
          return [tempX, tempY];
        }
      }
    }
  }

  //colissionObjects are Walls, Eggs and Wolfs; colissionObject2 is Rabbit or Wolf
  function colissionDetection(
    moveDirection: string,
    colissionObjects: string,
    colissionObject2: any,
    error: number
  ) {
    try {
      var index: any = getRabbitIndex(colissionObject2);
      var relevantMapIndex = [];
      var x = index[0] - 1;
      var y = index[1] - 1;
      //Creates Array with walls surrounding the rabbit
      if (colissionObjects === "wall") {
        for (var i = y; i <= y + 2; i++) {
          for (var j = x; j <= x + 2; j++) {
            if (map[i][j] === 1) {
              relevantMapIndex.push([i, j]);
            }
          }
        }
      }

      var object: any;
      var amountIterations: number = 0;
      //Defines amount colission detection has to iterate
      if (colissionObjects === "wall") {
        amountIterations = relevantMapIndex.length;
      } else {
        object = document.getElementsByClassName(colissionObjects);
        amountIterations = object.length;
      }
      for (var k = 0; k < amountIterations; k++) {
        var object1: any;
        if (colissionObjects === "wall") {
          var test = relevantMapIndex[k];
          object1 = document.getElementById("field")!.children[test[0]]
            .children[test[1]];
        } else {
          object1 = object[k];
        }

        var object2: any = colissionObject2;
        //filters walls that the object possibly could collide with
        if (
          (moveDirection === "left" || moveDirection === "right") &&
          object1.offsetTop <=
            object2.offsetTop + object2.getBoundingClientRect().height &&
          (object1.offsetTop >= object2.offsetTop ||
            object1.offsetTop + object1.getBoundingClientRect().height >=
              object2.offsetTop)
        ) {
          //checks the actual colission
          if (moveDirection === "left") {
            if (
              object1.offsetLeft +
                object1.getBoundingClientRect().width +
                error ===
              object2.offsetLeft
            ) {
              return object1;
            }
          } else if (moveDirection === "right") {
            if (
              object1.offsetLeft - error ===
              object2.offsetLeft + object2.getBoundingClientRect().width
            ) {
              return object1;
            }
          }
        }//filters walls that the object possibly could collide with
         else if (
          (moveDirection === "up" || moveDirection === "down") &&
          object1.offsetLeft <=
            object2.offsetLeft + object2.getBoundingClientRect().width &&
          (object1.offsetLeft >= object2.offsetLeft ||
            object1.offsetLeft + object1.getBoundingClientRect().width >=
              object2.offsetLeft)
        ) {
          //checks the actual colission
          if (moveDirection === "up") {
            if (
              object1.offsetTop +
                object1.getBoundingClientRect().height +
                error ===
              object2.offsetTop
            ) {
              return object1;
            }
          } else if (moveDirection === "down") {
            if (
              object1.offsetTop - error ===
              object2.offsetTop + object2.getBoundingClientRect().height
            ) {
              return object1;
            }
          }
        }
      }
    } catch (e) {}
    //Ansatz für Performance optimierung - funktioniert noch nicht
    // var indexRelevant: any = getRelevantIndex(index, moveDirection);
    // var isWall: any = colissionRelevant(indexRelevant);
    // var notRabbitObject: any = document.getElementById("field")!.children[
    //   indexRelevant[1]
    // ].children[indexRelevant[0]];

    // if (colissionObject2.className === "rabbit") {
    // }

    // if (isWall) {
    //   return colissionDetectionNew(
    //     notRabbitObject,
    //     colissionObject2,
    //     moveDirection,
    //     error
    //   );
    // }

    // var object = document.getElementsByClassName(colissionObjects);
    // for (let i = 0; i < object.length; i++) {
    //var object1: any = object[i];
    //console.log("wall: " + test);
  }



  return (
    <>
      <IonPage>
        <IonHeader id="header">
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton auto-hide="false" id="main-menu"></IonMenuButton>
            </IonButtons>
            <IonTitle>Testumgebung</IonTitle>
            <IonButtons slot="end">
              <IonButton
                onClick={() => {
                  reset();
                }}
              >
                <IonIcon icon={refreshOutline} id="refresh"></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <div id="screen">
          <div id="field">
            {mapComponents}
            {addFigures}
            <img src="images/Hedge.png" className="hedge" alt="hedge" />
            <div id="points" style={{ color: "white" }}>
              Eier: {points}
            </div>
          </div>
        </div>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={"Game Over!"}
          message={
            "Super! Du hast " +
            points +
            (points === 1 ? " Ei" : " Eier") +
            " gesammelt."
          }
          buttons={[
            {
              text: "Neustart",
              handler: () => {
                reset();
              },
            },
            {
              text: "OK",
            },
          ]}
        ></IonAlert>
      </IonPage>
    </>
  );
};

export default Testing;
