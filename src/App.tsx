import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Summary from "./pages/Summary";
import Employee from "./pages/Employee";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/employee/list" />} />
        <Route path="/employee">
          <Route path="list" element={<Summary />} />
          <Route path="add" element={<Employee />} />
          <Route path="edit/:id" element={<Employee />} />
          <Route path="*" element={<Navigate to="/employee/list" />} />
        </Route>
        <Route path="*" element={<Navigate to="/employee/list" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
