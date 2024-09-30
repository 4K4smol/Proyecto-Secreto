// src/App.jsx
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import About from './pages/About';
import Contact from './pages/Contact';
import SearchResults from './pages/SearchResults';
import NotFound from './pages/NotFound';

const RootRedirect = () => {
  const { token } = useAuth();
  return token ? <Navigate to="/home" /> : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<div className="loading-spinner">Cargando...</div>}>
          <Routes>
            {/* Ruta raíz con redirección condicional */}
            <Route path="/" element={<RootRedirect />} />

            {/* Rutas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rutas protegidas */}
            <Route element={<PrivateRoute />}>
              <Route element={<MainLayout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/perfil/:id" element={<ProfilePage />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/search" element={<SearchResults />} />
              </Route>
            </Route>

            {/* Ruta 404 global */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
};

export default App;
