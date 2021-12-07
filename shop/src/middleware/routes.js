import indexRouter from "../routes/indexRoute";
import productsRouter from "../routes/productRoute";
import shopRouter from "../routes/shopRoute";
import usersRouter from "../routes/userRoute";
import categoriesRouter from "../routes/categoryRoute";
import authRouter from "../routes/authRoute";
import auth, { authRedirect } from '../middleware/auth'

const useRoutes = (app) => {
    app.use(auth);
    app.use("/", indexRouter);
    app.use("/", shopRouter);
    app.use("/auth", authRouter);
    app.use("/products", productsRouter);
    app.use("/users", authRedirect, usersRouter);
    app.use("/category", categoriesRouter);
};

export default useRoutes;
