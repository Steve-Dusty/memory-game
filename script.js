document.body.onload = makeBoard;

const BOARD_ROWS = 3

// You can configure your cards here.
// If two cards have the matching `relationship_id`, they are a pair.
const cards = [
    {
        image: false,
        content: "Dog",
        relationship_id: 1
    },
    {
        image: true,
        content: "images/dog",
        relationship_id: 1
    },
    {
        image: false,
        content: "Cat",
        relationship_id: 2
    },
    {
        image: true,
        content: "images/cat",
        relationship_id: 2
    },
    {
        image: false,
        content: "Ball",
        relationship_id: 3
    },
    {
        image: true,
        content: "images/ball",
        relationship_id: 3
    }
]

const board = document.getElementById('board')

let domEl = []

function makeBoard() {
    let uuid = 0
    shuffle(cards)
    board.style.display = 'grid';
    board.style.gridTemplateColumns = `repeat(${BOARD_ROWS}, auto)`

    cards.forEach(piece => {
        const div = document.createElement("div")
        div.setAttribute("id", "card")
        div.setAttribute("uuid", uuid++)
        console.log(uuid)
        div.style.backgroundColor = "lightgreen"
        div.addEventListener('click', flipCard)
        div.uuid = div.getAttribute('uuid')
        domEl.push(div)
        board.appendChild(div)
    })
}

let flipCount = 0
let activeCards = []
let imgCount = 0

function flipCard(evt) {
    domEl.forEach(el => {
        if (el.getAttribute('uuid') == evt.currentTarget.uuid) {
            if (flipCount < 2) {
                el.style.removeProperty('background-color')
                if (cards[domEl.indexOf(el)].image == true) {
                    if (imgCount == 0) {
                        let img = document.createElement('img')
                        img.style.width = "100%"
                        img.style.height = "100%"
                        img.style.objectFit = "cover"
                        img.setAttribute("src", cards[domEl.indexOf(el)].content)
                        el.appendChild(img)
                        imgCount++
                    }
                }
                else {
                    el.textContent = cards[domEl.indexOf(el)].content
                }
            }
            activeCards.push(el)
            flipCount++     

            if (flipCount == 2) {
                if (checkMatch(cards[domEl.indexOf(activeCards[0])], cards[domEl.indexOf(activeCards[1])]) === false) {
                    setTimeout(() => {
                        activeCards.forEach(activeCard => {
                            activeCard.style.backgroundColor = 'lightgreen'
                            activeCard.textContent = ""
                        })
                        flipCount = 0
                        activeCards = []
                    }, 1000)
                }

                else {
                    flipCount = 0
                    activeCards = []
                }
            }
        }
    })
}

function checkMatch(cardA, cardB) {
    if (cardA.relationship_id === cardB.relationship_id) {
        return true
    }
    return false
}

function restart() {
    location.reload()
}

// Fisher–Yates shuffle algorithm
function shuffle(array) {
    let m = array.length, t, i;
    while (m) {
      // Pick a remaining element
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
}
