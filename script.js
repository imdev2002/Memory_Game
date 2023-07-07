//Variables declaration
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const cards = [
  {
    name: "luffy",
    url: "images/luffy.jpg",
  },
  {
    name: "zoro",
    url: "images/zoro.jpg",
  },
  {
    name: "usopp",
    url: "images/usopp.jpg",
  },
  {
    name: "sanji",
    url: "images/sanji.jpg",
  },
  {
    name: "nami",
    url: "images/nami.jpg",
  },
  {
    name: "chopper",
    url: "images/chopper.jpg",
  },
  {
    name: "robin",
    url: "images/robin.png",
  },
  {
    name: "franky",
    url: "images/franky.jpg",
  },
  {
    name: "brook",
    url: "images/brook.jpg",
  },
  {
    name: "jinbei",
    url: "images/jinbei.png",
  },
];

function run() {
  const cardMerge = cards.concat(cards).sort(() => 0.5 - Math.random());
  let count = 0;
  let previousCard = "";
  let firstGuess = "";
  let secondGuess = "";
  const delay = 1000;
  let cardsLength = cardMerge.length;

  const grid = $(".grid");
  grid.innerHTML = "";
  cardMerge.forEach((item) => {
    const card = document.createElement("div");
    const front = document.createElement("div");
    front.classList.add("front");
    const back = document.createElement("div");
    back.classList.add("back");

    card.classList.add("card");
    card.dataset.name = item.name;
    back.style.backgroundImage = `url(./${item.url})`;
    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
  });

  grid.addEventListener("click", function (e) {
    const clicked = e.target;
    if (clicked.tagName === "SECTION" || previousCard === clicked) return;
    if (count < 2) {
      count++;
      if (count === 1) {
        firstGuess = clicked.dataset.name;
        clicked.classList.add("selected");
      } else {
        secondGuess = clicked.dataset.name;
        clicked.classList.add("selected");
      }
      if (firstGuess && secondGuess) {
        if (firstGuess === secondGuess) setTimeout(matchingCard, delay);
        setTimeout(resetGuess, delay);
      }
      previousCard = clicked;
    }
    if (clicked.matches(".notify__btn")) run();
  });

  function matchingCard() {
    const selects = $$(".selected");
    [...selects].forEach((item) => item.classList.add("matched"));
  }

  function resetGuess() {
    const selects = $$(".selected");
    [...selects].forEach((item) => item.classList.remove("selected"));
    count = 0;
    firstGuess = "";
    secondGuess = "";
    previousCard = "";
    finishGame();
  }

  function finishGame() {
    const matchedLength = $$(".matched").length;
    if (matchedLength === cardsLength) {
      const notifyBoard = document.createElement("div");
      notifyBoard.classList.add("notify");
      grid.appendChild(notifyBoard);
      const notifyBoardTitle = document.createElement("h2");
      notifyBoardTitle.classList.add("notify__title");
      notifyBoardTitle.innerHTML = "Victory";
      notifyBoard.appendChild(notifyBoardTitle);
      const centerLine = document.createElement("div");
      centerLine.classList.add("center");
      notifyBoard.appendChild(centerLine);
      const notifyBoardBtn = document.createElement("span");
      notifyBoardBtn.classList.add("notify__btn");
      centerLine.appendChild(notifyBoardBtn);
      notifyBoardBtn.innerHTML = `<i class="fa-solid fa-rotate-right notify__btn-icon"></i>`;
    }
  }
}

run();
