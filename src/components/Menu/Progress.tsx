import React from "react";


const Progress: React.FC = () => {


  return (
    <div className="progressDiv">
      <div className="progressTitle">
        <label>Fortschritt</label>
      </div>
      <div className="emptyProgressBar">
        <div
          className="progressBar"
        >
        </div>
      </div>
    </div>
  );
};

export default Progress;
