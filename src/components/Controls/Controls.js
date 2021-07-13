/* Importing all the required material ui, react module, and other files to access in the page*/ 
import {
  CallEnd,
  ExpandLess,
  MicNone,
  MicOffOutlined,
  MoreVert,
  VideocamOffOutlined,
  VideocamOutlined,
} from "@material-ui/icons";
import React from "react";
import { useRoomContext } from "../../context/videoContext";
import "./styles.css";
import { useClipboard } from "use-clipboard-copy";
import { useAppContext } from "../../context/appContext";
import SimpleSnackbar from "../Snackbar/Snackbar";


/* This file contains all the controls of different pages 
initializing different controls like videoOn, audioOn, snackbar of meeting details, enabling video and audio and
mute participant 
*/
const Controls = ({ handleLogout, roomName, muteParticipant, enableVideo }) => {
  const { videoON, setVideoON, audioON, setAudioON } = useRoomContext();
  const { setSnackbarOpen } = useAppContext();

  //Click on Meeting details will open the snackbar stating the room id to join other participants.
  const handleClick = () => {
    setSnackbarOpen(true);
  };
  const clipboard = useClipboard();

  //the toggle button and turn video On and Off
  const toogleVideoState = () => {
    setVideoON(!videoON);
    enableVideo();
  };

  //the toggle button and turn audio On and Off
  const toogleAudioState = () => {
    setAudioON(!audioON);
    muteParticipant();
  };
  //Click on meeting details will copy the room id to the clipboard
  const handleMeetingDetails = () => {
    clipboard.copy(roomName);
    handleClick();
  };

  return (
    <>
      <SimpleSnackbar />

      <div className="controls">
        <div className="details_control" onClick={handleMeetingDetails}>
          <p>Meeting details</p>
          <ExpandLess />
        </div>

        <div className="video-audio_controls">
          <div
            className={`control_btnContainer ${!audioON && "red-bg"}`}
            onClick={toogleAudioState}
          >
            {audioON ? (
              <MicNone className="control-icon" />
            ) : (
              <MicOffOutlined className="control-icon" />
            )}
          </div>

          <div className="control_btnContainer" onClick={handleLogout}>
            <CallEnd className="control-icon end-meet" />
          </div>

          <div
            className={`control_btnContainer ${!videoON && "red-bg"}`}
            onClick={toogleVideoState}
          >
            {videoON ? (
              <VideocamOutlined className="control-icon" />
            ) : (
              <VideocamOffOutlined className="control-icon" />
            )}
          </div>
        </div>

        <MoreVert className="more-icon" />
      </div>
    </>
  );
};

export default Controls;
