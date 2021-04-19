import express from "express";
import * as http from "http";
import { Server } from "socket.io";
import { evaluate } from "mathjs";
import "./database/mongoose";
import {
  addBotResultCalculation,
  getBotResultCalculation,
} from "./repository/bot-repository";
import { mapBotResponseToBotDto } from "./utils";

const port = process.env.PORT || 8000;

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("operation", async (msg) => {
    try {
      const result = evaluate(msg);
      await addBotResultCalculation(result);

      socket.emit("operation-result", result);
    } catch (error) {
      socket.emit("operation-result", "The math expression is invalid");
    }
  });

  socket.on("history", async (msg) => {
    try {
      const res = await getBotResultCalculation(10);

      socket.emit("history-result", mapBotResponseToBotDto(res));
    } catch (error) {
      socket.emit("error", "An Error was accured");
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
