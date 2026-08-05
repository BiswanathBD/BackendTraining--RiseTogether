import express, { Application, Request, Response } from "express";
import router from "./routers/router.js";
import cors from "cors";
import notFound from "./middleware/notFound.js";
import globalErrorHandler from "./middleware/globalErrorHandler.js";

const app: Application = express();

app.use(express.json());
app.use(cors());

// base route with versioning
app.use("/api/v1", router);

app.get("/", (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Backend API is running successfully",
  });
});

app.use(notFound);
app.use(globalErrorHandler);

export default app;
