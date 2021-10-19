//https://quran.api-docs.io/v4/quran/quran-verses-indopak

/*



*/
// DOM
const chapterPage = document.getElementById("page");
const dangerBanner = document.getElementById("dangerBanner");

// const toArabicNumber = (number) => {
//   const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
//   return number
//     .toString()
//     .split("")
//     .map((num) => arabicNumbers[num])
//     .join("");
// };

// const printchapter = async (chapterInfo) => {
//   // getting every page and rendering it with page end
//   const makeCompleteChaptHtml = async (pages) => {
//     let currentPage = pages[0];
//     let chapterIndex = 0;
//     let fullPageChapter = "";

//     while (pages[1] >= currentPage) {
//       const fetchChapter = await fetch(
//         `https://api.quran.com/api/v4/quran/verses/imlaei?page_number=${currentPage}&chapter_number=${chapterInfo.id}`
//       )
//         .then((response) => response.json())
//         .then((data) => data.verses)
//         .catch((err) => dangerBanner.classList.remove("d-none"));

//       const pageChapterText = fetchChapter
//         .map((el) => el.text_imlaei + ` ${toArabicNumber(++chapterIndex)} `)
//         .join("");

//       fullPageChapter = fullPageChapter + (pageChapterText + getPageEnd(currentPage++));
//     }
//     return fullPageChapter;
//   };

//   console.log(chapterInfo);

//   const completeChapterHtml = makeChapterHtml(
//     await makeCompleteChaptHtml(chapterInfo.pages),
//     chapterInfo.bismillah_pre
//   );
//   chapterPage.insertAdjacentHTML("beforeend", completeChapterHtml);
// };
const getPageEnd = (pageNum) => {
  return `
    <div id="chapterPageEnd" class="d-flex justify-content-center">
    <h6 class=" chapterPageNum text-muted ">page ${pageNum}</h6>
</div>
    `;
};
const makeChapterHtml = (chapterText, font = "") => {
  return `<h1 class="${font} quran line-1 m-auto">${chapterText}</h1>`;
};
const pringNewPageFont = (pageNum) => {
  const html = `
  <style>
  @font-face {
    font-family: "p${pageNum}-v1";
    src: url("https://cdn.jsdelivr.net/gh/quran/quran.com-images/res/fonts/QCF_P${(pageNum + "").padStart(
      3,
      "0"
    )}.TTF")
      format("trueType");
    font-display: swap;
  }

  .p${pageNum}-v1 {
    font-family: "p${pageNum}-v1";
  }
</style>
`;
  chapterPage.insertAdjacentHTML("beforeend", html);
};

const printVerse = async (chapterInfo) => {
  let page = chapterInfo.pages[0];
  let maxPages = chapterInfo.pages[1];
  let output = "";

  let i = 0;
  while (page <= maxPages) {
    const quranPage = await fetch(`https://api.quran.com/api/v4/quran/verses/code_v1?page_number=${page}`)
      .then((response) => response.json())
      .then((data) => data.verses)
      .catch((err) => dangerBanner.classList.remove("d-none"));

    quranPage.forEach((el) => {
      // calculating bismilah
      //   if (el.verse_key === `${chapterInfo.id}:1` && el.code_v1 === null) {
      //     console.log("bismilah");
      //   } else {
      //     console.log("last");
      //   }
      console.log(el);
      output = output + el.code_v1;
    });

    pringNewPageFont(page);
    chapterPage.insertAdjacentHTML("beforeend", makeChapterHtml(output, `p${page}-v1`));

    ++page;
  }
  console.log(chapterInfo);
};

const init = async () => {
  //   printchapter(fetchChapterInfo);
  const fetchChapterInfo = await fetch("https://api.quran.com/api/v4/chapters/1")
    .then((response) => response.json())
    .then((data) => data.chapter)
    .catch((err) => dangerBanner.classList.remove("d-none"));

  printVerse(fetchChapterInfo);
};

init();

/*
// https://api.quran.com/api/v4/quran/verses/code_v1?chapter_number=1 
this is a whole chapter number 1 
every 2 verses ids is one line 

{
 {
  "verses": [
    {
      "id": 1,
      "verse_key": "1:1",
      "code_v1": "ﭑ ﭒ ﭓ ﭔ ﭕ",
      "v1_page": 1
    },
    {
      "id": 2,
      "verse_key": "1:2",
      "code_v1": "ﭖ ﭗ ﭘ ﭙ ﭚ",
      "v1_page": 1
    },
    {
      "id": 3,
      "verse_key": "1:3",
      "code_v1": "ﭛ ﭜ ﭝ",
      "v1_page": 1
    },
    {
      "id": 4,
      "verse_key": "1:4",
      "code_v1": "ﭞ ﭟ ﭠ ﭡ",
      "v1_page": 1
    },
    {
      "id": 5,
      "verse_key": "1:5",
      "code_v1": "ﭢ ﭣ ﭤ ﭥ ﭦ",
      "v1_page": 1
    },
    {
      "id": 6,
      "verse_key": "1:6",
      "code_v1": "ﭧ ﭨ ﭩ ﭪ",
      "v1_page": 1
    },
    {
      "id": 7,
      "verse_key": "1:7",
      "code_v1": "ﭫ ﭬ ﭭ ﭮ ﭯ ﭰ ﭱ ﭲ ﭳ ﭴ",
      "v1_page": 1
    }
  ]
}

*/
