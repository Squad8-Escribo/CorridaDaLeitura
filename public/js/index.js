const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");
const width = canvas.getAttribute('width');
const height = canvas.getAttribute('height');

const bgImage = new Image();
const logoImage = new Image();
const playImage = new Image();
const instructImage = new Image();
const settingsImage = new Image();

logoImage.src = "../img/logo.png";
playImage.src = "../img/play.png";
instructImage.src = "../img/instruct.png";
settingsImage.src = "../img/settings.png";
