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

const handleCreateOrder = () => {
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
            window.location.href = "/";
        },
        error: function (jqXHR) {
            console.log(jqXHR);
        },
    });
};

const payBtn = document.querySelector(".pay-btn");
payBtn.onclick = () => {
    // console.log({ payBtn });
    payBtn.disabled = true;
    handleCreateOrder();
};
