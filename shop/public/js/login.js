var x = document.getElementById("login");
var y = document.getElementById("register");
var z = document.getElementById("btn");


const loginToggleButton = document.querySelector("#login-toggle-btn");
const registerToggleButton = document.querySelector("#register-toggle-btn");
const messListEle = document.querySelector("#mess-list");

const removeAllMessages = () => {
    const messEles = document.querySelectorAll(".mess-content");
    for (const node of messEles)
        messListEle.removeChild(node)
}
function switchToRegister() {
    x.style.left = "-400px";
    y.style.left = "50px";
    z.style.left = "110px";
    removeAllMessages()
}
function switchToLogin() {
    x.style.left = "50px";
    y.style.left = "450px";
    z.style.left = "5px";
    removeAllMessages()
}
loginToggleButton.onclick = switchToLogin
registerToggleButton.onclick = switchToRegister
console.log(registerToggleButton, loginToggleButton)
