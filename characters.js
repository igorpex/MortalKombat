//fighter characters
export const characters = {
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