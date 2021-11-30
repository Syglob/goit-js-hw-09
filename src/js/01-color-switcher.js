function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
timer = null;
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

//
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
