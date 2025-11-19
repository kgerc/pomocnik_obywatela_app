import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { AppProvider } from "./contexts/AppContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
//import LoginPage from "./pages/LoginPage";
//import RegisterPage from "./pages/RegisterPage";
import MainApp from "./pages/MainApp";

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* <Route path="/login" element={<LoginPage />} /> */}
            {/* <Route path="/register" element={<RegisterPage />} /> */}
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <MainApp />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}