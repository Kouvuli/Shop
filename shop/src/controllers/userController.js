import _ from "lodash";

const userControllers = {
  async profile(req, res) {
    const state = {
      title: "Tài khoản",
      layout: "layouts/user",
    };
    if (_.isEmpty(req.body)) {
      res.render("user/ho-so-ca-nhan", { ...state });
    }
  },
  async cart(req, res) {
    const state = {
      title: "Giỏ hàng",
      layout: "layouts/user",
    };
    if (_.isEmpty(req.body)) {
      res.render("user/gio-hang", { ...state });
    }
  },

  async notification(req, res) {
    const state = {
      title: "Thông báo",
      layout: "layouts/user",
    };
    if (_.isEmpty(req.body)) {
      res.render("user/thong-bao", { ...state });
    }
  },
  async liked(req, res) {
    const state = {
      title: "Đã thích",
      layout: "layouts/user",
    };
    if (_.isEmpty(req.body)) {
      res.render("user/da-thich", { ...state });
    }
  },
};

export default userControllers;
