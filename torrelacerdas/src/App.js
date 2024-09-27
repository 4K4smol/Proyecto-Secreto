import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InfluencerList from "./components/InfluencerList";
import Profile from "./components/Profile";
import { AuthProvider } from "./AuthContext"; 
import Register from "./Register"; 
import Login from "./Login"; 
import PrivateRoute from "./components/PrivateRoute"; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} /> {/* La ruta predeterminada ahora es la página de inicio de sesión */}
          <Route path="/register" element={<Register />} /> {/* Ruta para el registro */}
          
          {/* Rutas protegidas por PrivateRoute */}
          <Route
            path="/influencers"
            element={
              <PrivateRoute>
                <InfluencerList />
              </PrivateRoute>
            }
          />
          <Route
            path="/perfil/:id"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
