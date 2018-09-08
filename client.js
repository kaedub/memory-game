function createGifUrls() {
    // this is next line is a bit of a hard coded hack... not proud of it
    // a python script generates array into a text file and i copy-pasted it (not scalable solution at all)
    var urls = [];
    for (let i=0; i<74; i++) {
        urls.push("./resources/gif" + i + ".gif");
    }
    return urls;
}

GIFURLS = createGifUrls();

var card_face_image_url = "https://images.pexels.com/photos/376533/pexels-photo-376533.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";

// Menu Image Slideshow
setInterval(changeMenuGIF, 500);
var gifindex = 0;
function changeMenuGIF() {
    var img = document.getElementById("menu-image");
    img.setAttribute("src", GIFURLS[gifindex]);
    gifindex = (gifindex + 1) % GIFURLS.length;
}

// Start button event handler is used as the game environment
var startBtn = document.querySelector(".menu button");
startBtn.addEventListener("click", runGame);
function runGame() {
    clearGameboard();
    console.log("Game running...");
    // Hide menu screen and show game screen
    document.getElementById("menu-screen").style.display = 'none';
    document.getElementById("game-screen").style.display = 'block';

    // Create a table for randomized gifs
    var giftable = createGifTable();

    // Game state variables
    var score = 0;
    var moves = 0;
    var stagedCards = [];
    var found = [];

    // a closure is used to give "flipCard" access to "giftable"
    var flipCard = function () {

        // reject duplicate clicks
        if (stagedCards.includes(this.id) || found.includes(this.id)) {
            console.log("duplicate click");
            return;
        }

        // player is making a move (flipping a card)
        moves++;

        // reveal the face of the card
        var card = document.getElementById(this.id);
        var img = card.children[0];
        img.setAttribute("src", giftable[this.id]);

        // if 2 cards on the table are visible, they are put face down before another card is flipped
        if (stagedCards.length >= 2) {
            document.getElementById(stagedCards[0]).children[0].setAttribute("src", card_face_image_url);
            document.getElementById(stagedCards[1]).children[0].setAttribute("src", card_face_image_url);
            stagedCards = [];
            moves = 1;
        }
        // the current card is now a "staged card" because it is face up
        stagedCards.push(this.id);

        // if this is the second card flip check for match and increase score
        if (moves === 2) {
            score++;
            document.getElementById('score-value').innerText = score;
            let previousGif = giftable[stagedCards[0]];
            let currentGif = giftable[this.id];
            if (previousGif === currentGif) {
                console.log("Found a match");
                found = found.concat(stagedCards);
                stagedCards = [];
            }
            moves = 0;
        }

        // if all cards are found, you win
        if (found.length >= 24) setTimeout(function() {alert("You win!")}, 2000);
    }
    // a closure is used in "dealCards" to allow access "flipCard" while assigning an event listener to each card
    // deal cards creates the card elements
    // <div class="card"><img src="https0&w=1260" alt=""></div>
    var dealCards = function () {
        var gameboard = document.getElementById("gameboard");
        for (let i = 0; i < 25; i++) {
            let card = document.createElement("div");
            let id = (i < 12 ? i+1 : i)
            if (i !== 12) {
                let cardbg = document.createElement("img");
                cardbg.setAttribute("src",card_face_image_url);
                card.appendChild(cardbg);
                card.setAttribute("class", "card");
                card.setAttribute("id", id);
                card.addEventListener("click", flipCard);
            } else {
                let p1 = document.createElement("p");
                let p2 = document.createElement("p");
                p1.innerText = "SCORE";
                p2.innerText = 0;
                p2.setAttribute("id", "score-value");
                card.appendChild(p1);
                card.appendChild(p2);
                card.setAttribute("class", "score-card");
            }
            gameboard.appendChild(card);
        }
    };
    dealCards();    
}

function returnToMenu() {
    document.getElementById("menu-screen").style.display = 'flex';
    document.getElementById("game-screen").style.display = 'none';    
}

function clearGameboard() {
    var board = document.getElementById('gameboard');
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
}

// create a table of gifs key,value => id,url
function createGifTable() {
    var gifset = new Set();
    while (gifset.size < 12) {
        let url = GIFURLS[getRandomInt(GIFURLS.length)];
        gifset.add(url);
    }
    var gifarray = Array.from(gifset);
    var gifarray = gifarray.concat(gifarray);
    var shuffled = shuffle(gifarray);
    giftable = {};
    for (var i=0; i<24; i++) {
        giftable[i+1] = shuffled[i];
    }
    return giftable;
 }

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

 // Fisher-Yates Shuffle
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
