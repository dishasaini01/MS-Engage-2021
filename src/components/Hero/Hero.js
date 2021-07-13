/*Importing the required materials UI for Button, Divider, InputAdornment, TextField, Keyboard, VideoCallOutlined.
Importing react package
importing styles for this file
importing uuid which generates random room id for everytime we join the call.
*/
import { Button, Divider, InputAdornment, TextField } from "@material-ui/core";
import { Keyboard, VideoCallOutlined } from "@material-ui/icons";
import React from "react";
import "./styles.css";
import { v4 as uuidv4 } from "uuid";

/* initializing Hero for setting a new room on click of "Join" button
*/
const Hero = ({ setRoomName, handleSubmit }) => {
  const newMeeting = () => {
    setRoomName(uuidv4());
    handleSubmit();
  };

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };
  return (
    <div className="hero">
      <div className="hero__left">
        <div className="hero__featureText">
          
          <h1 className="hero__title">
          Meet, chat, call, and collaborate in just one place.
          </h1>
          <p className="hero__subtitle">
          Microsoft Teams is for everyone Whether it’s chat, calls, or video, anyone can engage at any time, bringing everyone closer. Your docs, photos, videos, chat history, and meeting notes are always there, so it’s easier to work together.
          </p>
        </div>

        <div className="hero__buttons">
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            className="hero__createBTN"
          >
            <VideoCallOutlined />
            <p>New Meeting</p>
          </Button>

          <TextField
            className="hero__input"
            variant="outlined"
            onChange={handleRoomNameChange}
            placeholder="Enter a code or link "
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Keyboard className="icon" />
                </InputAdornment>
              ),
            }}
          />

          <Button className="hero__joinBTN" onClick={handleSubmit}>
            Join
          </Button>
        </div>

        <Divider />

        <p className="hero__learnMore">Learn more about Microsoft Teams</p>
      </div>

      <div className="hero__right">
        <img
          className="hero__image"
          src="https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RWDeEK?ver=e1e6&q=90&m=2&h=768&w=1024&b=%23FFFFFFFF&aim=true"
          alt="Feature IMG"
        />
      </div>
    </div>
  );
};

export default Hero;
