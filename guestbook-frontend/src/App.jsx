import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
    const [form, setForm] = useState({name: "", message: ""});
    const [messages, setMessages] = useState([]);

    const fetchMessages = () => {
        axios.get("http://localhost:8000/messages/")
            .then(res => setMessages(res.data));
    }

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleChange = e => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios.post("http://localhost:8000/messages/", form)
            .then(() => {
                setForm({name: "", message: ""});
                fetchMessages();
            });
    };

    return (
        <div>
            <h1>Guestbook</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    onChange={handleChange}
                    placeholder="Your name"
                    value={form.name}
                />
                <textarea
                    name="message"
                    onChange={handleChange}
                    placeholder="Your message"
                    value={form.message}
                />
                <button type="submit">Sign</button>
            </form>
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

export default App;