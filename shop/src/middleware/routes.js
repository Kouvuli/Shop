import indexRouter from "../modules/index/indexRoute";
import productsRouter from "../modules/products/productRoute";
import usersRouter from "../modules/users/userRoute";
import authRouter from "../modules/auth/authRoute";
import auth, { authRedirect } from './auth'

const useRoutes = (app) => {
    app.use(auth);
    app.use("/", indexRouter);
    app.use("/auth", authRouter);
    app.use("/products", productsRouter);
    app.use("/users", authRedirect, usersRouter);
};

export default useRoutes;
