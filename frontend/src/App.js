import { Routes, Route } from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage";
import { checkLoginParams } from "./pages/slice/sliceUsers";
import { useSelector } from "react-redux";
import ProtectedHomePage from "./pages/ProtectedPages/HomePage";
import TrashPage from "./pages/ProtectedPages/TrashPage";
import FolderPage from "./pages/ProtectedPages/FolderPage";
import ViewSheet from "./components/FolderComponents/ViewSheet";

function App() {
  const stateCheckLoginSelector = useSelector(checkLoginParams);
  return (
    <Routes>
      <Route path="*" element={<></>} />
      <Route
        path="/"
        element={stateCheckLoginSelector ? <ProtectedHomePage /> : <HomePage />}
      />
      <Route path="/folder/:id" element={<FolderPage />} />
      <Route path="/trash" element={<TrashPage />} />
      <Route path="/xlsx/viewer/:id" element={<ViewSheet />} />
    </Routes>
  );
}

export default App;
