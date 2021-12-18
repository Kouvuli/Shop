import helpers from "../helper";
import { create } from 'express-handlebars'

const useViewEngine = (app) => {
    const hbs = create({
        defaultLayout: "main",
        extname: ".hbs",
        partialsDir: "src/views/partials",
        layoutsDir: "src/views/layouts",
        helpers,
    });
    app.engine('.hbs', hbs.engine);
    app.set("views", "./src/views");
    app.set("view engine", "hbs");
}

export default useViewEngine