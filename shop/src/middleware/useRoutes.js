
import indexRouter from '../routes/indexRoute'
import productsRouter from '../routes/productRoute'
import shopRouter from '../routes/shopRoute'
import usersRouter from '../routes/userRoute'
import categoriesRouter from '../routes/categoryRoute'
import authRouter from '../routes/authRoute'
const useRoutes = (app) => {
    app.use("/", indexRouter);
    app.use("/", shopRouter);
    app.use("/", productsRouter);
    app.use("/tai-khoan", usersRouter);
    app.use("/category", categoriesRouter);
    app.use("/dang-nhap", authRouter);
}



export default useRoutes
