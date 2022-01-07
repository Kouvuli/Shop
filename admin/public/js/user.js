const elements = document.querySelectorAll(".user-row");

const ICON_CLASSES = {
    true: "fas fa-user-lock pointer",
    false: "fas fa-lock-open pointer",
};

for (const element of elements) {
    const icon = element.querySelector(".fas");
    const id = element.id;
    icon.onclick = () => {
        $.ajax({
            url: "api/v1/block",
            method: "POST",
            data: {
                id,
            },
            success: function (res) {
                const active = res.data?.active;
                const classes = ICON_CLASSES[active];
                icon.className = classes;
            },
            error: function (jqXHR) {},
        });
    };
}
