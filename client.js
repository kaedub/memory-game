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
    var card_back_image_url = "https://images.pexels.com/photos/376533/pexels-photo-376533.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";

    // Game state variables
    var score = 0;
    var stagedCards = []; // store index-id of face-up cards
    var found = []; // store index-id of found cards

    function returnToMenu() {
        document.getElementById("menu-screen").style.display = 'flex';
        document.getElementById("game-screen").style.display = 'none';    
    }
    // deal cards creates the card elements
    // <div class="card">
    //   <img src="https0&w=1260" alt="">
    // </div>
    var dealCards = function () {
        var gameboard = document.getElementById("gameboard");
        for (let i = 0; i < 25; i++) {
            let card = document.createElement("div");
            let id = (i < 12 ? i+1 : i)
            if (i !== 12) {
                let cardback = document.createElement("img");
                cardback.setAttribute("src",card_back_image_url);
                cardback.className = "card-back";
                let cardface = document.createElement("img");
                cardface.setAttribute("src", giftable[id]);
                cardface.style.display = "none";
                cardface.className = "card-face";
                card.appendChild(cardback);
                card.appendChild(cardface);
                card.setAttribute("class", "card");
                card.setAttribute("id", id);
                card.addEventListener("click", cardOnClick);
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
    function flipFaceDown () {
        for (let id of arguments) {
            document.getElementById(id).children[1].style.display = "none";
            document.getElementById(id).children[0].style.display = "inline-block";
        }
    }
    function flipFaceUp () {
        for (let id of arguments) {
            document.getElementById(id).children[1].style.display = "inline-block";
            document.getElementById(id).children[0].style.display = "none";
        }
    }
    // a closure is used to give "cardOnClick" access to "giftable"
    var cardOnClick = function () {
        
        // reject duplicate clicks on all face up cards
        if (stagedCards.includes(this.id) || found.includes(this.id)) {
            console.log("duplicate click");
            return;
        }

        // If 2 cards are visible (staged), they are put face down before another card is flipped
        // unless they are a match
        if (stagedCards.length >= 2) {
            // is a match?
            let previousGif = giftable[stagedCards[0]];
            let currentGif = giftable[stagedCards[1]];
            
            if (previousGif === currentGif) {
                // if a match add to array of found cards
                console.log("Found a match");
                found = found.concat(stagedCards);
            } else {
                // not a match, flip both cards to face down, increase score
                flipFaceDown(stagedCards[0], stagedCards[1]);
                score++;
                // update score
                document.getElementById('score-value').innerText = score;
            }
            // no more cards are staged
            stagedCards = [];
        }

        // this card is now a "staged card" as it is face up
        stagedCards.push(this.id);
        // flip this card face up
        flipFaceUp(this.id);        

        // if this was the last card, you win
        if (found.length >= 24) setTimeout(function() {alert("You win!")}, 2000);
    }
    
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


// Menu Image Slideshow
setInterval(changeMenuGIF, 1200);
var gifindex = 0;
function changeMenuGIF() {
    var img = document.getElementById("menu-image");
    img.setAttribute("src", GIFURLS[gifindex]);
    gifindex = (gifindex + 1) % GIFURLS.length;
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
