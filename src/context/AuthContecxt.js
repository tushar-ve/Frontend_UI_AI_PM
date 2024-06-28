// src/context/AuthContext.js
import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
          const [user, setUser] = useState(null);

          const login = async (username, password) => {
                    const response = await fetch('/api/login/', {
                              method: 'POST',
                              headers: {
                                        'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({ username, password }),
                    });
                    const data = await response.json();
                    setUser(data.user);
                    localStorage.setItem('token', data.access);
          };

          const register = async (username, email, password) => {
                    await fetch('/api/register/', {
                              method: 'POST',
                              headers: {
                                        'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({ username, email, password }),
                    });
          };

          return (
                    <AuthContext.Provider value={{ user, login, register }}>
                              {children}
                    </AuthContext.Provider>
          );
};

export { AuthContext, AuthProvider };
