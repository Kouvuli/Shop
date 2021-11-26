const element = document.querySelector(".pagination ul");
let totalPages = 20;
const key = "page";
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

if (window.location.search != "") {
  element.innerHTML = createPagination(totalPages, parseInt(params.page));
} else {
  element.innerHTML = createPagination(totalPages, 1);
}
function createPagination(totalPages, page) {
  let liTag = "";
  let active;
  let beforePage = page - 1;
  let afterPage = page + 1;
  if (page > 1) {
    liTag += `<li ><a onclick="insertParam(key,${
      page - 1
    })" ><i class='bx bxs-chevron-left'></i></a></li>`;
  }
  if (page > 2) {
    liTag += `<li  ><a onclick="insertParam(key,1)" >1</a></li>`;
    if (page > 3) {
      liTag += `<li class="dots"><span>...</span></li>`;
    }
  }
  if (page == totalPages) {
    beforePage = beforePage - 2;
  } else if (page == totalPages - 1) {
    beforePage = beforePage - 1;
  }
  if (page == 1) {
    afterPage = afterPage + 2;
  } else if (page == 2) {
    afterPage = afterPage + 1;
  }
  for (var plength = beforePage; plength <= afterPage; plength++) {
    if (plength > totalPages) {
      continue;
    }
    if (plength == 0) {
      plength = plength + 1;
    }
    if (page == plength) {
      active = "active";
    } else {
      active = "";
    }
    liTag += `<li  ><a onclick="insertParam(key,${plength})" class=${active} >${plength}</a></li>`;
  }
  if (page < totalPages - 1) {
    if (page < totalPages - 2) {
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    liTag += `<li ><a onclick="insertParam(key,${totalPages})" >${totalPages}</a></li>`;
  }
  if (page < totalPages) {
    liTag += `<li ><a  onclick="insertParam(key,${
      page + 1
    })" ><i class='bx bxs-chevron-right'></i></a></li>`;
  }
  element.innerHTML = liTag;

  return liTag;
}

function insertParam(key, value) {
  key = encodeURIComponent(key);
  value = encodeURIComponent(value);
  if (window.location.search == "") {
    window.location.search = key + "=" + value;
  } else {
    // kvp looks like ['key1=value1', 'key2=value2', ...]
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

    // can return this or...
    let params = kvp.join("&");

    // reload page with new params
    document.location.search = params;
  }
}
