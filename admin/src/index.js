import dotenv from "dotenv";
dotenv.config({
    path: process.env.NODE_ENV === 'development' ? `.development.env` : `.env`
})
import express from "express";
import http from "http";
import useAppMdw from './middleware/useAppMdw'
import useSession from "./middleware/useSession";
import usePassport from "./middleware/usePassport";
import useRoutes from "./middleware/useRoutes";
import useViewEngine from "./middleware/useViewEngine";
import databaseService from './services/databaseService'

const PORT = process.env.PORT || 5000

class App {
    constructor(port) {
        this.port = port;
        this.app = express();
        this.server = http.createServer(this.app);
        this.useDatabase();
        useViewEngine(this.app)
        useAppMdw(this.app)
        useSession(this.app)
        usePassport(this.app)
        useRoutes(this.app)
        this.run();
    }
    useDatabase() {
        try {
            databaseService.connect()
            console.log('> MongoDB is connected...')
        } catch (e) {
            console.log('> Cant connect MongoDB...')
        }
    }
    run() {
        this.server.listen(this.port, () => {
            console.log(`> Server is running on ${this.port}...`);
        });
    }
}
new App(PORT);
