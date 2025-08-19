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
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <h1 className="text-4xl font-bold text-blue-600 mb-6">Guestbook</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6 w-full max-w-md">
                <input
                    className="mb-4 w-full px-3 py-2 border rounded"
                    name="name"
                    onChange={handleChange}
                    placeholder="Your name"
                    value={form.name}
                />
                <textarea
                    className="mb-4 w-full px-3 py-2 border rounded h-24"
                    name="message"
                    onChange={handleChange}
                    placeholder="Your message"
                    value={form.message}
                />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    type="submit"
                >
                    Sign
                </button>
            </form>
            <ul className="w-full max-w-md space-y-4">
                {messages.map(msg => (
                    <li
                        className="bg-white p-4 rounded shadow"
                        key={msg.id}
                    >
                        <p className="text-gray-800"><strong>{msg.name}</strong></p>
                        <p className="text-gray-600">{msg.message}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;