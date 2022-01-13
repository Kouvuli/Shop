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

if (quantityArrowMinus && quantityArrowPlus) {
    quantityArrowMinus.onclick = quantityMinus;
    quantityArrowPlus.onclick = quantityPlus;
}

function quantityMinus() {
    if (parseInt(quantityNum.innerHTML) > 1) {
        quantityNum.innerHTML = +quantityNum.innerHTML - 1;
    }
}

function quantityPlus() {
    quantityNum.innerHTML = +quantityNum.innerHTML + 1;
}

const addBtn = document.querySelector(".add-to-cart");

const handleAddToCardDetail =
    ({ productId }) =>
    () => {
        addBtn.disabled = true;
        addBtn.innerHTML = "Đang xử lý ...";
        $.ajax({
            url: `/api/v1/cart/add`,
            method: "POST",
            data: { productId, quantity: +quantityNum.innerHTML },
            success: function (res) {
                const data = res.data;
                addBtn.innerHTML = "Thành công";
            },
            error: function (jqXHR) {
                addBtn.innerHTML = "Có lỗi sảy ra, vui lòng tải lại trang!";
            },
        });
    };

const id = addBtn?.id || "";

if (addBtn) {
    addBtn.onclick = handleAddToCardDetail({
        productId: id,
    });
}

const renderComments = (productId = id, page = 1, perPage = 10) => {
    const commentsSection = document.querySelector(".comments-section");
    const commentsPagination = document.querySelector(".comment-pagination");

    if (commentsSection) {
        //reset
        commentsSection.innerHTML = "";
        commentsPagination.innerHTML = "";
        $.ajax({
            url: `/api/v1/products/${productId}/comments?page=${page}&perPage=${perPage}`,
            method: "GET",
            success: function (res) {
                const { data = [], total = 0 } = res;
                //render pagination
                for (let i = 1; i <= parseInt(total / perPage) + 1; i++) {
                    const li = document.createElement("li");
                    li.innerHTML = `<a ${
                        page === i ? 'class="active"' : ""
                    }>${i}</a>`;
                    li.onclick = () => renderComments(id, i);
                    commentsPagination.append(li);
                }
                // li.innerHTML = `<a>...</a>`;
                // li.innerHTML = `<a class="page-link"><i
                //                     class="bx bxs-chevron-right"
                //                 ></i></a>`;

                if (data.length !== 0) {
                    for (const comment of data) {
                        const div = document.createElement("div");

                        div.innerHTML = `<div class="user-comment">
                        <div class="user-info">
                            <b class="user-name">${
                                comment.user?.name || comment.userId
                            }
                            </b>
                            
                        </div>
                        <div class="user-comment-content">
                        ${comment.content}
                        </div>
                        <sup>${comment.createdAt}</sup>
                    </div>`;
                        commentsSection.append(div);
                    }
                } else {
                    //when empty
                    commentsSection.innerHTML =
                        "<div text-align='center'>Chưa có bình luận</div>";
                }
            },
            error: function (jqXHR) {
                commentsSection.innerHTML =
                    "<div text-align='center'>Đã xảy ra lỗi, vui lòng tải lai trang</div>";
            },
        });
    }
};
renderComments();

const commentContent = document.querySelector(".comment-content");
const createCommentBtn = document.querySelector(".comment-create");

const handleComment =
    ({ productId }) =>
    () => {
        const content = commentContent.value;

        createCommentBtn.disabled = true;
        createCommentBtn.innerHTML = "Đang xử lý ...";
        $.ajax({
            url: `/api/v1/products/${productId}/comments`,
            method: "POST",
            data: {
                content,
            },
            success: function (res) {
                const data = res.data;
                commentContent.value = "";
                createCommentBtn.innerHTML = "Thành công";
                createCommentBtn.disabled = false;

                renderComments();
            },
            error: function (jqXHR) {
                createCommentBtn.innerHTML =
                    "Có lỗi sảy ra, vui lòng tải lại trang!";
            },
        });
    };
if (createCommentBtn) {
    createCommentBtn.onclick = handleComment({ productId: id });
}
