let filter_col = document.querySelector("#filter-col");

document
    .querySelector("#filter-toggle")
    .addEventListener("click", () => filter_col.classList.toggle("active"));

document
    .querySelector("#filter-close")
    .addEventListener("click", () => filter_col.classList.toggle("active"));

const handleAddToCard = (productId) => () => {
    $.ajax({
        url: `api/v1/cart/add`,
        method: "POST",
        data: { productId },
        success: function (res) {
            const data = res.data;
            console.log(data);
        },
        error: function (jqXHR) {
            console.log(jqXHR);
        },
    });
};

const addBtns = document.querySelectorAll(".btn-cart-add");

addBtns.forEach((ele) => {
    const id = ele.id;
    ele.onclick = handleAddToCard(id);
});
