//DOM Objects to work with
const $arenas = document.querySelector('.arenas');
const $fightButton = document.querySelector('.buttonWrap');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');
let winner = "No winner";

//fighter characters
const characters = {
    subzero: {
        name: 'SubZero',
        hp: 100,
        img: 'https://reactmarathon-api.herokuapp.com/assets/subzero.gif',
        weapon: ['ice'],
        attack: function () {
            console.log(this.name + 'Fight...');
        },
    },
    scorpion: {
        name: 'Scorpion',
        hp: 100,
        img: 'https://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
        weapon: ['fire'],
        attack: function () {
            console.log(this.name + ' Fight...');
        },
    },
    kitana: {
        name: 'Kitana',
        hp: 100,
        img: 'https://reactmarathon-api.herokuapp.com/assets/kitana.gif',
        weapon: ['boobs'],
        attack: function () {
            console.log(this.name + ' Fight...');
        },
    },
    liukang: {
        name: 'LiuKang',
        hp: 100,
        img: 'https://reactmarathon-api.herokuapp.com/assets/liukang.gif',
        weapon: ['legs'],
        attack: function () {
            console.log(this.name + ' Fight...');
        },
    },
    sonya: {
        name: 'Sonya',
        hp: 100,
        img: 'https://reactmarathon-api.herokuapp.com/assets/sonya.gif',
        weapon: ['face'],
        attack: function () {
            console.log(this.name + ' Fight...');
        },
    }
}

////attack variables
//attack powers
const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
//attack areas
const ATTACK = ['head', 'body', 'foot'];

//random number generator
function getRandom(base) {
    return Math.ceil(Math.random() * base);
}

//create player objects and add players to the field
function initialazePlayers(character1, character2) {
    player1 = {
        player: 1,
        elHP,
        renderHP,
        changeHP,
    }
    Object.assign(player1, characters[character1]);

    player2 = {
        player: 2,
        elHP,
        renderHP,
        changeHP,
    }
    Object.assign(player2, characters[character2]);

    $arenas.appendChild(createPlayer(player1));
    $arenas.appendChild(createPlayer(player2));
    generateLogs('start', player1, player2, 0);
}
function createElement(tag, className) {
    $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}
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

//generate player2(Enemy) attack randomly
function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];
    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}
//read type of attack and defence and generate attack value 
function playerAttack($formFight) {
    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            value = getRandom(HIT[item.value]);
            hit = item.value;
            item.checked = false;
        }
        if (item.checked && item.name === 'defence') {
            defence = item.value;
            item.checked = false;
        }
    }
    return {
        value,
        hit,
        defence,
    }
}

//main fight logics
function fightLogic(attack, enemy) {
    //check if player1(attacker) hits player2
    if (attack.hit !== enemy.defence) {
        player2.changeHP(attack.value);
        generateLogs('hit', player1, player2, attack.value);
        player2.renderHP();
    } else {
        generateLogs('defence', player1, player2, 0)
    }
    //check if player2(enemy) hits player1
    if (enemy.hit !== attack.defence) {
        player1.changeHP(enemy.value);
        generateLogs('hit', player2, player1, enemy.value);
        player1.renderHP();
    } else {
        generateLogs('defence', player2, player1, 0)
    }
}
//subfunctions for main fight logics 
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

//fight logs generator
function generateLogs(type, playerKick, playerDefence, hpDiff) {
    messageNumber = getRandom(logs[type].length) - 1;
    let date = new Date();
    let time = date.getHours() + ':' + String(date.getMinutes()).padStart(2, '0') + ':' + String(date.getSeconds()).padStart(2, '0');
    let text = '';
    let el = `<p>${text}</p>`
    switch (type) {
        case 'start':
            text = logs[type].replace('[player1]', playerKick.name).replace('[player2]', playerDefence.name).replace('[time]', time);
            el = `<p>${text}</p>`
            break;
        case 'end':
            text = logs[type][messageNumber].replace('[playerWins]', playerKick.name).replace('[playerLose]', playerDefence.name);
            el = `<p>${time} - ${text}`;
            break;
        case 'hit':
            text = logs[type][messageNumber].replace('[playerKick]', playerKick.name).replace('[playerDefence]', playerDefence.name);
            el = `<p>${time} - ${text} - ${hpDiff} [${playerDefence.hp}/100]</p>`;
            break;
        case 'defence':
            text = logs[type][messageNumber].replace('[playerKick]', playerKick.name).replace('[playerDefence]', playerDefence.name);
            el = `<p>${time} - ${text} - ${hpDiff} [${playerDefence.hp}/100]</p>`;
            break;
        case 'draw':
            text = logs[type][messageNumber];
            el = `<p>${time} - ${text}</p>`;
            break;
    }
    $chat.insertAdjacentHTML('afterbegin', el);

}

//checking if game should be finished
function checkEnd() {
    if (player1.hp == 0 || player2.hp == 0) {
        return true;
    }
    return false;
}

//choose winner
function chooseWinner() {
    if (player1.hp == 0 && player2.hp > 0) {
        winner = player2.name + ' wins';
        generateLogs('end', player2, player1);
    }
    else if (player1.hp > 0 && player2.hp == 0) {
        winner = player1.name + ' wins';
        generateLogs('end', player1, player2);
    }
    else {
        winner = 'Draw';
        generateLogs('draw');
    };
    const $winTitle = createElement('div', 'winTitle');
    $winTitle.innerHTML = winner;
    $arenas.appendChild($winTitle);
}

//create Reload button after game finish
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

//main logic
function main() {

    //create players and put to the field
    initialazePlayers('scorpion', 'subzero')

    //check the Fight button
    $formFight.addEventListener('submit', function (e) {
        e.preventDefault();

        //generate player2(Enemy) attack randomly
        const enemy = enemyAttack();

        //from form, read for player1: 1) type of attack 2) type of defence, 3) generate random attack value based on type of attack
        const attack = playerAttack($formFight);

        //in-fight logic
        fightLogic(attack, enemy);

        //game finish
        if (checkEnd()) {
            $formFight[6].disabled = true;
            chooseWinner();
            createReloadButton();
        }
    })
}

main();
