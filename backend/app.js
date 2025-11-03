import express from "express";
import eventRouter from "./src/routes/event-routes.js";
import userRouter from "./src/routes/user-routes.js";
import signUpRouter from "./src/routes/sign-up-routes.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || process.env.NODE_ENV !== "production") {
        return callback(null, true);
      }

      const allowedOrigins = [
        "https://event-manager-frontend-d0ii.onrender.com",
        "https://event-manager-frontend.onrender.com",
      ];

      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"), false);
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "Event Manager API",
    version: "1.0.0",
    documentation: "/api",
  });
});

app.use("/api", eventRouter);
app.use("/api", userRouter);
app.use("/api", signUpRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

export default app;
