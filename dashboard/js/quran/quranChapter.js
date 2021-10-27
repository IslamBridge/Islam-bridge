// DOM
const dangerBanner = document.getElementById("dangerBanner");
const chapterPage = document.getElementById("juz");
const bismillah = document.getElementById("bismillah");
const spinner = document.getElementById("spinner");
const tajweedColorsCheckBox = document.getElementById("tajweedColorsCheckBox");
const previousPageBtn = document.getElementById("previousPageBtn");
const nextPageBtn = document.getElementById("nextPageBtn");
const chapterTitleName = document.getElementById("chapterTitleName");
const chapterMapName = document.getElementById("chapterMapName");
const progressBar = document.getElementById("progressBar");
const nextChapterBtn = document.getElementById("nextChapterBtn");
const previousChapterBtn = document.getElementById("previousChapterBtn");

const clearChapterBox = () => {
  chapterPage.innerHTML = "";
};
const setLastLetterColorOn = (nodes, color) => {
  nodes.forEach((el) => {
    const quranText = el.innerHTML;
    el.innerHTML = `${quranText.substring(
      0,
      quranText.length - 2
    )} <span style='color: ${color};'>${quranText.charAt(quranText.length - 1)}</span>`;
  });
};
const setSecondLetterColorOn = (nodes, color) => {
  nodes.forEach((el) => {
    const quranText = el.innerHTML;
    el.innerHTML = `${quranText.charAt(0)}<span style='color: ${color};'>${quranText.charAt(
      1
    )}</span>${quranText.substring(2, quranText.length)}`;
  });
};
const setFirstLetterColorOn = (nodes, color) => {
  nodes.forEach((el) => {
    const quranText = el.innerHTML;
    el.innerHTML = `<span style='color: ${color};'>${quranText.charAt(0)}</span>${quranText.substring(
      1,
      quranText.length
    )}`;
  });
};
const setColorOn = (nodes, color) => {
  nodes.forEach((el) => (el.style.color = color));
};
const addingTajweedColors = () => {
  // Tajweed DOM
  const necessaryMadd = document.querySelectorAll(".madda_necessary");
  const obligatoryMadd = document.querySelectorAll(".madda_obligatory");
  const permissibleMadd = document.querySelectorAll(".madda_permissible");
  const normalMadd = document.querySelectorAll(".madda_normal");
  const ghunnah = document.querySelectorAll(".ghunnah");
  const ikhafa = document.querySelectorAll(".ikhafa");
  const ikhafaShafawi = document.querySelectorAll(".ikhafa_shafawi");
  const iqlab = document.querySelectorAll(".iqlab");
  const idghamWithoutGhunnah = document.querySelectorAll(".idgham_wo_ghunnah");
  const idghamShafawi = document.querySelectorAll(".idgham_shafawi");
  const idghamGhunnah = document.querySelectorAll(".idgham_ghunnah");
  const idghamMutajanisayn = document.querySelectorAll(".idgham_mutajanisayn");
  const idghamMutaqaribayn = document.querySelectorAll(".idgham_mutaqaribayn");
  const silent = document.querySelectorAll(".slnt");
  const qalaqah = document.querySelectorAll(".qalaqah");
  const laamShamsiyah = document.querySelectorAll(".laam_shamsiyah");
  const hamzaAlwasl = document.querySelectorAll(".ham_wasl");
  // madds
  setColorOn(necessaryMadd, "#9c3325");
  setColorOn(obligatoryMadd, "#f13421");
  setSecondLetterColorOn(permissibleMadd, "#fc721c");
  setColorOn(normalMadd, "#cb9927");

  // ikhafa - #438949 - green
  setColorOn(ghunnah, "#438949");
  setFirstLetterColorOn(ikhafa, "#438949");
  setFirstLetterColorOn(ikhafaShafawi, "#438949");
  setFirstLetterColorOn(iqlab, "#438949");

  setLastLetterColorOn(idghamGhunnah, "#438949"); // 2

  // idgham - #a8a296 - gray
  setSecondLetterColorOn(idghamWithoutGhunnah, "#a8a296");
  setSecondLetterColorOn(idghamShafawi, "#a8a296");
  setSecondLetterColorOn(idghamGhunnah, "#a8a296"); // 1
  setSecondLetterColorOn(idghamMutajanisayn, "#a8a296");
  setSecondLetterColorOn(idghamMutaqaribayn, "#a8a296");
  setColorOn(silent, "#a8a296");
  setColorOn(laamShamsiyah, "#a8a296");
  setColorOn(hamzaAlwasl, "#a8a296");

  // qalaqah - #3791c9 - blue
  setColorOn(qalaqah, "#3791c9");
};
const toArabicNumber = (number) => {
  const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return number
    .toString()
    .split("")
    .map((num) => arabicNumbers[num])
    .join("");
};
const renderChapter = (chapterText) => {
  const html = `<h1 class="quran m-auto">${chapterText}</h1>`;
  chapterPage.insertAdjacentHTML("beforeend", html);
};
const renderPageEnd = (pageNum) => {
  const html = `
    <div id="chapterPageEnd" class="d-flex justify-content-center">
      <h6 class=" chapterPageNum text-muted ">page ${pageNum}</h6>
      </div>
      `;
  chapterPage.insertAdjacentHTML("beforeend", html);
};
const maxMinBtnCheck = (currentPage, minChapterPage, maxChapterPage, btn) => {
  if (btn === "page") {
    if (maxChapterPage <= currentPage) nextPageBtn.classList.add("disabled");
    else nextPageBtn.classList.remove("disabled");
    if (minChapterPage >= currentPage) previousPageBtn.classList.add("disabled");
    else previousPageBtn.classList.remove("disabled");
  } else if (btn === "chapter") {
    if (maxChapterPage <= currentPage) nextChapterBtn.classList.add("disabled");
    else nextChapterBtn.classList.remove("disabled");
    if (minChapterPage >= currentPage) previousChapterBtn.classList.add("disabled");
    else previousChapterBtn.classList.remove("disabled");
  }
};
const updateChapterTitle = (chapterName) => {
  chapterTitleName.innerHTML = chapterName;
  chapterMapName.innerHTML = chapterName;
};
const displayProgressBar = (boolean) => {
  boolean ? (progressBar.parentNode.style.display = "flex") : (progressBar.parentNode.style.display = "none");
};
const updateProgressBar = (minPage, maxPages, currentPage) => {
  if (maxPages - minPage < 3) return displayProgressBar(false);
  displayProgressBar(true);
  const Percentage = Math.round((100 / (maxPages - minPage)) * (currentPage - minPage));
  progressBar.style.width = `${Percentage}%`;
  progressBar.innerHTML = `${Percentage}%`;
};

const printTajweedChapter = async (chapterInfo) => {
  if (chapterInfo.bismillah_pre) bismillah.classList.remove("d-none");
  spinner.classList.add("d-none");

  const apiPath = "https://api.quran.com/api/v4/quran/verses/uthmani_tajweed";
  let currentPage = chapterInfo.pages[0];
  let maxPages = chapterInfo.pages[1];

  while (currentPage <= maxPages) {
    let output = "";
    // const quranPage = await fetch(`https://api.quran.com/api/v4/quran/verses/uthmani_tajweed?verse_key=24%3A35`)
    const quranPage = await fetch(`${apiPath}?chapter_number=${chapterInfo.id}&page_number=${currentPage}`)
      .then((response) => response.json())
      .then((data) => data.verses)
      .catch((err) => {
        spinner.classList.remove("d-none");
        dangerBanner.classList.remove("d-none");
      });
    quranPage.forEach((el) => (output = output + el.text_uthmani_tajweed));
    renderChapter(output);
    renderPageEnd(currentPage);
    currentPage++;
  }
  addingTajweedColors();
};
const printUthmaniPage = async (chapterNumber, pageNum, addBismillah) => {
  const apiPath = "https://api.quran.com/api/v4/quran/verses/uthmani";
  if (addBismillah) bismillah.classList.remove("d-none");
  else bismillah.classList.add("d-none");

  let output = "";

  const quranPage = await fetch(`${apiPath}?page_number=${pageNum}&chapter_number=${chapterNumber}`)
    .then((response) => response.json())
    .then((data) => data.verses)
    .catch((err) => {
      spinner.classList.remove("d-none");
      dangerBanner.classList.remove("d-none");
    });
  let verseIndex = quranPage[0].verse_key.split(":")[1];
  quranPage.forEach(
    (el) => (output = output + el.text_uthmani + `<span class="end"> ${toArabicNumber(verseIndex++)}</span> `)
  );

  clearChapterBox();
  renderChapter(output);
  renderPageEnd(pageNum);
};

const pageBtnFunctionality = (chapterInfo, currentPage) => {
  const minPage = chapterInfo.pages[0];
  const maxPage = chapterInfo.pages[1];
  maxMinBtnCheck(currentPage, minPage, maxPage, "page");
  let bismillah = minPage === currentPage && chapterInfo.bismillah_pre ? true : false;
  printUthmaniPage(chapterInfo.id, currentPage, bismillah);
  updateProgressBar(minPage, maxPage, currentPage);
};

const chapterBtnFunctionality = (allChaptersInfo, chapterNum, nextPrev) => {
  //   const maxChapter = allChaptersInfo[allChaptersInfo.length - 1].id;
  //   const minChapter = allChaptersInfo[0].id;
  //   if (nextPrev === "next") {
  //     const newChapterInfo = allChaptersInfo[chapterNum];
  //     printUthmaniPage(newChapterInfo.id, newChapterInfo.pages[0], newChapterInfo.bismillah_pre);
  //   } else if (nextPrev === "previous") {
  //     printUthmaniPage(2, 2, true);
  //   }
  //   maxMinBtnCheck(chapterNum, minChapter, maxChapter, "chapter");
  //   // console.log(allChaptersInfo[chapterNum]);
};

const printChapter = async (chapterNumber) => {
  spinner.classList.add("d-none");
  const allChaptersInfo = await fetch(`https://api.quran.com/api/v4/chapters`)
    .then((response) => response.json())
    .then((data) => data.chapters)
    .catch((err) => {
      spinner.classList.remove("d-none");
      dangerBanner.classList.remove("d-none");
    });
  const chapterInfo = await fetch(`https://api.quran.com/api/v4/chapters/${chapterNumber}`)
    .then((response) => response.json())
    .then((data) => data.chapter)
    .catch((err) => {
      spinner.classList.remove("d-none");
      dangerBanner.classList.remove("d-none");
    });

  let currentPage = chapterInfo.pages[0];
  const minChapterPage = chapterInfo.pages[0];
  const maxChapter = allChaptersInfo[allChaptersInfo.length - 1].id;
  const maxChapterPage = chapterInfo.pages[1];
  const minChapter = allChaptersInfo[0].id;

  updateChapterTitle(chapterInfo.name_simple);
  maxMinBtnCheck(currentPage, minChapterPage, maxChapterPage, "page");
  maxMinBtnCheck(chapterNumber, minChapter, maxChapter, "chapter");
  updateProgressBar(minChapterPage, maxChapterPage, currentPage);

  printUthmaniPage(chapterNumber, currentPage, chapterInfo.bismillah_pre);

  previousPageBtn.addEventListener("click", () => {
    --currentPage;
    pageBtnFunctionality(chapterInfo, currentPage);
  });

  nextPageBtn.addEventListener("click", () => {
    ++currentPage;
    pageBtnFunctionality(chapterInfo, currentPage);
  });

  // nextChapterBtn.addEventListener("click", () => {
  //   chapterBtnFunctionality(allChaptersInfo, chapterNumber, "next");
  // });
  // previousChapterBtn.addEventListener("click", () => {
  //   chapterBtnFunctionality(allChaptersInfo, chapterNumber, "previous");
  // });
};

const init = () => {
  printChapter(2);

  // if (tajweedColorsCheckBox.checked) {
  //   printTajweedChapter(fetchChapterInfo);
  // } else {
  //   printChapter(fetchChapterInfo);
  // }

  // tajweedColorsCheckBox.addEventListener("click", (e) => {
  //   setTimeout(() => {
  //     if (tajweedColorsCheckBox.checked) {
  //       clearChapterBox();
  //       printTajweedChapter(fetchChapterInfo);
  //     } else {
  //       clearChapterBox();
  //       printChapter(fetchChapterInfo);
  //     }
  //   }, 3000);
  // });
};

init();
