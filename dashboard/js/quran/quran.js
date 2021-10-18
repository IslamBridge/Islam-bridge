// DOM
const spinner = document.getElementById("spinner");
const allChaptersBox = document.getElementById("allSurahat");
const searchBox = document.getElementById("searchBox");

const makeChapterCardHtml = (el) => {
  console.log(el);
  return `<a href="/chapter/${el.id}" class="surah col-lg-4  col-md-6 col-sm-12">
  <div class="surah-card mt-3">
      <div class="surah-card__number">${el.id}</div>
          <div class="surah-card__text">
              <div class="surah-card__latin">
                  <h5>${el.name_arabic}</h5>
                  <div class="ayah-number-wrapper">
                  <p class="english">${el.name_simple}</p>
              </div>
          </div>
      </div>
  </div>
</a>`;
};

const printQuranChapters = async function (quranChapters) {
  // console.log(quranChapters);
  const quranChaptersHtml = quranChapters.map((el) => makeChapterCardHtml(el)).join("");
  allChaptersBox.insertAdjacentHTML("afterbegin", quranChaptersHtml);
  spinner.classList.add("d-none");
};

const search = async (quranChapters) => {
  searchBox.addEventListener("keyup", () => {
    allChaptersBox.innerHTML = ""; // Cleaning chapters box

    // 1) Printing all Quran chapter in case nothing in in search box
    if (searchBox.value === "") return printQuranChapters(quranChapters);

    // 2) Searching for chapters
    quranChapters.forEach((el) => {
      if (
        el.name_simple
          .replaceAll(" ", "")
          .replaceAll("-", "")
          .toLowerCase()
          .split(searchBox.value.replaceAll(" ", "").toLowerCase()).length >= 2 ||
        el.name_arabic
          .replaceAll(" ", "")
          .replaceAll("-", "")
          .toLowerCase()
          .split(searchBox.value.replaceAll(" ", "").toLowerCase()).length >= 2
      ) {
        allChaptersBox.insertAdjacentHTML("beforeEnd", makeChapterCardHtml(el));
      }
    });

    // 3) If there is no chapters found
    if (allChaptersBox.innerHTML === "") {
      allChaptersBox.insertAdjacentHTML(
        "beforeEnd",
        `<li class="search-listDiv-ul-notFound">Sorry, we didn't found this surah. Try typing the number instead!</li>` // TODO: change error
      );
    }
  });
};

const init = async () => {
  const quranChapters = await fetch("https://api.quran.com/api/v4/chapters")
    .then((response) => response.json())
    .then((data) => data.chapters)
    .catch((err) => console.error(err));

  printQuranChapters(quranChapters);
  search(quranChapters);
};

init();

/* 
  {
    "id": 1,
    "name": "الفاتحة",
    "transliteration": "Al-Fatihah",
    "type": "meccan",
    "total_verses": 7,
    "link": "https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/chapters/1.json"
  }
  {
  "id": 1,
  "name": "الفاتحة",
  "transliteration": "Al-Fatihah",
  "type": "meccan",
  "total_verses": 7,
  "verses": [
    {
      "id": 1,
      "text": "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ",
      "transliteration": "Bismi Allahi alrrahmani alrraheemi"
    },
    {
      "id": 2,
      "text": "ٱلۡحَمۡدُ لِلَّهِ رَبِّ ٱلۡعَٰلَمِينَ",
      "transliteration": "Alhamdu lillahi rabbi alAAalameena"
    },
    {
      "id": 3,
      "text": "{
  "id": 1,
  "name": "الفاتحة",
  "transliteration": "Al-Fatihah",
  "type": "meccan",
  "total_verses": 7,
  "verses": [
    {
      "id": 1,
      "text": "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ",
      "transliteration": "Bismi Allahi alrrahmani alrraheemi"
    },
    {
      "id": 2,
      "text": "ٱلۡحَمۡدُ لِلَّهِ رَبِّ ٱلۡعَٰلَمِينَ",
      "transliteration": "Alhamdu lillahi rabbi alAAalameena"
    },
    {
      "id": 3,
      "text": "ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ",
      "transliteration": "Alrrahmani alrraheemi"
    },
    {
      "id": 4,
      "text": "مَٰلِكِ يَوۡمِ ٱلدِّينِ",
      "transliteration": "Maliki yawmi alddeeni"
    },
    {
      "id": 5,
      "text": "إِيَّاكَ نَعۡبُدُ وَإِيَّاكَ نَسۡتَعِينُ",
      "transliteration": "Iyyaka naAAbudu waiyyaka nastaAAeenu"
    },
    {
      "id": 6,
      "text": "ٱهۡدِنَا ٱلصِّرَٰطَ ٱلۡمُسۡتَقِيمَ",
      "transliteration": "Ihdina alssirata almustaqeema"
    },
    {
      "id": 7,
      "text": "صِرَٰطَ ٱلَّذِينَ أَنۡعَمۡتَ عَلَيۡهِمۡ غَيۡرِ ٱلۡمَغۡضُوبِ عَلَيۡهِمۡ وَلَا ٱلضَّآلِّينَ",
      "transliteration": "Sirata allatheena anAAamta AAalayhim ghayri almaghdoobi AAalayhim wala alddalleena"
    }
  ]
}",
      "transliteration": "Alrrahmani alrraheemi"
    },
    {
      "id": 4,
      "text": "مَٰلِكِ يَوۡمِ ٱلدِّينِ",
      "transliteration": "Maliki yawmi alddeeni"
    },
    {
      "id": 5,
      "text": "إِيَّاكَ نَعۡبُدُ وَإِيَّاكَ نَسۡتَعِينُ",
      "transliteration": "Iyyaka naAAbudu waiyyaka nastaAAeenu"
    },
    {
      "id": 6,
      "text": "ٱهۡدِنَا ٱلصِّرَٰطَ ٱلۡمُسۡتَقِيمَ",
      "transliteration": "Ihdina alssirata almustaqeema"
    },
    {
      "id": 7,
      "text": "صِرَٰطَ ٱلَّذِينَ أَنۡعَمۡتَ عَلَيۡهِمۡ غَيۡرِ ٱلۡمَغۡضُوبِ عَلَيۡهِمۡ وَلَا ٱلضَّآلِّينَ",
      "transliteration": "Sirata allatheena anAAamta AAalayhim ghayri almaghdoobi AAalayhim wala alddalleena"
    }
  ]
}

<a href="/index" class="surah col-lg-4 col-sm-12">
    <div class="surah-card mt-3">
        <div class="surah-card__number">index</div>
            <div class="surah-card__text">
                <div class="surah-card__latin">
                    <h5>surah name</h5>
                    <div class="ayah-number-wrapper">
                    <p class="english">meaning surah name</p>
                </div>
            </div>
        </div>
    </div>
</a> 
*/
