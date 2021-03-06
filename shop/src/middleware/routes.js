import indexRouter from "../modules/index/indexRoute";
import productsRouter from "../modules/products/productRoute";
import usersRouter from "../modules/users/userRoute";
import authRouter from "../modules/auth/authRoute";
import auth, { authRedirect } from "./auth";
import apiRoutes from "../modules/api/apiRoutes";

const useRoutes = (app) => {
    app.use(auth);
    app.use("/", indexRouter);
    app.use("/auth", authRouter);
    app.use("/products", productsRouter);
    app.use("/users", usersRouter);
    app.use("/api/v1", apiRoutes);

    //Catch not found ***Place it at the end of file**
    app.use((req, res) => {
        res.render("error");
    });
};

export default useRoutes;
