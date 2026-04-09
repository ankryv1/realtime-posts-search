import { WebSocketServer } from "ws";
import Post from "../models/post.model.js";

export const initWebSocket = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("Client connected via WebSocket");

    ws.on("message", async (message) => {
      try {
        const query = message.toString();
        const results = await Post.find({
          title: { $regex: query, $options: "i" }
        });
        ws.send(JSON.stringify(results));
      } catch (err) {
        ws.send(JSON.stringify({ error: "Search failed" }));
      }
    });

    ws.on("close", () => console.log("Client disconnected"));
  });

  return wss;
};