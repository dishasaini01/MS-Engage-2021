import config from "./config";
import express from "express";
import { urlencoded, json } from "body-parser";
import { videoToken } from "./tokens";
const pino = require("express-pino-logger")();

const app = express();
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(pino);

const sendTokenResponse = (token, res) => {
  res.set("Content-Type", "application/json");
  res.send(
    JSON.stringify({
      token: token.toJwt(),
    })
  );
};
app.get("/api/greeting", (req, res) => {
  const name = req.query.name || "World";
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.get("/video/token", (req, res) => {
  const identity = req.query.identity;
  const room = req.query.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);
});
app.post("/video/token", (req, res) => {
  const identity = req.body.identity;
  const room = req.body.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log("Express server is running on localhost:3000")
);
