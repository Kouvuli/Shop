import indexRouter from "../routes/indexRoute";
import productsRouter from "../routes/productRoute";
import shopRouter from "../routes/shopRoute";
import usersRouter from "../routes/userRoute";
import categoriesRouter from "../routes/categoryRoute";
import authRouter from "../routes/authRoute";
import auth from '../middleware/auth'

const useRoutes = (app) => {
    app.use("/", indexRouter);
    app.use("/", shopRouter);
    app.use("/products", productsRouter);
    app.use("/users", auth, usersRouter);
    app.use("/category", categoriesRouter);
    app.use("/auth", authRouter);
};

export default useRoutes;
