import dotenv from "dotenv";
dotenv.config({
    path: process.env.NODE_ENV === 'development' ? `.development.env` : `.env`
})
import express from "express";
import http from "http";
import appMdw from './middleware/appMdw'
import session from "./middleware/session";
import passport from "./middleware/passport";
import routes from "./middleware/routes";
import viewEngine from "./middleware/viewEngine";
import databaseService from './services/databaseService'
const PORT = process.env.PORT || 5000

class App {
    constructor(port) {
        this.port = port;
        this.app = express();
        this.server = http.createServer(this.app);
        this.useDatabase();
        viewEngine(this.app)
        appMdw(this.app)
        session(this.app)
        passport(this.app)
        routes(this.app)
    }
    run() {
        this.server.listen(this.port, () => {
            console.log(`
            ███████╗██╗ ██████╗ ███╗   ██╗      ███████╗███████╗██████╗ ██╗   ██╗███████╗██████╗ 
            ██╔════╝██║██╔════╝ ████╗  ██║      ██╔════╝██╔════╝██╔══██╗██║   ██║██╔════╝██╔══██╗
            ███████╗██║██║  ███╗██╔██╗ ██║█████╗███████╗█████╗  ██████╔╝██║   ██║█████╗  ██████╔╝
            ╚════██║██║██║   ██║██║╚██╗██║╚════╝╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██╔══╝  ██╔══██╗
            ███████║██║╚██████╔╝██║ ╚████║      ███████║███████╗██║  ██║ ╚████╔╝ ███████╗██║  ██║
            ╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝      ╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝
> Server is running on localhost:${this.port}...
            `);
        });
    }
    async useDatabase() {
        try {
            await databaseService.connect()
            console.log('> MongoDB is connected...')
            this.run();

        } catch (e) {
            console.log({ e });
            console.log('> Cant connect MongoDB...')
        }
    }

}
new App(PORT);
