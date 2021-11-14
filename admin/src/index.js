import dotenv from "dotenv";
dotenv.config({
    path: process.env.NODE_ENV === 'development' ? `.development.env` : `.env`
})
import express from "express";
import http from "http";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import appRoutes from "./appRoutes";
import path from "path";

const PORT = process.env.PORT || 5000;

class App {
    constructor(port) {
        this.port = port;
        this.app = express();
        this.server = http.createServer(this.app);
        this.useStatic()
        this.useViewEngine();
        this.useDatabase();
        this.useMiddlewares();
        this.useRoutes();
        this.run();
    }
    useRoutes() {
        this.app.use('/', appRoutes);
    }
    useViewEngine() {
        this.app.set('views', path.join(__dirname, '/views'));
        this.app.set('view engine', 'hbs');
    }
    useStatic() {
        this.app.use(express.static(path.join(__dirname, '/public')))
    }
    useDatabase() {
        mongoose.connect(`mongodb+srv://nguyenkhavi:${process.env.MONGODB_PASSWORD}@cluster0.vo4ad.mongodb.net/${process.env.MONGODB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true });
        mongoose.connection.once('open', () => console.log('> MongoDB is connected...')).on('error', (e) => { throw e });
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
