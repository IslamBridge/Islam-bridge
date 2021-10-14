// DOM elements
// Policies
const termsAndConditions = document.querySelector(".termsAndConditions");
const privacyPolicy = document.querySelector(".privacyPolicy");
const disclaimer = document.querySelector(".disclaimer");
const acceptableUsePolicy = document.querySelector(".acceptableUsePolicy");

// Pagination
const previousBtn = document.querySelectorAll(".pagination-previous");
const oneBtn = document.querySelectorAll(".pagination-one");
const twoBtn = document.querySelectorAll(".pagination-two");
const threeBtn = document.querySelectorAll(".pagination-three");
const fourBtn = document.querySelectorAll(".pagination-four");
const nextBtn = document.querySelectorAll(".pagination-next");

// Arrays
const policiesArray = [termsAndConditions, privacyPolicy, disclaimer, acceptableUsePolicy];
const pagArray = [previousBtn, oneBtn, twoBtn, threeBtn, fourBtn, nextBtn];
const pagNumArray = [oneBtn, twoBtn, threeBtn, fourBtn];

// Code
// Btn calsses adding function
const className = (element, className, removeOrAdd) => {
  if (removeOrAdd === "remove") element.forEach((el) => el.classList.remove(className));
  if (removeOrAdd === "add") element.forEach((el) => el.classList.add(className));
};

// 1) removing and adding classes function
const seePage = (Pagenum) => {
  // 1) removing classes
  policiesArray.forEach((el) => el.classList.add("d-none"));
  pagArray.forEach((el) => {
    className(el, "active", "remove");
    className(el, "disabled", "remove");
  });

  // 2) Adding new classes
  if (Pagenum === 1) className(previousBtn, "disabled", "add");
  else if (Pagenum === 4) className(nextBtn, "disabled", "add");
  className(pagNumArray[Pagenum - 1], "active", "add");
  policiesArray[Pagenum - 1].classList.remove("d-none");
};

// 2) Checking Url for #number
let currentPage = 1;
if (window.location.href.split("#").length === 2) {
  const urlNumber = window.location.href.split("#")[1];
  if (urlNumber !== "") {
    if (urlNumber >= 1 && urlNumber <= 4) {
      currentPage = urlNumber;
      seePage(urlNumber);
    }
  }
}

// 3) Pagination code
pagArray.forEach((el) =>
  el.forEach((el) => {
    el.addEventListener("click", (e) => {
      const btnContent = e.target.innerHTML;
      if (+btnContent) {
        currentPage = +btnContent;
      } else {
        if (btnContent === "Previous" && currentPage > 1) currentPage--;
        else if (btnContent === "Next" && currentPage < 4) currentPage++;
      }
      seePage(currentPage);
    });
  })
);
