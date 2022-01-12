let filter_col = document.querySelector("#filter-col");

document
  .querySelector("#filter-toggle")
  .addEventListener("click", () => filter_col.classList.toggle("active"));

document
  .querySelector("#filter-close")
  .addEventListener("click", () => filter_col.classList.toggle("active"));

$(document).ready(function () {
    console.log("ready!");
    $.ajax({
        url: `api/v1/cart/add`,
        method: "POST",
        data:{productId: "6190ffc4ad17cb441420ef0a"},
        success: function (res) {
            const data = res.data;
            console.log(data)
        },
        error: function (jqXHR) {
          console.log(error)
        },
        
    });
});
