import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const randomBotResponses = [
  'goto du Ponx',
  'viva Ponz Duvalier',
  'ponx ponx',
  'ave Ponce Imperator',
  'poncoium pancoiem'
];

function App() {
  const [messages, setMessages] = useState([]);
  const [userWroteEuTamen, setUserWroteEuTamen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const userMessage = e.target.message.value;
    if (userMessage !== '') {
      const newMessage = { id: messages.length + 1, user: true, text: userMessage };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      e.target.reset();

      if (userMessage.toLowerCase() === 'ave gabe') {
        const botResponse = { id: messages.length + 2, user: false, text: 'AVE GABE!' };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      } else {
        setUserWroteEuTamen(false);
        const botResponseDelay = Math.random() * 1500 + 500;
        setTimeout(() => {
          const randomIndex = Math.floor(Math.random() * randomBotResponses.length);
          const botResponse = { id: messages.length + 2, user: false, text: randomBotResponses[randomIndex] };
          setMessages((prevMessages) => [...prevMessages, botResponse]);
        }, botResponseDelay);
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <h1 className="text-center mt-4 mb-3">PonChat</h1>
          <div className="chat-container" style={{ marginBottom: '80px' }}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message-container ${message.user ? 'user' : 'bot'}`}
              >
                <div className={`message ${message.user ? 'rounded bg-info text-white m-2 p-1' : 'rounded bg-secondary text-white m-2 p-1'}`} style={{ textAlign: message.user ? 'left' : 'right' }}>
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={inputRef}></div> {}
          </div>
          <form onSubmit={handleSendMessage} className="fixed-bottom mb-4">
            <div className="input-group">
              <input type="text" name="message" className="form-control" placeholder="Escreva caralhadas" />
              <button type="submit" className="btn btn-primary">Enviasom</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
