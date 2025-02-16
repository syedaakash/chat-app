"use client";

import {useState, useEffect} from "react";
import useWebSocket from "@/hooks/useWebSocket";

const Chat = () => {
    const {messages, sendMessage} = useWebSocket("ws://localhost:8000/ws/chat/")
    const [input, setInput] = useState("")

    useEffect(() => {
        console.log("xxxxxxxxxxxxxxxxxxx")
        console.log("messages")
        console.log(messages)
    }, [messages]);

    return (
        <div className="flex flex-col items-center p-4 w-full max-w-md mx-auto">
            <div className="w-full p-4 bg-white shadow rounded-lg h-80 overflow-auto">
                {messages.map((msg, index) => (
                    <div key={index} className="p-2 bg-gray-200 rounded mb-2">
                        {msg}
                    </div>
                ))}
            </div>
            <div className="flex w-full mt-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 p-2 border rounded"
                />
                <button
                    onClick={() => {
                        sendMessage(input);
                        setInput("");
                    }}
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default Chat;