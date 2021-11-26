const statusArr = ["Đang giảm giá", "Còn hàng", "Hết hàng"];
const brandSpeakerArr = [
  "Ultimate Ears",
  "Anstell&Kern",
  "Bose",
  "Creative",
  "Edifier",
  "Harman Kardon",
  "JBL",
  "Marshall",
  "Skullcandy",
  "Sony",
  "LG",
  "SMSL",
];

const brandPlayerArr = [
  "Aune",
  "Benjie",
  "Cayin",
  "Colorfly",
  "Cowon",
  "FiiO",
  "HiBy",
  "Hidizs",
  "Hifiman",
  "IBasso",
];

const brandMicrophoneArr = [
  "Razer",
  "Kingston HyperX",
  "Audio-Technica",
  "AKG",
];

const typeHeadPhoneArr = [
  "True Wireless",
  "Earbud",
  "Bluetooth",
  "Noise Cancelling",
];
const brandHeadPhoneArr = ["JBL", "Beat", "Logitech", "Samsung", "Sony"];
document
  .querySelectorAll(".group-checkbox input[name=status]")
  .forEach((box) => {
    box.addEventListener("change", (e) => {
      e.preventDefault();
      if (box.checked) {
        e.preventDefault();
        if (box.getAttribute("id") == "status1") {
          window.location.search = insertParams("status[0]", statusArr[0]);
          localStorage.setItem("status[0]", statusArr[0]);
        }
        if (box.getAttribute("id") == "status2") {
          window.location.search = insertParams("status[1]", statusArr[1]);
          localStorage.setItem("status[1]", statusArr[1]);
        }
        if (box.getAttribute("id") == "status3") {
          window.location.search = insertParams("status[2]", statusArr[2]);
          localStorage.setItem("status[2]", statusArr[2]);
        }
      } else {
        if (box.getAttribute("id") == "status1") {
          window.location = removeURLParameter("status[0]");
          localStorage.removeItem("status[0]");
        }
        if (box.getAttribute("id") == "status2") {
          window.location = removeURLParameter("status[1]");
          localStorage.removeItem("status[1]");
        }
        if (box.getAttribute("id") == "status3") {
          window.location = removeURLParameter("status[2]");
          localStorage.removeItem("status[2]");
        }
      }
    });
  });
window.onload = () => {
  if (localStorage.getItem("status[0]") != null) {
    document.querySelector("input[id=status1]").checked = true;
  }
  if (localStorage.getItem("status[1]") != null) {
    document.querySelector("input[id=status2]").checked = true;
  }
  if (localStorage.getItem("status[2]") != null) {
    document.querySelector("input[id=status3]").checked = true;
  }
};
function insertParams(key, value) {
  //   key = encodeURIComponent(key);
  //   value = encodeURIComponent(value);

  if (window.location.search == "") {
    return key + "=" + value;
    // history.pushState(null, "", window.location.pathname + "?" + params);
  } else {
    var kvp = document.location.search.substr(1).split("&");
    let i = 0;

    for (; i < kvp.length; i++) {
      if (kvp[i].startsWith(key + "=")) {
        let pair = kvp[i].split("=");
        pair[1] = value;
        kvp[i] = pair.join("=");
        break;
      }
    }

    if (i >= kvp.length) {
      kvp[kvp.length] = [key, value].join("=");
    }

    let params = kvp.join("&");
    return params;
    // history.pushState(null, "", window.location.pathname + "?" + params);
  }
}

function removeURLParameter(parameter) {
  //prefer to use l.search if you have a location/link object

  var url = window.location.href.split("?")[0] + "?";
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");
    if (sParameterName[0] != parameter) {
      url = url + sParameterName[0] + "=" + sParameterName[1] + "&";
    }
  }
  return url.substring(0, url.length - 1);
}
