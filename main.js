const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
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

player1 = characters['subzero'];
player1.player = 1;
player1.elHP = function () {
    return document.querySelector('.player' + this.player + ' .life');
};
player1.changeHP = function (damage) {
    $playerLife = this.elHP;
    //damage = Math.ceil(Math.random() * 20);
    this.hp -= damage;
    if (this.hp < 0) {
        this.hp = 0;
    };
};
player1.renderHP = function () {
    this.elHP().style.width = this.hp + '%';
};


player2 = characters['scorpion'];
player2.player = 2;
player2.elHP = function () {
    return document.querySelector('.player' + this.player + ' .life');
};
player2.changeHP = function (damage) {
    $playerLife = this.elHP;
    //damage = Math.ceil(Math.random() * 20);
    this.hp -= damage;
    if (this.hp < 0) {
        this.hp = 0;
    }
};
player2.renderHP = function () {
    this.elHP().style.width = this.hp + '%';
};


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

//function changeHP(player) {
//$playerLife = document.querySelector('.player' + player.player + ' .life');
//damage = Math.ceil(Math.random() * 20);
//player.hp -= damage;
//if (player.hp < 0) {
//    player.hp = 0;
//}
//$playerLife.style.width = player.hp + '%';
//};

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

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

$randomButton.addEventListener('click', function () {
    //changeHP(player1);
    //changeHP(player2);
    player1.changeHP(Math.ceil(Math.random() * 20));
    player2.changeHP(Math.ceil(Math.random() * 20));
    player1.renderHP();
    player2.renderHP();
    if (checkEnd()) {
        $randomButton.disabled = true;
        chooseWinner();
    };
});
