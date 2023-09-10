const topBar = document.querySelector('#topBar');
const sketchAppBtn = document.querySelector('#sketchAppBtn');
const sketchApp = document.querySelector('#sketchApp');
const calcAppBtn = document.querySelector('#calcAppBtn');
const calcApp = document.querySelector('#calcApp');

sketchAppBtn?.addEventListener('click', () => {
  sketchApp?.classList.remove('sketch--hide');
  topBar?.classList.add('top-bar--dark');
});

calcAppBtn?.addEventListener('click', () => {
  calcApp?.classList.remove('calc--hide');
});

const timeElements = document.querySelectorAll('.time');
timeElements.forEach((element) => {
  console.log(getCurrentTime());
  const textNode = document.createTextNode(getCurrentTime());
  element.innerHTML = '';
  element.append(textNode);
});

setInterval(() => {
  console.log(getCurrentTime());
  timeElements.forEach((element) => {
    const textNode = document.createTextNode(getCurrentTime());
    element.innerHTML = '';
    element.append(textNode);
  });
}, 1000);

function getCurrentTime() {
  const time = new Date();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const formatedHours = String(hours % 12 || 12);
  const formatedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return formatedHours + ':' + formatedMinutes;
}
