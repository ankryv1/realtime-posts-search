import express from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import { initWebSocket } from "./services/socket.service.js";
import postRoutes from "./routes/post.route.js";

dotenv.config();
connectDB(); 

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/posts", postRoutes);

const server = http.createServer(app);

initWebSocket(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT,"0.0.0.0", () => console.log(`Server running on port ${PORT}`));