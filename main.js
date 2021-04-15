const $arenas = document.querySelector('.arenas');
const $fightButton = document.querySelector('.buttonWrap');
const $formFight = document.querySelector('.control');
let winner = "No winner";

const characters = {
    subzero: {
        name: 'SubZero',
        hp: 100,
        img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
        weapon: ['ice'],
        attack: function () {
            console.log(this.name + 'Fight...');
        },
    },
    scorpion: {
        name: 'Scorpion',
        hp: 100,
        img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
        weapon: ['fire'],
        attack: function () {
            console.log(this.name + ' Fight...');
        },
    },
    kitana: {
        name: 'Kitana',
        hp: 100,
        img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
        weapon: ['boobs'],
        attack: function () {
            console.log(this.name + ' Fight...');
        },
    },
    liukang: {
        name: 'LiuKang',
        hp: 100,
        img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
        weapon: ['legs'],
        attack: function () {
            console.log(this.name + ' Fight...');
        },
    },
    sonya: {
        name: 'Sonya',
        hp: 100,
        img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
        weapon: ['face'],
        attack: function () {
            console.log(this.name + ' Fight...');
        },
    }
}

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}

const ATTACK = ['head', 'body', 'foot'];

function elHP() {
    return document.querySelector('.player' + this.player + ' .life');
}

function renderHP() {
    this.elHP().style.width = this.hp + '%';
}

function changeHP(damage) {
    $playerLife = this.elHP;
    this.hp -= damage;
    if (this.hp < 0) {
        this.hp = 0;
    }
}

function createElement(tag, className) {
    $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
};

function createPlayer(playerObject) {
    const $player = createElement('div', 'player' + playerObject.player);
    const $progressbar = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    $life.style.width = (String(playerObject.hp) + '%');
    const $name = createElement('div', 'name');
    $name.innerHTML = playerObject.name;
    const $character = createElement('div', 'character');
    const $img = createElement('img');
    $img.src = playerObject.img;

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img);
    $player.appendChild($progressbar);
    $player.appendChild($character);
    //playerObject.attack();
    return $player;
}

function checkEnd() {
    if (player1.hp == 0 || player2.hp == 0) {
        return true;
    }
    return false;
}

function chooseWinner() {
    if (player1.hp == 0 && player2.hp > 0) {
        winner = player2.name + ' wins';
    }
    else if (player1.hp > 0 && player2.hp == 0) {
        winner = player1.name + ' wins';
    }
    else {
        winner = 'Draw';
    };
    const $winTitle = createElement('div', 'winTitle');
    $winTitle.innerHTML = winner;
    $arenas.appendChild($winTitle);
}

function getRandom(base) {
    return Math.ceil(Math.random() * base);
}

function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];
    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}

function createReloadButton() {
    const $reloadButtonDiv = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText = 'Reload';

    $reloadButton.addEventListener('click', function () {
        window.location.reload();
    });

    $reloadButtonDiv.appendChild($reloadButton);
    $arenas.appendChild($reloadButtonDiv);
}


player1 = {
    player: 1,
    elHP,
    renderHP,
    changeHP,
}
Object.assign(player1, characters.subzero);

player2 = {
    player: 2,
    elHP,
    renderHP,
    changeHP,
}
Object.assign(player2, characters.scorpion);


$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

$formFight.addEventListener('submit', function (e) {
    e.preventDefault();
    const enemy = enemyAttack();

    const attack = {};

    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
            item.checked = false;
        }
        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
            item.checked = false;
        }
    }

    if (enemy.hit != attack.defence) {
        player1.changeHP(enemy.value);
    }
    if (attack.hit != enemy.defence) {
        player2.changeHP(attack.value);
    }
    player1.renderHP();
    player2.renderHP();

    if (checkEnd()) {
        $formFight[6].disabled = true;
        chooseWinner();
        createReloadButton();
    }
})