// src/pages/Login.js
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContecxt';

const Login = () => {
          const { login } = useContext(AuthContext);
          const [username, setUsername] = useState('');
          const [password, setPassword] = useState('');

          const handleSubmit = async (e) => {
                    e.preventDefault();
                    await login(username, password);
          };

          return (
                    <div className="container mx-auto justify-center">
                              <h1 className="text-2xl items-center">Login</h1>
                              <form onSubmit={handleSubmit}>
                                        <input
                                                  type="text"
                                                  placeholder="Username"
                                                  value={username}
                                                  onChange={(e) => setUsername(e.target.value)}
                                                  className="border p-2 mb-2 w-full"
                                        />
                                        <input
                                                  type="password"
                                                  placeholder="Password"
                                                  value={password}
                                                  onChange={(e) => setPassword(e.target.value)}
                                                  className="border p-2 mb-2 w-full"
                                        />
                                        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Login</button>
                              </form>
                    </div>
          );
};

export default Login;
