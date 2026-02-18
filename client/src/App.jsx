import React from "react";
import LeftBar from "./components/leftBar/leftBar";
import TopBar from "./components/topBar/TopBar";
import Gallery from "./components/gallery/Gallery";
import "./App.css";
const App = () => {
  return (
    <div className="app">
      <LeftBar />
      <div className="content">
        <TopBar />
        <Gallery />
      </div>
    </div>
  );
};

export default App;
