import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./src/utils/config.js";
import logger from "./src/utils/logger.js";
import middleware from "./src/utils/middleware.js";
import blogsRouter from "./src/controllers/blogs.js";
import usersRouter from "./src/controllers/users.js";
import loginRouter from "./src/controllers/login.js";

const app = express();

const mongoUrlProd = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_HOST}/${config.MONGO_NAME}?retryWrites=true&w=majority&appName=fullstackopen`;
const mongoUrlTest = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_HOST}/${config.MONGO_NAME_TEST}?retryWrites=true&w=majority&appName=fullstackopen`;
const mongoUrl = config.NODE_ENV === "test" ? mongoUrlTest : mongoUrlProd;

logger.info("connecting to", mongoUrl);
mongoose
  .connect(mongoUrl)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connection to MongoDB", error.message);
  });

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
app.use("/api/blogs", blogsRouter);
app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
