import React, { useState, useCallback, useEffect } from "react";
import Video from "twilio-video";
import Room from "./Room";
import { Header, Hero } from "./components";
import { v4 as uuidv4 } from "uuid";
import { useAppContext } from "./context/appContext";
import { CircularProgress } from "@material-ui/core";

const VideoChat = () => {
  const [roomName, setRoomName] = useState(uuidv4());
  const [room, setRoom] = useState(null);
  const [username, setUsername] = useState("");

  const { currentUser, connecting, setConnecting } = useAppContext();

  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.email);
    }
  }, [currentUser]);
  
const handleSubmit = useCallback(async () => {
    setConnecting(true);

    const data = await fetch("/video/token", {
      method: "POST",
      body: JSON.stringify({
        identity: username,
        room: roomName,
      }),
      header: {
        "Content-Type": "application/json",
      },
    }).then(resp => resp.text()).then(console.log);

    const AccessToken = require('twilio').jwt.AccessToken;
    const VideoGrant = AccessToken.VideoGrant;
    
    // Used when generating any kind of tokens
    // To set up environmental variables, see http://twil.io/secure
    const twilioAccountSid = "AC01cad4bb88b2ded5e1019e69268e8503";
    const twilioApiKey = "SK57c6c1d280f5439d0d39c0ce30c2a1be";
    const twilioApiSecret = "lkHakrZT5yWKa6CCDHnTxHs4iZI9Q12T";
    
    const identity = username;
    
    // Create Video Grant
    const videoGrant = new VideoGrant({
      room: roomName,
    });
    
    // Create an access token which we will sign and return to the client,
    // containing the grant we just created
    const token = new AccessToken(
      twilioAccountSid,
      twilioApiKey,
      twilioApiSecret,
      {identity: identity}
    );
    token.addGrant(videoGrant);
    
    // Serialize the token to a JWT string
    console.log(token.toJwt());


    console.log("Data part");
    console.log(data);

    Video.connect(token.toJwt(), {
      name: roomName,
    })
      .then((room) => {
        setConnecting(false);
        setRoom(room);
      })
      .catch((err) => {
        console.error(err);
        setConnecting(false);
      });
  }, [roomName, username, setConnecting]);


  const handleLogout = useCallback(() => {
    setRoom((prevRoom) => {
      if (prevRoom) {
        prevRoom.localParticipant.tracks.forEach((trackPub) => {
          trackPub.track.stop();
        });
        prevRoom.disconnect();
      }
      return null;
    });
  }, []);

  console.log("room name is", roomName);
  console.log("username is", username);
  useEffect(() => {
    if (room) {
      const tidyUp = (event) => {
        if (event.persisted) {
          return;
        }
        if (room) {
          handleLogout();
        }
      };
      window.addEventListener("pagehide", tidyUp);
      window.addEventListener("beforeunload", tidyUp);
      return () => {
        window.removeEventListener("pagehide", tidyUp);
        window.removeEventListener("beforeunload", tidyUp);
      };
    }
  }, [room, handleLogout]);

  let render;
  if (room) {
    render = (
      <Room roomName={roomName} room={room} handleLogout={handleLogout} />
    );
  } else {
    render = (
      <>
        {connecting ? (
          <div className="loading animate__backInLeft">
            <CircularProgress />
            <h1 className="loading_text">Loading...</h1>
          </div>
        ) : (
          <>
            <Header />

            <Hero
              username={username}
              roomName={roomName}
              handleSubmit={handleSubmit}
              connecting={connecting}
              setRoomName={setRoomName}
            />
          </>
        )}
      </>
    );
  }
  return render;
};
export default VideoChat