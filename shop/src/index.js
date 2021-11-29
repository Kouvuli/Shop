import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import databaseService from "../src/services/databaseService";
import useAppMdw from './middleware/useAppMdw'
import useSession from "./middleware/useSession";
import usePassport from "./middleware/usePassport";
import useRoutes from "./middleware/useRoutes";
import useViewEngine from "./middleware/useViewEngine";
const PORT = process.env.PORT || 5000;

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

    run() {
        this.server.listen(this.port, () => {
            console.log(`
      ███████╗██╗ ██████╗ ███╗   ██╗      ███████╗███████╗██████╗ ██╗   ██╗███████╗██████╗ 
      ██╔════╝██║██╔════╝ ████╗  ██║      ██╔════╝██╔════╝██╔══██╗██║   ██║██╔════╝██╔══██╗
      ███████╗██║██║  ███╗██╔██╗ ██║█████╗███████╗█████╗  ██████╔╝██║   ██║█████╗  ██████╔╝
      ╚════██║██║██║   ██║██║╚██╗██║╚════╝╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██╔══╝  ██╔══██╗
      ███████║██║╚██████╔╝██║ ╚████║      ███████║███████╗██║  ██║ ╚████╔╝ ███████╗██║  ██║
      ╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝      ╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝ started...
      `);
        });
    }
}
new App(PORT);
