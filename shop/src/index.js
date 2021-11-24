import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import { create } from "express-handlebars";
import categoriesRouter from "./routes/categoryRoute";
import authRouter from "./routes/authRoute";
import usersRouter from "./routes/userRoute";
import indexRouter from "./routes/indexRoute";
import shopRouter from "./routes/shopRoute";

import productsRouter from "./routes/productRoute";
import path from "path";
import helpers from "./helper/index";
// import axios from "axios";
// import bookModel from "./models/bookModel";
// import bookDetailModel from "./models/bookDetailModel";
const PORT = process.env.PORT || 5000;

class App {
  constructor(port) {
    this.port = port;
    this.app = express();
    this.server = http.createServer(this.app);
    this.useStatic();
    this.useViewEngine();
    this.useDatabase();
    this.useMiddlewares();
    this.useRoutes();
    this.run();
  }
  useRoutes() {
    this.app.use("/", indexRouter);
    this.app.use("/", shopRouter);
    this.app.use("/", productsRouter);
    this.app.use("/tai-khoan", usersRouter);
    this.app.use("/category", categoriesRouter);
    this.app.use("/dang-nhap", authRouter);
  }
  useViewEngine() {
    const hbs = create({
      defaultLayout: "main",
      extname: ".hbs",
      partialsDir: "src/views/partials",
      layoutsDir: "src/views",
      helpers,
    });
    this.app.engine(".hbs", hbs.engine);
    this.app.set("views", "./src/views");
    this.app.set("view engine", "hbs");
  }
  useStatic() {
    this.app.use(express.static("./public"));
  }
  useDatabase() {
    mongoose.connect(
      `mongodb+srv://nguyenkhavi:${process.env.MONGODB_PASSWORD}@cluster0.vo4ad.mongodb.net/${process.env.MONGODB_NAME}`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    mongoose.connection.on("error", (err) => console.log(err));
    mongoose.connection
      .once("open", () => console.log("> MongoDB Running..."))
      .on("error", (e) => {
        throw e;
      });
  }
  useMiddlewares() {
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json({ limit: "1024mb", extended: true }));
    this.app.use(
      express.urlencoded({
        limit: "1024mb",
        extended: true,
        parameterLimit: 50000,
      })
    );
  }
  run() {
    this.server.listen(this.port, () => {
      console.log(`> Server is running on ${this.port}...`);
    });
  }
}
new App(PORT);
