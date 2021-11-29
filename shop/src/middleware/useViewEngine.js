import helpers from "../helpers";
import { create } from 'express-handlebars'

const useViewEngine = (app) => {
    const hbs = create({
        defaultLayout: './main.hbs',
        extname: '.hbs',
        helpers,
    });
    app.engine('.hbs', hbs.engine);
    app.set("views", "./src/views");
    app.set("view engine", "hbs");
}

export default useViewEngine