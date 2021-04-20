import { characters } from './characters.js'
import { logs } from './logs.js';
import { getRandom, createElement } from './utils.js';
//import { characters, logs, bodyAreas, };

//DOM Objects to work with
const $arenas = document.querySelector('.arenas');
const $fightButton = document.querySelector('.buttonWrap');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

////attack variables
//attack powers
const hitPowers = {
    head: 30,
    body: 25,
    foot: 20,
}
//body areas
const bodyAreas = ['head', 'body', 'foot'];

//create player objects and add players to the field
const initialazePlayers = (character1, character2) => {
    const player1 = {
        player: 1,
        elHP,
        renderHP,
        changeHP,
    }
    Object.assign(player1, characters[character1]);

    const player2 = {
        player: 2,
        elHP,
        renderHP,
        changeHP,
    }
    Object.assign(player2, characters[character2]);

    $arenas.appendChild(createPlayer(player1));
    $arenas.appendChild(createPlayer(player2));
    generateLogs('start', player1, player2, 0);
    return [player1, player2];
}

//add players to the field
const createPlayer = (playerObject) => {
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
const randomAttack = () => {
    const hit = bodyAreas[getRandom(3) - 1];
    const defence = bodyAreas[getRandom(3) - 1];
    return {
        value: getRandom(hitPowers[hit]),
        hit,
        defence,
    }
}

//makre player1 attack based on form 
function playerAttack($formFight) {
    var value, hit, defence;
    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            value = getRandom(hitPowers[item.value]);
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
function fightLogic(player1, player2, attack, enemy) {
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
    const $playerLife = this.elHP;
    this.hp -= damage;
    if (this.hp < 0) {
        this.hp = 0;
    }
}

//fight logs generator
const generateLogs = (type, playerKick, playerDefence, hpDiff) => {
    const messageNumber = getRandom(logs[type].length) - 1;
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
            el = `<p>${time} - ${text}</p>`;
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
const checkEnd = (player1, player2) => {
    if (player1.hp == 0 || player2.hp == 0) {
        return true;
    }
    return false;
}

//choose winner
const chooseWinner = (player1, player2) => {
    var winner;
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
const createReloadButton = () => {
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
    const [player1, player2] = initialazePlayers('scorpion', 'subzero');

    //check the Fight button
    $formFight.addEventListener('submit', function (e) {
        e.preventDefault();

        //generate player2(Enemy) attack randomly
        const enemy = randomAttack();

        //from form, read for player1: 1) type of attack 2) type of defence, 3) generate random attack value based on type of attack
        const attack = playerAttack($formFight);
        //const attack = randomAttack(); //just for test cases for quick clicks

        //in-fight logic
        fightLogic(player1, player2, attack, enemy);

        //game finish
        if (checkEnd(player1, player2)) {
            $formFight[6].disabled = true;
            chooseWinner(player1, player2);
            createReloadButton();
        }
    })
}

main();
