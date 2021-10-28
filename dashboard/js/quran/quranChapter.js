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
const nextChapterName = document.getElementById("nextChapterName");
const prevChapterName = document.getElementById("previousChapterName");
const tajweedColors = document.getElementById("tajweedColors");

// Settings
let tajweedSwitch = false; // TODO: add dynamic value to local storage

const tajweedSwitchCheck = () => {
  if (tajweedColorsCheckBox.checked) {
    tajweedSwitch = true;
  } else {
    tajweedSwitch = false;
  }
};
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
  const qalqalah = document.querySelectorAll(".qalaqah");
  const laamShamsiyah = document.querySelectorAll(".laam_shamsiyah");
  const hamzaAlwasl = document.querySelectorAll(".ham_wasl");
  // madds
  setColorOn(necessaryMadd, "#862e9c");
  setColorOn(obligatoryMadd, "#c92a2a");
  setSecondLetterColorOn(permissibleMadd, "#fc721c");
  setColorOn(normalMadd, "#9d8500");

  // ikhafa - #438949 - green
  setColorOn(ghunnah, "#438949");
  setFirstLetterColorOn(ikhafa, "#438949");
  setFirstLetterColorOn(ikhafaShafawi, "#438949");
  setFirstLetterColorOn(iqlab, "#438949");

  setLastLetterColorOn(idghamGhunnah, "#438949"); // 2

  // idgham - #adb5bd - gray
  const gray = "#adb5bd";
  setSecondLetterColorOn(idghamWithoutGhunnah, gray);
  setSecondLetterColorOn(idghamShafawi, gray);
  setSecondLetterColorOn(idghamGhunnah, gray); // 1
  setSecondLetterColorOn(idghamMutajanisayn, gray);
  setSecondLetterColorOn(idghamMutaqaribayn, gray);
  setColorOn(silent, gray);
  setColorOn(laamShamsiyah, gray);
  setColorOn(hamzaAlwasl, gray);

  // qalqalah - #3791c9 - blue
  setColorOn(qalqalah, "#1c7ed6");
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
const printUthmaniTajweedPage = async (chapterNumber, pageNum, addBismillah) => {
  const apiPath = "https://api.quran.com/api/v4/quran/verses/uthmani_tajweed";
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

  quranPage.forEach((el) => (output = output + el.text_uthmani_tajweed));

  clearChapterBox();
  renderChapter(output);
  renderPageEnd(pageNum);
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
const printPage = (chapterNumber, pageNum, addBismillah) => {
  if (tajweedSwitch) {
    printUthmaniTajweedPage(chapterNumber, pageNum, addBismillah);
    tajweedColors.classList.remove("d-none");
  } else {
    printUthmaniPage(chapterNumber, pageNum, addBismillah);
    tajweedColors.classList.add("d-none");
  }
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
};
const printChapterBtnTitle = (allChaptersInfo, chapterNum) => {
  // Btn under title
  nextChapterName.innerHTML = allChaptersInfo[chapterNum]?.name_simple || " ";
  prevChapterName.innerHTML = allChaptersInfo[chapterNum - 2]?.name_simple || " ";
};
const chapterBtnFunctionality = (allChaptersInfo, chapterNum, direction) => {
  const chapterInfo = allChaptersInfo[chapterNum - 1];
  const bismillah = chapterInfo.bismillah_pre ? true : false;
  printPage(chapterNum, chapterInfo.pages[0], bismillah);
  updateProgressBar(chapterInfo.pages[0], chapterInfo.pages[1], chapterInfo.pages[0]);
  maxMinBtnCheck(chapterNum, 1, 114, "chapter");
  updateChapterTitle(chapterInfo.name_simple);
  printChapterBtnTitle(allChaptersInfo, chapterNum);
};
const pageBtnFunctionality = (allChapterInfo, chapterNum, currentPage) => {
  const chapterInfo = allChapterInfo[chapterNum - 1];
  const minPage = chapterInfo.pages[0];
  const maxPage = chapterInfo.pages[1];
  maxMinBtnCheck(currentPage, minPage, maxPage, "page");
  let bismillah = minPage === currentPage && chapterInfo.bismillah_pre ? true : false;
  printPage(chapterInfo.id, currentPage, bismillah);
  updateProgressBar(minPage, maxPage, currentPage);
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
  printPage(chapterNumber, currentPage, chapterInfo.bismillah_pre);
  printChapterBtnTitle(allChaptersInfo, chapterNumber);

  previousPageBtn.addEventListener("click", () => {
    --currentPage;
    pageBtnFunctionality(allChaptersInfo, chapterNumber, currentPage);
  });
  nextPageBtn.addEventListener("click", () => {
    ++currentPage;
    pageBtnFunctionality(allChaptersInfo, chapterNumber, currentPage);
  });

  nextChapterBtn.addEventListener("click", () => {
    ++chapterNumber;
    const minPage = allChaptersInfo[chapterNumber - 1].pages[0];
    const maxPage = allChaptersInfo[chapterNumber - 1].pages[1];
    currentPage = minPage;
    maxMinBtnCheck(currentPage, minPage, maxPage, "page");
    updateProgressBar(minPage, maxPage, currentPage);

    chapterBtnFunctionality(allChaptersInfo, chapterNumber, "next");
  });
  previousChapterBtn.addEventListener("click", () => {
    --chapterNumber;
    const minPage = allChaptersInfo[chapterNumber - 1].pages[0];
    const maxPage = allChaptersInfo[chapterNumber - 1].pages[1];
    currentPage = minPage;
    maxMinBtnCheck(currentPage, minPage, maxPage, "page");
    updateProgressBar(minPage, maxPage, currentPage);

    chapterBtnFunctionality(allChaptersInfo, chapterNumber, "prev");
  });

  tajweedColorsCheckBox.addEventListener("click", () => {
    tajweedSwitchCheck();
    const chapterInfo = allChaptersInfo[chapterNumber - 1];
    const bismillah = chapterInfo.pages[0] === currentPage && chapterInfo.bismillah_pre ? true : false;
    printPage(chapterNumber, currentPage, bismillah);
  });
};

const init = (chapterNumber) => {
  tajweedSwitchCheck();
  printChapter(chapterNumber);
};

init(31);
