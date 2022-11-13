const car = document.getElementById('car');
// const road = document.getElementById('road');
const gameBackground = document.getElementById('background');

function raceAnimation() {
    // road.classList.add('roadAnimation')
    gameBackground.classList.add('raceAnimation')
}
function animationGame() {
    raceAnimation()
    carAnimation();
}

function stopAnimation() {
    gameBackground.classList.remove('raceAnimation')
    car.classList.remove('carSuspension')
}

function carAnimation() {
    car.classList.add('carSuspension')
  //car.classList.add('carJump');
}
// setTimeout(function() {
//     car.classList.remove('carJump')
// },300)
