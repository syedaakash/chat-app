import {useRef, useState, useEffect} from "react";
import {error} from "next/dist/build/output/log";

const useWebSocket = (url: string) => {
    const [messages, setMessages] = useState<string[]>([])
    const ws = useRef<WebSocket | null>(null)

    useEffect(() => {
        ws.current = new WebSocket(url)
        ws.current.onopen = () => console.log('WebSocket connected.')
        ws.current.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data)
                setMessages((prev) => [...prev, data.message] )
            } catch (error) {
                console.log("Error parsing message:", error)
            }
        }

        ws.current.onclose = () => console.log("WebSocket closed.");
        ws.current.onerror = (error) => console.log("WebSocket error:", error)

        return () => {
            if (ws.current) {
                ws.current?.close()
            }
        }
    }, [url]);

    const sendMessage = (message: string) => {
        if (ws.current && ws.current?.readyState === WebSocket.OPEN) {
            ws.current?.send(JSON.stringify({message}))
        } else {
            console.log("Cannot send message WebSocket is closed.")
        }
    }

    return { messages, sendMessage }
}

export default useWebSocket;