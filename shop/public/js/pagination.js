const element = document.querySelector(".pagination ul");
let totalPages = 20;
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
    liTag += `<li ><a href="?page=${
      page - 1
    }" ><i class='bx bxs-chevron-left'></i></a></li>`;
  }
  if (page > 2) {
    liTag += `<li><a href="?page=1" >1</a></li>`;
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
    liTag += `<li  ><a href="?page=${plength}" class=${active} >${plength}</a></li>`;
  }
  if (page < totalPages - 1) {
    if (page < totalPages - 2) {
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    liTag += `<li ><a href="?page=${totalPages}" >${totalPages}</a></li>`;
  }
  if (page < totalPages) {
    liTag += `<li ><a  href="?page=${
      page + 1
    }" ><i class='bx bxs-chevron-right'></i></a></li>`;
  }
  element.innerHTML = liTag;

  return liTag;
}
