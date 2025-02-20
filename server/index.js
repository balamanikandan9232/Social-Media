import express from "express";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import postRoute from "./routes/posts.js";
import likeRoute from "./routes/likes.js";
import commentRoute from "./routes/comments.js";
import relationshipRoute from "./routes/relationships.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/server/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use(express.json());
app.use("/server/auth", authRoute);
app.use("/server/user", userRoute);
app.use("/server/posts", postRoute);
app.use("/server/likes", likeRoute);
app.use("/server/comments", commentRoute);
app.use("/server/relationships", relationshipRoute);

app.listen(3001, () => {
  console.log("Server is running");
});
