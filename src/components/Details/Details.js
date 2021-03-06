/* importing the required material UI of the Buttons, chats, people, and Clear. 
Importing the react module and database from firebase and styles that we have described in styles file  
*/
import { Button } from "@material-ui/core";
import { Chat, Clear, People } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import "./styles.css";

/*initializing the details of the participants in the room.
*/
  const Details = ({ participants, participant, roomName }) => {
  const totalParticipants = participants?.length + 1;

  console.log(participant.identity);
  /*initializing the message , and setmessage parameters for it to receive and send messages to the participants.
  and the message are getting stored in the database .
  */
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    db.collection(roomName).add({
      sender: participant.identity,
      message,
    });
  };

  useEffect(() => {
    db.collection(roomName).onSnapshot((snapshot) => {
      setMessages(snapshot.docs.map((item) => item.data()));
    });
  }, [roomName]);

  return (
    <div className="details">
      <div className="details_header">
        <h1>Meeting Details</h1>
        <Clear />
      </div>

      <div className="details_tabs">
        <div className="details_activebar"></div>
        <div className="details_tab ">
          <People />
          <p>Participants ({totalParticipants})</p>
        </div>

        <div className="details_tab details_tab--active">
          <Chat />
          <p>Chats</p>
        </div>
      </div>
      {messages.map((item) => (
        <p
          style={{
            textAlign: item.sender !== participant.identity && "end",
            margin: "14px 0",
            color: "white",
          }}
        >
          {item.sender} : { item.message}
        </p>
      ))}

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message"
        variant="outlined"
       
      />
      <Button onClick={sendMessage} variant="contained" color="primary">
        Send
      </Button>
    </div>
  );
};

export default Details;
