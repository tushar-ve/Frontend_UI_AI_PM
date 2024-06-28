// src/pages/Register.js
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContecxt';

const Register = () => {
          const { register } = useContext(AuthContext);
          const [username, setUsername] = useState('');
          const [email, setEmail] = useState('');
          const [password, setPassword] = useState('');

          const handleSubmit = async (e) => {
                    e.preventDefault();
                    await register(username, email, password);
          };

          return (
                    <div className="container mx-auto">
                              <h1 className="text-2xl">Register</h1>
                              <form onSubmit={handleSubmit}>
                                        <input
                                                  type="text"
                                                  placeholder="Username"
                                                  value={username}
                                                  onChange={(e) => setUsername(e.target.value)}
                                                  className="border p-2 mb-2 w-full"
                                        />
                                        <input
                                                  type="email"
                                                  placeholder="Email"
                                                  value={email}
                                                  onChange={(e) => setEmail(e.target.value)}
                                                  className="border p-2 mb-2 w-full"
                                        />
                                        <input
                                                  type="password"
                                                  placeholder="Password"
                                                  value={password}
                                                  onChange={(e) => setPassword(e.target.value)}
                                                  className="border p-2 mb-2 w-full"
                                        />
                                        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Register</button>
                              </form>
                    </div>
          );
};

export default Register;
