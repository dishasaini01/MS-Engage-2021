//here we require express for the server to respond, pino and other files like config, body-parser etc.
import config from "./config";
import express from "express";
import { urlencoded, json } from "body-parser";
import { videoToken } from "./tokens";
const pino = require("express-pino-logger")();

//we initialize variable app with const so that it cannot be declared again and pass different parameters in it
const app = express();
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(pino);

/*initializing the variable sendTokenResponse as const to get jwttoken */
const sendTokenResponse = (token, res) => {
  res.set("Content-Type", "application/json");
  res.send(
    JSON.stringify({
      token: token.toJwt(),
    })
  );
};
/*creating route for API Greeting*/
app.get("/api/greeting", (req, res) => {
  const name = req.query.name || "World";
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

/*creating route for accessing video token with req,query which send the query parameters of the request */
app.get("/video/token", (req, res) => {
  const identity = req.query.identity;
  const room = req.query.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);
});
/*The app.post () function routes the HTTP POST requests to the specified path of video token with the specified 
callback functions.
*/
app.post("/video/token", (req, res) => {
  const identity = req.body.identity;
  const room = req.body.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);
});
/* setting the environment variable PORT to tell web server what port to listen on. So process.env.PORT 
|| 3000 means: whatever is in the environment variable PORT, or 3000 if there's nothing there.
   it is listening on port 3000
*/
const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log("Express server is running on localhost:3000")
);
