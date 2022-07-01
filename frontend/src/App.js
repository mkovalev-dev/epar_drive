import { Routes, Route } from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage";
import { checkLoginParams } from "./pages/slice/sliceUsers";
import { useSelector } from "react-redux";
import ProtectedHomePage from "./pages/ProtectedPages/HomePage";

function App() {
  const stateVisibleModalChangeFolderSelector = useSelector(checkLoginParams);
  return (
    <Routes>
      <Route path="*" element={<></>} />
      <Route
        path="/"
        element={
          stateVisibleModalChangeFolderSelector ? (
            <ProtectedHomePage />
          ) : (
            <HomePage />
          )
        }
      />
    </Routes>
  );
}

export default App;
