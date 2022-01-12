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
