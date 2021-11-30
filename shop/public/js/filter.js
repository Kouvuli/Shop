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

const brandHeadPhoneArr = ["JBL", "Beat", "Logitech", "Samsung", "Sony"];

// if (!window.referrer.includes(window.location.pathname)) {
//   localStorage.clear();
// }

if (window.location.href.includes("/san-pham")) {
  document
    .querySelectorAll(".group-checkbox input[name=status]")
    .forEach((box) => {
      box.addEventListener("change", (e) => {
        if (box.checked) {
          e.preventDefault();
          for (var i = 0; i < 3; i++) {
            var a = "status" + (i + 1);
            if (box.getAttribute("id") == a) {
              window.location.search = insertParams("status", statusArr[i]);
              localStorage.setItem("status", statusArr[i]);
            }
          }
        } else {
          window.location = removeURLParameter("status");
          localStorage.removeItem("status");
        }
      });
    });
  window.onload = () => {
    for (var i = 0; i < 3; i++) {
      var a = "status" + (i + 1);
      if (
        localStorage.getItem("status") != null &&
        localStorage.getItem("status") == statusArr[i]
      ) {
        document.querySelector(`input[id=${a}]`).checked = true;
      }
    }
  };
}

if (window.location.href.includes("/tai-nghe")) {
  const brandTotal = 5;
  document
    .querySelectorAll(".group-checkbox input[name=status]")
    .forEach((box) => {
      box.addEventListener("change", (e) => {
        if (box.checked) {
          e.preventDefault();
          for (var i = 0; i < 3; i++) {
            var a = "status" + (i + 1);
            if (box.getAttribute("id") == a) {
              window.location.search = insertParams("status", statusArr[i]);
              localStorage.setItem("status", statusArr[i]);
            }
          }
        } else {
          window.location = removeURLParameter("status");
          localStorage.removeItem("status");
        }
      });
    });

  document
    .querySelectorAll(".group-checkbox input[name=brand]")
    .forEach((box) => {
      box.addEventListener("change", (e) => {
        if (box.checked) {
          e.preventDefault();
          for (var i = 0; i < brandTotal; i++) {
            var a = "remember" + (i + 1);
            if (box.getAttribute("id") == a) {
              window.location.search = insertParams(
                "brand",
                brandHeadPhoneArr[i]
              );
              localStorage.setItem("brand", brandHeadPhoneArr[i]);
            }
          }
        } else {
          window.location = removeURLParameter("brand");
          localStorage.removeItem("brand");
        }
      });
    });
  window.onload = () => {
    for (var i = 0; i < 3; i++) {
      var a = "status" + (i + 1);
      if (
        localStorage.getItem("status") != null &&
        localStorage.getItem("status") == statusArr[i]
      ) {
        document.querySelector(`input[id=${a}]`).checked = true;
      }
    }
    for (var i = 0; i < brandTotal; i++) {
      var a = "remember" + (i + 1);
      if (
        localStorage.getItem("brand") != null &&
        localStorage.getItem("brand") == brandHeadPhoneArr[i]
      ) {
        document.querySelector(`input[id=${a}]`).checked = true;
      }
    }
  };
}

if (window.location.href.includes("/may-nghe-nhac")) {
  const brandTotal = 10;
  document
    .querySelectorAll(".group-checkbox input[name=status]")
    .forEach((box) => {
      box.addEventListener("change", (e) => {
        if (box.checked) {
          e.preventDefault();
          for (var i = 0; i < 3; i++) {
            var a = "status" + (i + 1);
            if (box.getAttribute("id") == a) {
              window.location.search = insertParams("status", statusArr[i]);
              localStorage.setItem("status", statusArr[i]);
            }
          }
        } else {
          window.location = removeURLParameter("status");
          localStorage.removeItem("status");
        }
      });
    });

  document
    .querySelectorAll(".group-checkbox input[name=brand]")
    .forEach((box) => {
      box.addEventListener("change", (e) => {
        if (box.checked) {
          e.preventDefault();
          for (var i = 0; i < brandTotal; i++) {
            var a = "remember" + (i + 1);
            if (box.getAttribute("id") == a) {
              window.location.search = insertParams("brand", brandPlayerArr[i]);
              localStorage.setItem("brand", brandPlayerArr[i]);
            }
          }
        } else {
          window.location = removeURLParameter("brand");
          localStorage.removeItem("brand");
        }
      });
    });
  window.onload = () => {
    for (var i = 0; i < 3; i++) {
      var a = "status" + (i + 1);
      if (
        localStorage.getItem("status") != null &&
        localStorage.getItem("status") == statusArr[i]
      ) {
        document.querySelector(`input[id=${a}]`).checked = true;
      }
    }
    for (var i = 0; i < brandTotal; i++) {
      var a = "remember" + (i + 1);
      if (
        localStorage.getItem("brand") != null &&
        localStorage.getItem("brand") == brandPlayerArr[i]
      ) {
        document.querySelector(`input[id=${a}]`).checked = true;
      }
    }
  };
}

if (window.location.href.includes("/loa")) {
  const brandTotal = 12;
  document
    .querySelectorAll(".group-checkbox input[name=status]")
    .forEach((box) => {
      box.addEventListener("change", (e) => {
        if (box.checked) {
          e.preventDefault();
          for (var i = 0; i < 3; i++) {
            var a = "status" + (i + 1);
            if (box.getAttribute("id") == a) {
              window.location.search = insertParams("status", statusArr[i]);
              localStorage.setItem("status", statusArr[i]);
            }
          }
        } else {
          window.location = removeURLParameter("status");
          localStorage.removeItem("status");
        }
      });
    });

  document
    .querySelectorAll(".group-checkbox input[name=brand]")
    .forEach((box) => {
      box.addEventListener("change", (e) => {
        if (box.checked) {
          e.preventDefault();
          for (var i = 0; i < brandTotal; i++) {
            var a = "remember" + (i + 1);
            if (box.getAttribute("id") == a) {
              window.location.search = insertParams(
                "brand",
                brandSpeakerArr[i]
              );
              localStorage.setItem("brand", brandSpeakerArr[i]);
            }
          }
        } else {
          window.location = removeURLParameter("brand");
          localStorage.removeItem("brand");
        }
      });
    });
  window.onload = () => {
    for (var i = 0; i < 3; i++) {
      var a = "status" + (i + 1);
      if (
        localStorage.getItem("status") != null &&
        localStorage.getItem("status") == statusArr[i]
      ) {
        document.querySelector(`input[id=${a}]`).checked = true;
      }
    }
    for (var i = 0; i < brandTotal; i++) {
      var a = "remember" + (i + 1);
      if (
        localStorage.getItem("brand") != null &&
        localStorage.getItem("brand") == brandSpeakerArr[i]
      ) {
        document.querySelector(`input[id=${a}]`).checked = true;
      }
    }
  };
}
if (window.location.href.includes("/microphone")) {
  const brandTotal = 4;
  document
    .querySelectorAll(".group-checkbox input[name=status]")
    .forEach((box) => {
      box.addEventListener("change", (e) => {
        if (box.checked) {
          e.preventDefault();
          for (var i = 0; i < 3; i++) {
            var a = "status" + (i + 1);
            if (box.getAttribute("id") == a) {
              window.location.search = insertParams("status", statusArr[i]);
              localStorage.setItem("status", statusArr[i]);
            }
          }
        } else {
          window.location = removeURLParameter("status");
          localStorage.removeItem("status");
        }
      });
    });

  document
    .querySelectorAll(".group-checkbox input[name=brand]")
    .forEach((box) => {
      box.addEventListener("change", (e) => {
        if (box.checked) {
          e.preventDefault();
          for (var i = 0; i < brandTotal; i++) {
            var a = "remember" + (i + 1);
            if (box.getAttribute("id") == a) {
              window.location.search = insertParams(
                "brand",
                brandMicrophoneArr[i]
              );
              localStorage.setItem("brand", brandMicrophoneArr[i]);
            }
          }
        } else {
          window.location = removeURLParameter("brand");
          localStorage.removeItem("brand");
        }
      });
    });
  window.onload = () => {
    for (var i = 0; i < 3; i++) {
      var a = "status" + (i + 1);
      if (
        localStorage.getItem("status") != null &&
        localStorage.getItem("status") == statusArr[i]
      ) {
        document.querySelector(`input[id=${a}]`).checked = true;
      }
    }
    for (var i = 0; i < brandTotal; i++) {
      var a = "remember" + (i + 1);
      if (
        localStorage.getItem("brand") != null &&
        localStorage.getItem("brand") == brandMicrophoneArr[i]
      ) {
        document.querySelector(`input[id=${a}]`).checked = true;
      }
    }
  };
}
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
