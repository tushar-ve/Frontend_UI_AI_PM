
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContecxt';

const Chat = () => {
          const { user } = useContext(AuthContext);
          const [message, setMessage] = useState('');
          const [chatHistory, setChatHistory] = useState([]);

          const handleSubmit = async (e) => {
                    e.preventDefault();
                    const response = await fetch('/api/chat/', {
                              method: 'POST',
                              headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                              },
                              body: JSON.stringify({ message }),
                    });
                    const data = await response.json();
                    setChatHistory([...chatHistory, { user: 'You', message }, { user: 'Bot', message: data.response }]);
                    setMessage('');
          };

          return (
                    <div className="container mx-auto">
                              <h1 className="text-2xl">Chat</h1>
                              <div className="chat-history border p-4 mb-4 h-64 overflow-y-scroll">
                                        {chatHistory.map((chat, index) => (
                                                  <div key={index} className={`p-2 ${chat.user === 'You' ? 'text-right' : ''}`}>
                                                            <strong>{chat.user}: </strong>{chat.message}
                                                  </div>
                                        ))}
                              </div>
                              <form onSubmit={handleSubmit}>
                                        <input
                                                  type="text"
                                                  placeholder="Type a message"
                                                  value={message}
                                                  onChange={(e) => setMessage(e.target.value)}
                                                  className="border p-2 mb-2 w-full"
                                        />
                                        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Send</button>
                              </form>
                    </div>
          );
};

export default Chat;
