import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import ChatComponent from "./ChatComponent";
import Pusher from "pusher-js";
import axios from "./axios";

function App() {
	const [messages, setMessages] = useState([]);
	useEffect(() => {
		axios
			.get("/api/messages/sync")
			.then((response) => {
				setMessages(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	useEffect(() => {
		const pusher = new Pusher("a1ac225d4a6e8eb27255", {
			cluster: "eu",
		});

		const channel = pusher.subscribe("messages");
		channel.bind("inserted", (newMessage) => {
			setMessages([...messages, newMessage]);
		});
		return () => {
			channel.unbind_all();
			channel.unsubscribe();
		};
	}, [messages]);
	console.log(messages);
	return (
		<div className="app">
			<div className="app_body">
				<Sidebar />
				<ChatComponent messages={messages} />
			</div>
		</div>
	);
}

export default App;
