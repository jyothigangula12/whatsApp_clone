import React, { useState } from "react";
import "./ChatComponent.css";
import { Avatar, IconButton } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SendIcon from "@material-ui/icons/Send";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import MicIcon from "@material-ui/icons/Mic";
import axios from "./axios";
function ChatComponent({ messages }) {
	const [input, setInput] = useState("");

	const addMessage = async (e) => {
		e.preventDefault();
		await axios
			.post("/api/messages/new", {
				message: input,
				name: "Demo App",
				timestamp: "frontend",
				recieved: false,
			})
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
		setInput("");
	};

	return (
		<div className="chat">
			<div className="chat_header">
				<Avatar />
				<div className="chat_headerInfo">
					<h3>name</h3>
					<p>message</p>
				</div>
				<div className="chat_headerRight">
					<IconButton>
						<SearchOutlined />
					</IconButton>
					<IconButton>
						<AttachFileIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</div>
			</div>
			<div className="chat_body">
				{messages.map((message) => (
					<p
						className={`chat_msgs ${
							message.recieved && "chat_reciever"
						}`}
					>
						<span className="chat_name">{message.name} </span>
						{message.message}
						<span className="chat_timestamp">
							{message.timestamp}
						</span>
					</p>
				))}
			</div>
			<div className="chat_bottom">
				<IconButton>
					<SentimentSatisfiedIcon />
				</IconButton>
				<form>
					<input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="Type a message"
						type="text"
					/>
					<IconButton onClick={addMessage}>
						<SendIcon />
					</IconButton>
					<IconButton>
						<MicIcon />
					</IconButton>
				</form>
			</div>
		</div>
	);
}
/* for reciever
/*		<p className="chat_msgs chat_reciever">
					<span className="chat_name">some </span>
					chat msgs
					<span className="chat_timestamp">
						{new Date().toUTCString()}
					</span>
				</p>*/
//just change the color */
export default ChatComponent;
