const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

import authRoutes from "./routes/post";
import postRoutes from "./routes/auth";

import { connectDB } from "./config/db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(cors());

app.use("/api/v1", authRoutes);
app.use("/api/v1", postRoutes);

app.listen(PORT, () => {
	console.log("Server is running on http://localhost:" + PORT);
	connectDB();
});