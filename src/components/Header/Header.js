
import React from "react";
import { Avatar, Badge, Button, makeStyles, Popover } from "@material-ui/core";
import { useAppContext } from "../../context/appContext";
import { Apps, CameraAltOutlined, FeedbackOutlined, HelpOutline, PersonAddOutlined, Settings } from "@material-ui/icons";
import { auth } from "../../lib/firebase";
import "./styles.css";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const Header = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  
  
  const {currentUser} = useAppContext()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="header">
      <div className="header__logoContainer">
        
          <img src="https://img.icons8.com/fluent/48/000000/microsoft-teams-2019.png"
          alt="Microsoft Teams"
          className="header__logo"
        />
        <p>Microsoft Teams</p>
      </div>

      <div className="header__icons">
        <HelpOutline />
        <FeedbackOutlined />
        <Settings />

        <div className="header__iconDivider" />

        <Apps />
        <Avatar className="header__avatar" onClick={handleClick} />
        <Popover
          open={open}
          id={id}
          onClose={handleClose}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "center"
          }}
        >
          <div className="home__popoverContainer">
            <div className="home__popover__top">
              <Badge
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                badgeContent={
                  <div className="home__badge">
                    <CameraAltOutlined className="home__camera" />
                  </div>
                }
              >
                <Avatar className={classes.large} />
              </Badge>
              <div className="home__text">
                <div className="home__displayName">
                   {currentUser?.displayName}
                 
                </div>
                <div className="home__mail">
                  {currentUser?.email}
                </div>
              </div>
              <div className="home__btn">Manage your google account</div>
            </div>

            <div className="home__popover__btn">
              <div className="home__addBtn">
                <PersonAddOutlined className="home__addIcon" />
                <p>Add another account</p>
              </div>

              <Button
                onClick={() => auth.signOut()}
                variant="outlined"
                className="home__signOut"
              >
                Sign Out
              </Button>

              <div className="home__popover__footer">
                <p>Privacy Policy</p>
                <span>•</span>
                <p>Terms of service</p>
              </div>
            </div>
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default Header;
