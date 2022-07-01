import { Routes, Route } from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage";
import { checkLoginParams } from "./pages/slice/sliceUsers";
import { useSelector } from "react-redux";
import ProtectedHomePage from "./pages/ProtectedPages/HomePage";
import TrashPage from "./pages/ProtectedPages/TrashPage";

function App() {
  const stateCheckLoginSelector = useSelector(checkLoginParams);
  return (
    <Routes>
      <Route path="*" element={<></>} />
      <Route
        path="/"
        element={stateCheckLoginSelector ? <ProtectedHomePage /> : <HomePage />}
      />
      <Route path="/trash" element={<TrashPage />} />
    </Routes>
  );
}

export default App;
