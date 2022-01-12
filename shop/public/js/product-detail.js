document.querySelectorAll(".product-img-item").forEach((e) => {
    e.onclick = () => {
        let img = e.querySelector("img").getAttribute("src");
        document.querySelector("#product-img > img").setAttribute("src", img);
    };
});

// document.querySelector("#view-all-description").onclick = () => {
//     let content = document.querySelector(".product-detail-description-content");
//     content.classList.toggle("active");
//     document.querySelector("#view-all-description").innerHTML =
//         content.classList.contains("active") ? "view less" : "view all";
// };

const quantityArrowMinus = document.querySelector(".bx-minus");
const quantityArrowPlus = document.querySelector(".bx-plus");
const quantityNum = document.querySelector(".product-quantity");

quantityArrowMinus.onclick = quantityMinus;
quantityArrowPlus.onclick = quantityPlus;

function quantityMinus() {
    if (parseInt(quantityNum.innerHTML) > 1) {
        quantityNum.innerHTML = +quantityNum.innerHTML - 1;
    }
}

function quantityPlus() {
    quantityNum.innerHTML = +quantityNum.innerHTML + 1;
}

const handleAddToCardDetail =
    ({ productId }) =>
    () => {
        $.ajax({
            url: `/api/v1/cart/add`,
            method: "POST",
            data: { productId, quantity: +quantityNum.innerHTML },
            success: function (res) {
                const data = res.data;
                console.log(data);
            },
            error: function (jqXHR) {
                console.log(jqXHR);
            },
        });
    };

const addBtn = document.querySelector(".add-to-cart");

const id = addBtn.id;

addBtn.onclick = handleAddToCardDetail({
    productId: id,
});
