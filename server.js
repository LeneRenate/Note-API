import express from "express";

import { apiRouter } from "./routes/apiRoutes.js";

const PORT = 3500;

const app = express();

// Parse JSON bodies
app.use(express.json());

// Serve index.html
app.use(express.static("."));

app.use(`/api`, apiRouter);

app.use((req, res) => {
  res.status(404).json({
    message: "Endpoint not found. Please check the API documentation.",
  });
});

app.listen(PORT, () => console.log(`server connected on port ${PORT}`));
