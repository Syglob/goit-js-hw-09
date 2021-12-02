function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
timer = null;
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

btnStart.addEventListener('click', randomPageColor);
btnStop.addEventListener('click', () => {
  clearInterval(timer);
  if (btnStop) {
    btnStart.disabled = false;
  }
});
//
function randomPageColor() {
  timer = setInterval(() => {
    const color = getRandomHexColor();
    document.body.style.backgroundColor = color;
  }, 1000);
  if (btnStart) {
    btnStart.disabled = true;
  }
}
//----------------------------------------------------------------------------------------------------------------------
// class ColorRandomizer {
//   constructor({ btnStart, btnStop, timer }) {
//     btnStart = this.btnStart = document.querySelector('[data-start]');
//     btnStop = this.btnStop = document.querySelector('[data-stop]');
//     timer = this.timer = null;
//   }

//   init() {
//     this.btnStart.addEventListener('click', this.randomPageColor);
//     this.btnStop.addEventListener('click', () => {
//       clearInterval(this.timer);
//       if (this.btnStop) {
//         this.btnStart.disabled = false;
//       }
//     });
//   }

//   randomPageColor() {
//     this.timer = setInterval(() => {
//       const color = getRandomHexColor();
//       document.body.style.backgroundColor = color;
//     }, 1000);
//     if (this.btnStart) {
//       this.btnStart.disabled = true;
//     }
//   }
// }
