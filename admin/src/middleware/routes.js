import indexRoutes from "../modules/index/indexRoutes";
import userRoutes from "../modules/user/userRoutes";
import productRoutes from "../modules/product/productRoutes";
import orderRoutes from "../modules/order/orderRoutes";
import discountRoutes from "../modules/discount/discountRoutes";
import adminRoutes from "../modules/admin/adminRoutes";
import auth from "./auth";
import apiRoutes from "../modules/api/apiRoutes";

const useRoutes = (app) => {
    app.use("/", indexRoutes);
    app.use("/api/v1", apiRoutes);
    app.use(auth);
    app.use("/users", userRoutes);
    app.use("/admin", adminRoutes);
    app.use("/products", productRoutes);
    app.use("/orders", orderRoutes);
    app.use("/discounts", discountRoutes);
    //Catch not found ***Place it at the end of file**
    app.use((req, res) => {
        res.render("error/index");
    });
};

export default useRoutes;
