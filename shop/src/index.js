import dotenv from "dotenv";
dotenv.config({});
import express from "express";
import http from "http";
import databaseService from "../src/services/databaseService";
import appMdw from "./middleware/appMdw";
import session from "./middleware/session";
import passport from "./middleware/passport";
import routes from "./middleware/routes";
import viewEngine from "./middleware/viewEngine";
import cacheService from "./services/cacheService";
const PORT = process.env.PORT || 5000;

class App {
    constructor(port) {
        this.port = port;
        this.environment = process.env.NODE_ENV || "development";
        this.app = express();
        this.server = http.createServer(this.app);
        this.useCache();
        this.useDatabase();
        viewEngine(this.app);
        appMdw(this.app, this.environment);
        session(this.app);
        passport(this.app);
        routes(this.app);
    }
    async useDatabase() {
        try {
            await databaseService.connect();
            console.log("> MongoDB is connected...");
            this.run();
        } catch (e) {
            console.log({ e });
            console.log("> Cant connect MongoDB...");
        }
    }
    async useCache() {
        try {
            await cacheService.connect();
            console.log("> Cache service is connected...");
        } catch (e) {
            console.log({ e });
            console.log("> Cant connect Cache service...");
        }
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
}
new App(PORT);
