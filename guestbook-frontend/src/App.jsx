import './App.css'
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
    axios.get('http://localhost:8000/api/messages/')
        .then(res => setMessages(res.data))
        .catch(err => console.error(err));
    }, []);

    return (
    <div>
        <h1>Guestbook</h1>
        <ul>
        {messages.map(msg => (
            <li key={msg.id}>
            <strong>{msg.name}</strong>: {msg.message}
            </li>
        ))}
        </ul>
    </div>
    );
}

export default App