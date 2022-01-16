setTimeout(function () {
    const selectElements = document.querySelectorAll(".select-status");

    for (const ele of selectElements) {
        ele.onchange = (e) => {
            const id = ele.id.split("-")[1];
            const status = e.target.value;
            $.ajax({
                url: `api/v1/orders/${id}`,
                method: "POST",
                data: { status },
                success: function (res) {
                    const data = res.data;
                    console.log({ data });
                },
                error: function (jqXHR) {
                    console.log({ jqXHR });
                },
            });
        };
    }
}, 1000);
