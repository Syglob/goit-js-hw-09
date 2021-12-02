
import 'flatpickr/dist/flatpickr.min.css';


import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btn = document.querySelector('[type="submit"]');
const delayEl = document.querySelector('[name="delay"]');
const stepEl = document.querySelector('[name="step"]');
const amountEl = document.querySelector('[name="amount"]');
//

//
const createPromise = (position, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve(Notify.success(`Fulfilled promise ${position} in ${delay}ms`));
      } else {
        reject(Notify.failure(`Rejected promise ${position} in ${delay}ms`));
      }
    }, delay);
  });
};
//
function submitInputs(e) {
  e.preventDefault();
  let delay = Number(delayEl.value);
  let step = Number(stepEl.value);
  let amount = Number(amountEl.value);
  const promisesAr = [];
  for (let i = 0; i < amount; i += 1) {
    promisesAr.push(createPromise(i + 1, delay));
    delay += step;
  }
  promisesAr.map(promise => promise.then(() => {
    console.log('✅success');
  }).catch(() => {
    console.log('❌failure');
  }));
}
//
btn.addEventListener('click', submitInputs);

//   Promise.all(promisesAr)
//     .then(() => {
//       console.log('✅ resolved');
//     })
//     .catch(() => {
//       console.log('❌rejected');
//     });
// }


