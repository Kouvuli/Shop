import express from "express";
import morgan from "morgan";
import cors from "cors";

const useAppMdw = (app, env) => {
    app.use(cors());
    app.use(morgan("dev"));
    app.use(express.json({ limit: "1024mb", extended: true }));
    app.use(
        express.urlencoded({
            limit: "1024mb",
            extended: true,
            parameterLimit: 50000,
        })
    );
    app.use(express.static("./public"));
    app.use((req, res, next) => {
        res.locals.development = env === "development";
        next();
    });
};
export default useAppMdw;
