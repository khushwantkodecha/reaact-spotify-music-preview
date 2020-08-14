import React from "react";
import "../css/BottomHeader.css";
export default function BottomHeader() {
  return (
    <div className="navbar fixed-bottom navbar-light btm">
      <p id="botm" style={{ fontFamily: "Alegreya Sans SC",color: "white" }}>
        Made with <i style={{ color: "red", fontSize: 20 }}>&hearts;</i> for music lovers!
      </p>
    </div>
  );
}
