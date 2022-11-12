import { useEffect } from "react";
import { Routes, Route } from "react-router-dom"
import { Home } from "./components/Home";
import { Panel } from "./components/Panel";
import { PanelProvider } from "./contexts/PanelContext";
import {  AssignName } from "./services/getNames";


function App() {

  useEffect(() => {
    localStorage.setItem("username", AssignName())
  })

  return (
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route
      path="/panel/:hexValue"
      element={
          <PanelProvider>
            <Panel />
          </PanelProvider>
   
      }
    />
  </Routes>
  );
}

export default App;
