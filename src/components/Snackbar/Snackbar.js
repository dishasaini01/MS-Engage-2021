import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { useAppContext } from "../../context/appContext";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
/* here we are initializing const for the snackbar of meeting details i.e room id.
The snackbar will open on on a CLick and the id will be copied to the clipboard 
*/
export default function SimpleSnackbar() {
  const { snackbarOpen, setSnackbarOpen } = useAppContext();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };
// defining the auto hidding duration of snackbar and its position
  return (
    <div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Alert onClose={handleClose} severity="success">
          Meet ID copied successfully !
        </Alert>
      </Snackbar>
    </div>
  );
}
