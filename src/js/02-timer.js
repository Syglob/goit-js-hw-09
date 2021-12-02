// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

// import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const datePick = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');
const currentDate = new Date();
let targetDate = null;
let timerId = null;

//

//
initFlatpickr();

startBtn.addEventListener('click', () => {
  Timer.start();
});

//----------------------------------------------------------------------------------------------------------------------
function initFlatpickr() {
  if (datePick) {
    flatpickr(datePick, {
      enableTime: true,
      defaultDate: new Date(),
      time_24hr: true,
      altInput: true,
      altFormat: 'F j, Y H:i K',
      dateFormat: 'Y-m-d H:i:s',
      minuteIncrement: 1,
      onClose(selectedDates) {
        targetDate = selectedDates[0];
        startBtn.disabled = true;
        if (selectedDates[0] <= currentDate) {
          startBtn.disabled = true;
          Notify.failure('Mama mia, только не в пошлом!');
        } else {
          startBtn.disabled = false;
          Notify.success('Corecto!');
        }
        console.log(selectedDates[0]);
      },
    });
  }
}

//------------------------------------------------------------------------------

const Timer = {
  start() {
    const startTime = targetDate;
    timerId = setInterval(() => {
      startBtn.disabled = true;
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const timeObj = convertMs(deltaTime);
      dateFormat(timeObj);
      if (startTime <= currentTime) {
        clearInterval(timerId);
        startBtn.disabled = false;
        Notify.success('Время вышло!');
        dateFormat({ days: '00', hours: '00', minutes: '00', seconds: '00' });
      }
    }, 1000);
  },
};

function dateFormat(time) {
  days.textContent = addLeadingZero(time.days);
  hours.textContent = addLeadingZero(time.hours);
  minutes.textContent = addLeadingZero(time.minutes);
  seconds.textContent = addLeadingZero(time.seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
