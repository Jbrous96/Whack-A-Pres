const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const presidents = document.querySelectorAll('.president');
const partyChoice = document.getElementById('party-choice');
let lastHole;
let timeUp = false;
let score = 0;
let lastPresidentIndex = -1;
let oppositePartyFolder;

document.addEventListener('DOMContentLoaded', function() {
    const democratImages = ['democrats/42-clinton.jpg', 'democrats/44-obama.jpg', 'democrats/46-joe-biden.png'];

    function getRandomDemocratImage() {
        const randomIndex = Math.floor(Math.random() * democratImages.length);
        return `democrats/${democratImages[randomIndex]}`;
    }

    document.body.style.background = `url('${getRandomDemocratImage()}') bottom center no-repeat`;
    document.body.style.backgroundSize = 'cover';

    function randomTime(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    function randomHole(holes) {
        const idx = Math.floor(Math.random() * holes.length);
        const hole = holes[idx];
        if (hole === lastHole) {
            console.log('Ah nah thats the same one bud');
            return randomHole(holes);
        }
        lastHole = hole;
        return hole;
    }

    function setOppositePartyFolder() {
        const chosenParty = partyChoice.options[partyChoice.selectedIndex].value;
        oppositePartyFolder = chosenParty === 'democrats' ? 'republicans' : 'democrats';
    }

    function getRandomPresidentImage() {
        const presidentImages = 6; 
        let idx = Math.floor(Math.random() * presidentImages) + 1;
        while (idx === lastPresidentIndex) {
            idx = Math.floor(Math.random() * presidentImages) + 1;
        }
        lastPresidentIndex = idx;
        return `${oppositePartyFolder}/president${idx}.png`;
    }

    function peep() {
        const time = 1800; // Changed to 1.8 seconds for each president
        const hole = randomHole(holes);
        const presidentImage = getRandomPresidentImage();
        hole.querySelector('.president').style.backgroundImage = `url('${presidentImage}')`;
        hole.classList.add('up');
        setTimeout(() => {
            hole.classList.remove('up');
            if (!timeUp) peep();
        }, time);
    }

    function startGame() {
        setOppositePartyFolder(); 
        if (!oppositePartyFolder) {
            alert('Please select a political party.');
            return;
        }
        scoreBoard.textContent = 0;
        timeUp = false;
        score = 0;
        peep();
        setTimeout(() => timeUp = true, 10000)
    }

    function bonk(e) {
        if (!e.isTrusted) return;
        score++;
        this.parentNode.classList.remove('up');
        scoreBoard.textContent = score;
    }

presidents.forEach(president => president.addEventListener('click', bonk));
window.startGame = startGame;