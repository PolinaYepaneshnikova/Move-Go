import React from "react";
import "./homePage.scss";

export default function HomePage() {
  return (
    <div className="homePage">
      <div className="homePage-body">
        <h1 className="homePage-title">{"Move&GO"}</h1>
        <div className="homePage-btn">
          <a
            className="homePage-link animated-button btn-sm"
            href="#"
          >
            <span className="homePage-text">Log in</span>
          </a>
          <a
            className="homePage-link"
            href="#"
          >
            <span className="homePage-text">Registration</span>
          </a>
        </div>
      </div>
    </div>
  );
}
