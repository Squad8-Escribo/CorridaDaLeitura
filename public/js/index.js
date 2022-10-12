const canvas = document.getElementById("game_screen");
const context = canvas.getContext("2d");
const width = canvas.getAttribute('width');
const height = canvas.getAttribute('height');

const bgImage = new Image();
const logoImage = new Image();
const playImage = new Image();
const instructImage = new Image();
const settingsImage = new Image();

logoImage.src = "public/img/logo.png";
playImage.src = "public/img/play.png";
instructImage.src = "public/img/instruct.png";
settingsImage.src = "public/img/settings.png";

var buttonX = [100,150,200,250];
var buttonY = [100,100,100,100];
var buttonWidth = [20,20,20,20];
var buttonHeight = [20,20,20,20];

logoImage.onload = function(){
     context.drawImage(logoImage, 55, 10, 200, 80);
 }

playImage.onload = function(){
    context.drawImage(playImage, buttonX[0], buttonY[0], buttonWidth[0], buttonHeight[0]);
}

instructImage.onload = function(){
    context.drawImage(instructImage, buttonX[1], buttonY[1], buttonWidth[0], buttonHeight[0]);
}

settingsImage.onload = function(){
    context.drawImage(settingsImage, buttonX[2], buttonY[2], buttonWidth[0], buttonHeight[0]);
}
