// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  // Estado de autenticación
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token') || null,
    username: localStorage.getItem('username') || null,
  });

  // Efecto para sincronizar el estado con localStorage
  useEffect(() => {
    if (auth.token) {
      localStorage.setItem('token', auth.token);
      localStorage.setItem('username', auth.username);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    }
  }, [auth]);

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      // Actualizar el estado de autenticación
      setAuth({
        token: data.token,
        username: data.username,
      });

      return true; // Indica que el inicio de sesión fue exitoso
    } catch (error) {
      throw error;
    }
  };

  // Función para registrar un nuevo usuario
  const register = async (username, email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al registrar el usuario');
      }

      // Actualizar el estado de autenticación
      setAuth({
        token: data.token,
        username: data.username,
      });

      return true; // Indica que el registro fue exitoso
    } catch (error) {
      throw error;
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setAuth({ token: null, username: null });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  return useContext(AuthContext);
};
