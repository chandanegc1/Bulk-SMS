import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import "./global.css";
import RegistrationPage from "./pages/RegistrationPage";
import TamplatePage from "./pages/TemplatePage";
import CSVReaderPage from "./pages/CSVReaderPage";
import AuthComponent from "./components/AuthComponent";
import LogOut from "./components/LogOut"; 

const App = () => {
  const [local, setLocal] = useState(false)
  useEffect(()=>{
    setLocal(localStorage.getItem("credential"));
  })
  return (
    <BrowserRouter>
      {local && <LogOut />}
      <Routes>
        <Route
          path="/"
          element={
            <AuthComponent Component={local  ? CSVReaderPage : LoginPage} />
          }
        />
        <Route
          path="/register"
          element={<RegistrationPage />}
        />
        <Route
          path="/template"
          element={<AuthComponent Component={TamplatePage} />}
        />
        <Route
          path="/file-upload"
          element={<AuthComponent Component={CSVReaderPage} />}
        />
        <Route
          path="/login" 
          element={ <LoginPage/>}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
