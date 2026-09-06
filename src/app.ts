import express from "express";
import cors from "cors";

import "./infrastructure/models";

import authRoutes from "./interfaces/routes/authRoutes";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend funcionando correctamente",
    data: null
  });
});

app.use("/api", authRoutes);

export default app;