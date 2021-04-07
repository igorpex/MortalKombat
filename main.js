const $arenas = document.querySelector('.arenas');

subZero = {
    name: 'SubZero',
    hp: 50,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif'
};

scorpion = {
    name: 'Scorpion',
    hp: 20,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif'
};

function createPlayer(playerNumber, playerObject) {
    const $player = document.createElement('div');
    $player.classList.add(playerNumber);
    $arenas.appendChild($player);

    const $progressbar = document.createElement('div');
    $progressbar.classList.add('progressbar');
    $player.appendChild($progressbar);

    const $life = document.createElement('div');
    $life.classList.add('life')
    $life.style.width = (String(playerObject.hp) + '%');
    $progressbar.appendChild($life);

    const $name = document.createElement('div');
    $name.innerHTML = playerObject.name;
    $name.classList.add('name');
    $progressbar.appendChild($name);

    const $character = document.createElement('div');
    $character.classList.add('character');
    const $img = document.createElement('img');
    $img.src = playerObject.img;
    $player.appendChild($character);
    $character.appendChild($img);
}
createPlayer('player1', subZero)
createPlayer('player2', scorpion)
