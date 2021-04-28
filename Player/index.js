import { createElement } from '../utils/index.js';

class Player {
    constructor(props) {
        this.player = props.player;
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
        this.weapon = props.weapon;
        this.attack = props.attack;
        this.selector = `player${this.player}`;
    }

    elHP = () => {
        return document.querySelector(`.${this.selector} .life`);
    }
    renderHP = () => {
        this.elHP().style.width = this.hp + '%';
    }
    changeHP = (damage) => {
        const $playerLife = this.elHP;
        this.hp -= damage;
        if (this.hp < 0) {
            this.hp = 0;
        }
    }

    //add players to the field
    createPlayer = () => {
        const $player = createElement('div', this.selector);
        const $progressbar = createElement('div', 'progressbar');
        const $life = createElement('div', 'life');
        $life.style.width = (String(this.hp) + '%');
        const $name = createElement('div', 'name');
        $name.innerHTML = this.name;
        const $character = createElement('div', 'character');
        const $img = createElement('img');
        $img.src = this.img;

        $progressbar.appendChild($life);
        $progressbar.appendChild($name);
        $character.appendChild($img);
        $player.appendChild($progressbar);
        $player.appendChild($character);
        //playerObject.attack();
        return $player;
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
}
export default Player;