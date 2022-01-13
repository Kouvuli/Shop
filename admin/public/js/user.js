const elements = document.querySelectorAll(".user-row");

const ICON_CLASSES = {
    true: "fas fa-user-lock pointer",
    false: "fas fa-lock-open pointer",
};

for (const element of elements) {
    const icon = element.querySelector("i[name=block");
    const id = element.id;
    icon.onclick = () => {
        icon.innerHTML = "...";
        icon.className = "";
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
                icon.innerHTML = "";

                console.log({ active });
            },
            error: function (jqXHR) {
                console.log({ jqXHR });
            },
        });
    };
}
