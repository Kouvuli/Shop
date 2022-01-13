let filter_col = document.querySelector("#filter-col");

document
    .querySelector("#filter-toggle")
    .addEventListener("click", () => filter_col.classList.toggle("active"));

document
    .querySelector("#filter-close")
    .addEventListener("click", () => filter_col.classList.toggle("active"));

const handleAddToCard = (productId, ele) => () => {
    ele.innerHTML = "...";
    ele.disabled = true;
    $.ajax({
        url: `api/v1/cart/add`,
        method: "POST",
        data: { productId },
        success: function (res) {
            ele.innerHTML = "Thành công";
        },
        error: function (jqXHR) {
            ele.innerHTML = "Có lỗi xảy ra";
        },
    });
};

const addBtns = document.querySelectorAll(".btn-cart-add");

addBtns.forEach((ele) => {
    const id = ele.id;
    ele.onclick = handleAddToCard(id, ele);
});
