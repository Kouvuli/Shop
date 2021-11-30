import _ from "lodash";

const authController = {
  async login(req, res) {
    const state = {
      title: "Tất cả sản phẩm",
      layout: "layouts/main",
    };
    if (_.isEmpty(req.body)) {
      res.render("auth/dang-nhap", { ...state });
    }
  },
};

export default authController;
