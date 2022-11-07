const car = document.getElementById('car');
const sky = document.getElementById('sky');
const road = document.getElementById('road');

function skyAnimation() {
    sky.classList.add('skyAnimation');
}

function roadAnimation() {
    road.classList.add('roadAnimation')
}

function carAnimation() {
    car.classList.add('carSuspension')
  //car.classList.add('carJump');
}
// setTimeout(function() {
//     car.classList.remove('carJump')
// },300)


function AnimationGame() {
    skyAnimation();
    roadAnimation();
    carAnimation();
}

function carAnimation() {
    car.classList.add('carSuspension')
  //car.classList.add('carJump');
}
// setTimeout(function() {
//     car.classList.remove('carJump')
// },300)
