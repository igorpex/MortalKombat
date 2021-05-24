import { characters } from './characters.js'
import { LOGS, HITPOWERS, BODYAREAS } from './constants/index.js';
import { getRandom, createElement } from './utils/index.js';
import Player from './Player/index.js';
//import { characters, logs, BODYAREAS, };

//DOM Objects to work with
const $arenas = document.querySelector('.arenas');
const $fightButton = document.querySelector('.buttonWrap');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');



// //generate player2(Enemy) attack randomly
// const randomAttack = () => {
//     const hit = BODYAREAS[getRandom(3) - 1];
//     const defence = BODYAREAS[getRandom(3) - 1];
//     return {
//         value: getRandom(HITPOWERS[hit]),
//         hit,
//         defence,
//     }
// }

// //make player1 attack based on form 
// function playerAttack($formFight) {
//     var value, hit, defence;
//     for (let item of $formFight) {
//         if (item.checked && item.name === 'hit') {
//             value = getRandom(HITPOWERS[item.value]);
//             hit = item.value;
//             item.checked = false;
//         }
//         if (item.checked && item.name === 'defence') {
//             defence = item.value;
//             item.checked = false;
//         }
//     }
//     return {
//         value,
//         hit,
//         defence,
//     }
// }



//main logic
class Game {

    start = function() {
        const character1 = 'scorpion';
        const character2 = 'subzero';
        const player1 = new Player(Object.assign(characters[character1], { player: 1 }));
        const player2 = new Player(Object.assign(characters[character2], { player: 2 }));

        $arenas.appendChild(player1.createPlayer());
        $arenas.appendChild(player2.createPlayer());

        this.generateLogs('start', player1, player2, 0);

        //check the Fight button
        $formFight.addEventListener('submit', (e) => {
            e.preventDefault();

            //generate player2(Enemy) attack randomly
            const enemy = this.randomAttack();

            //from form, read for player1: 1) type of attack 2) type of defence, 3) generate random attack value based on type of attack
            const attack = this.playerAttack($formFight);
            //const attack = randomAttack(); //just for test cases for quick clicks

            //in-fight logic
            this.fightLogic(player1, player2, attack, enemy);

            //game finish
            if (this.checkEnd(player1, player2)) {
                $formFight[6].disabled = true;
                this.chooseWinner(player1, player2);
                this.createReloadButton();
            }
        })

    }
    //main fight logics
    fightLogic = (player1, player2, attack, enemy) => {
        if (attack.hit !== enemy.defence) {
            player2.changeHP(attack.value);
            this.generateLogs('hit', player1, player2, attack.value);
            player2.renderHP();
        } else {
            this.generateLogs('defence', player1, player2, 0)
        }
        //check if player2(enemy) hits player1
        if (enemy.hit !== attack.defence) {
            player1.changeHP(enemy.value);
            this.generateLogs('hit', player2, player1, enemy.value);
            player1.renderHP();
        } else {
            this.generateLogs('defence', player2, player1, 0);
        }
    }
    //fight logs generator
    generateLogs = (type, playerKick, playerDefence, hpDiff) => {
        const messageNumber = getRandom(LOGS[type].length) - 1;
        let date = new Date();
        let time = date.getHours() + ':' + String(date.getMinutes()).padStart(2, '0') + ':' + String(date.getSeconds()).padStart(2, '0');
        let text = '';
        let el = `<p>${text}</p>`
        switch (type) {
            case 'start':
                text = LOGS[type].replace('[player1]', playerKick.name).replace('[player2]', playerDefence.name).replace('[time]', time);
                el = `<p>${text}</p>`
                break;
            case 'end':
                text = LOGS[type][messageNumber].replace('[playerWins]', playerKick.name).replace('[playerLose]', playerDefence.name);
                el = `<p>${time} - ${text}</p>`;
                break;
            case 'hit':
                text = LOGS[type][messageNumber].replace('[playerKick]', playerKick.name).replace('[playerDefence]', playerDefence.name);
                el = `<p>${time} - ${text} - ${hpDiff} [${playerDefence.hp}/100]</p>`;
                break;
            case 'defence':
                text = LOGS[type][messageNumber].replace('[playerKick]', playerKick.name).replace('[playerDefence]', playerDefence.name);
                el = `<p>${time} - ${text} - ${hpDiff} [${playerDefence.hp}/100]</p>`;
                break;
            case 'draw':
                text = LOGS[type][messageNumber];
                el = `<p>${time} - ${text}</p>`;
                break;
        }
        $chat.insertAdjacentHTML('afterbegin', el);

    }

    //generate player2(Enemy) attack randomly
    randomAttack = () => {
        const hit = BODYAREAS[getRandom(3) - 1];
        const defence = BODYAREAS[getRandom(3) - 1];
        return {
            value: getRandom(HITPOWERS[hit]),
            hit,
            defence,
        }
    }
    //make player1 attack based on form 
    playerAttack = ($formFight) => {
        var value, hit, defence;
        for (let item of $formFight) {
            if (item.checked && item.name === 'hit') {
                value = getRandom(HITPOWERS[item.value]);
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

    //checking if game should be finished
    checkEnd = (player1, player2) => {
        if (player1.hp == 0 || player2.hp == 0) {
            return true;
        }
        return false;
    }

    //choose winner
    chooseWinner = (player1, player2) => {
        var winner;
        if (player1.hp == 0 && player2.hp > 0) {
            winner = player2.name + ' wins';
            this.generateLogs('end', player2, player1);
        }
        else if (player1.hp > 0 && player2.hp == 0) {
            winner = player1.name + ' wins';
            this.generateLogs('end', player1, player2);
        }
        else {
            winner = 'Draw';
            this.generateLogs('draw');
        };
        const $winTitle = createElement('div', 'winTitle');
        $winTitle.innerHTML = winner;
        $arenas.appendChild($winTitle);
    }

    //create Reload button after game finish
    createReloadButton = () => {
        const $reloadButtonDiv = createElement('div', 'reloadWrap');
        const $reloadButton = createElement('button', 'button');
        $reloadButton.innerText = 'Reload';

        $reloadButton.addEventListener('click', function () {
            window.location.reload();
        });

        $reloadButtonDiv.appendChild($reloadButton);
        $arenas.appendChild($reloadButtonDiv);
    }
}

const game = new Game();
game.start();
