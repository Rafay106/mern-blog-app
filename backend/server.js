import path from "path";
import express from "express";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import blogRoutes from "./routes/blogRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Connect to database
connectDB();

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middlewares
app.use(cookieParser());

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "backend", "views"));

app.use("/api/blogs", blogRoutes);
app.use("/api/users", userRoutes);
// app.use(express.static("backend/public"));

app.get("/", (req, res) => res.status(200).send("Server is ready"));

app.listen(5000, () => console.log(`Server running on port 5000`));
