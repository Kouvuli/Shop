const getFormData = () => {
  const formElements = document.querySelector("#payment-form");
  const methodElement = document.querySelector(".payment-method");
  // const inputs = formElements.querySelectorAll("input").entries;
  // console.log({ inputs });

  // const data = inputs.reduce((acc, item) => {
  //     acc[item["name"]] = item["value"];
  //     return acc;
  // });
  // console.log({ data });

  const formEntries = new FormData(formElements).entries();
  const formData = Object.assign(
    ...Array.from(formEntries, ([name, value]) => ({ [name]: value }))
  );
  formData["method"] = methodElement.value;

  return formData;
};

const handleCreateOrder = (payBtn) => {
  const data = getFormData();
  $.ajax({
    url: `/api/v1/order`,
    method: "POST",
    data: {
      address: data,
      payment: {
        method: data["method"],
      },
    },
    success: function (res) {
      const data = res.data;
      // console.log(data);
      payBtn.innerHTML = "Thành công";

      window.location.href = "/";
    },
    error: function (jqXHR) {
      payBtn.innerHTML = "Có lỗi sảy ra";
    },
  });
};

const payBtn = document.querySelector(".pay-btn");

if (payBtn) {
  payBtn.onclick = () => {
    // console.log({ payBtn });
    payBtn.disabled = true;
    payBtn.innerHTML = "Đang tải...";
    handleCreateOrder(payBtn);
  };
}

const handleUpdateCartItem = (productId, quantity) => {
  $.ajax({
    url: `/api/v1/cart/update`,
    method: "POST",
    data: {
      productId,
      quantity,
    },
    success: function (res) {
      const data = res.data;
      window.location.reload();
    },
    error: function (jqXHR) {},
  });
};

const changeQuantityEle = document.querySelectorAll(
  "input[name=change-quantity]"
);
if (changeQuantityEle.length > 0) {
  changeQuantityEle.forEach((element) => {
    element.onchange = (event) => {
      const quantity = event.target.value;
      const productId = element.id;
      handleUpdateCartItem(productId, quantity);
    };
  });
}

const checkValue = () => {
  var error = "";
  document.getElementById("last-name-error").innerHTML = "";
  document.getElementById("user-name-error").innerHTML = "";
  document.getElementById("email-error").innerHTML = "";
  document.getElementById("address-error").innerHTML = "";
  document.getElementById("birthday-error").innerHTML = "";
  var name = document.getElementById("last-name");
  var username = document.getElementById("user-name");
  var email = document.getElementById("email");
  var address = document.getElementById("address");
  var birthday = document.getElementById("birthday");
  const emailFormat = /[!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/;
  const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  const addressFormat = /[!@#$%^&*()_+\-=\[\]{};':"\\|<>\/?]+/;
  if (format.test(name.value)) {
    error += "Tên có ký tự đặc biệt\n";
    document.getElementById("last-name-error").innerHTML = error;
  } else if (name.value.length == 0) {
    error += "Tên không được bỏ trống";
    document.getElementById("last-name-error").innerHTML = error;
  } else if (format.test(username.value)) {
    error += "Tên đăng nhập có ký tự đặc biệt\n";
    document.getElementById("user-name-error").innerHTML = error;
  } else if (username.value.length == 0) {
    error += "Tên đăng nhập không được bỏ trống";
    document.getElementById("user-name-error").innerHTML = error;
  } else if (emailFormat.test(email.value.toLowerCase())) {
    error += "Email có ký tự đặc biệt\n";
    document.getElementById("email-error").innerHTML = error;
  } else if (email.value.length == 0) {
    error += "Email không được bỏ trống";
    document.getElementById("email-error").innerHTML = error;
  } else if (addressFormat.test(address.value)) {
    error += "Địa chỉ có ký tự đặc biệt\n";
    document.getElementById("address-error").innerHTML = error;
  } else if (address.value.length == 0) {
    error += "Địa chỉ không được bỏ trống";
    document.getElementById("address-error").innerHTML = error;
  } else if (format.test(birthday.value)) {
    error += "Sinh nhật có ký tự đặc biệt\n";
    document.getElementById("bỉthday-error").innerHTML = error;
  } else if (birthday.value.length == 0) {
    error += "Sinh nhật không được bỏ trống";
    document.getElementById("bỉthday-error").innerHTML = error;
  }
  if (error != "") {
    // alert(error);
    return false;
  }
  window.location.reload();
  return true;
};

// console.log(window.location.href);
// alert("hello!");
// const getFormData2 = () => {
//   const formElements = document.querySelector("#update-form");
//   // const methodElement = document.querySelector(".payment-method");
//   // const inputs = formElements.querySelectorAll("input").entries;
//   // console.log({ inputs });

//   // const data = inputs.reduce((acc, item) => {
//   //     acc[item["name"]] = item["value"];
//   //     return acc;
//   // });
//   // console.log({ data });

//   const formEntries = new FormData(formElements).entries();
//   const formData = Object.assign(
//     ...Array.from(formEntries, ([name, value]) => ({ [name]: value }))
//   );
//   return formData;
// };
// $("#datetimepicker3").datetimepicker({
//   format: "DD/MM/YYYY",
// });

// $("#submit-btn").onClick(() => {
//   alert("hello!");
//   const data = getFormData2();
//   $.ajax({
//     url: `/users/profile/update`,
//     method: "POST",
//     data,
//     success: function (res) {
//       const data = res.data;
//       window.location.reload();
//     },
//     error: function (jqXHR) {},
//   });
// });
