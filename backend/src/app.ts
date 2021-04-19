import express from "express";
import * as http from "http";
import { Server } from "socket.io";
import "./database/mongoose";

const port = process.env.PORT || 8000;

const app = express();

app.set("port", port);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

server.listen(port, () => console.log(`Listening on port ${port}`));
