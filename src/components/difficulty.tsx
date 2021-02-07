import React, { useContext, useEffect, useState } from "react";
import { TasksContext } from "../logic/TasksContext";

const Difficulty: React.FC <{id: number}> = (props) => {

  const [tasks] = useContext(TasksContext);
  const [currentTask, setCurrentTask] = useState(tasks.find((element: { id: number}) => {
    return element.id === props.id
  }))

  useEffect(()=>{
    setCurrentTask(tasks.find((element: { id: number}) => {
      return element.id === props.id
    }))// eslint-disable-next-line
  },[tasks])

    function createCanvas() {
        var c: any = document.getElementsByClassName(currentTask.difficulty)[0];
          var ctx = c!.getContext("2d");
          ctx.beginPath();
          ctx.strokeStyle = "#ffffff";
          ctx.arc(14, 17, 12, 0, 2 * Math.PI);
          if(currentTask.difficulty === "easy"){
            ctx.fillStyle = "#00ff00";
            ctx.strokeStyle = "#00ff00";
          }else if(currentTask.difficulty === "medium"){
            ctx.fillStyle = "#ff8800";
            ctx.strokeStyle = "#ff8800";
          }else if(currentTask.difficulty === "hard"){
            ctx.fillStyle = "#ff0000";
            ctx.strokeStyle = "#ff0000";
          }
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.stroke();
          //draw tick
          if(currentTask.completed === true){
            ctx.beginPath();
            ctx.moveTo(5,17);
            ctx.lineTo(14,24);
            ctx.lineTo(22,9);
            ctx.lineWidth = 4;
            ctx.strokeStyle = '#fff';
            ctx.stroke();    
          }
          
      }
      useEffect(()=>{
        createCanvas()
      })

  return (
    <>
    <canvas className={currentTask.difficulty} width="30" height="30" style={{position: "absolute", right: "15px", bottom: "10px"}}/>
    </>
  );
};

export default Difficulty;