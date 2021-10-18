//https://quran.api-docs.io/v4/quran/quran-verses-indopak

/*



*/
// DOM
const chapterPage = document.getElementById("page");
const dangerBanner = document.getElementById("dangerBanner");

const toArabicNumber = (number) => {
  const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return number
    .toString()
    .split("")
    .map((num) => arabicNumbers[num])
    .join("");
};

const getPageEnd = (pageNum) => {
  return `
 <div id="chapterPageEnd" class="d-flex justify-content-center">
 <h6 class=" chapterPageNum text-muted ">page ${pageNum}</h6>
</div>
 `;
};
const makeChapterHtml = (chapterText, addBismillah) => {
  return `
  ${addBismillah ? '<h1 class="quran line-1 m-auto">بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ</h1>' : ""}
  <h1 class=" quran line-1 m-auto">${chapterText}</h1>    `;
};

const printchapter = async (chapterInfo) => {
  // getting every page and rendering it with page end
  const makeCompleteChaptHtml = async (pages) => {
    let currentPage = pages[0];
    let chapterIndex = 0;
    let fullPageChapter = "";

    while (pages[1] >= currentPage) {
      const fetchChapter = await fetch(
        `https://api.quran.com/api/v4/quran/verses/imlaei?page_number=${currentPage}&chapter_number=${chapterInfo.id}`
      )
        .then((response) => response.json())
        .then((data) => data.verses)
        .catch((err) => dangerBanner.classList.remove("d-none"));

      const pageChapterText = fetchChapter
        .map((el) => el.text_imlaei + ` ${toArabicNumber(++chapterIndex)} `)
        .join("");

      fullPageChapter = fullPageChapter + (pageChapterText + getPageEnd(currentPage++));
    }
    return fullPageChapter;
  };

  console.log(chapterInfo);

  const completeChapterHtml = makeChapterHtml(
    await makeCompleteChaptHtml(chapterInfo.pages),
    chapterInfo.bismillah_pre
  );
  chapterPage.insertAdjacentHTML("beforeend", completeChapterHtml);
};

const init = async () => {
  const fetchChapterInfo = await fetch("https://api.quran.com/api/v4/chapters/2")
    .then((response) => response.json())
    .then((data) => data.chapter)
    .catch((err) => dangerBanner.classList.remove("d-none")); // TODO: CHANGE THIS TO DESPLAYING ERROR BANNER

  printchapter(fetchChapterInfo);
};

init();
