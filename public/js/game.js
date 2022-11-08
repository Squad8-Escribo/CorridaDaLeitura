const car = document.getElementById('car');
// const road = document.getElementById('road');
const gameBackground = document.getElementById('background');

function raceAnimation() {
    // road.classList.add('roadAnimation')
    gameBackground.classList.add('roadAnimation')
}
function animationGame() {
    raceAnimation()
    carAnimation();
}

function carAnimation() {
    car.classList.add('carSuspension')
  //car.classList.add('carJump');
}
// setTimeout(function() {
//     car.classList.remove('carJump')
// },300)
