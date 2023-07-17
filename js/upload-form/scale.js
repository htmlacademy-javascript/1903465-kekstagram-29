const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DIVIDER = 100;

const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

let currentScale = MAX_SCALE;

const changeScale = (value) => {
  imagePreview.style.transform = `scale(${value / DIVIDER})`;
  scaleValue.value = `${value}%`;
};

const scaleSmallerClickHandlder = (event) => {
  event.preventDefault();
  if (currentScale > MIN_SCALE) {
    currentScale -= SCALE_STEP;
    changeScale(currentScale);
  }
};

const scaleBiggerClickHandlder = (event) => {
  event.preventDefault();
  if (currentScale < MAX_SCALE) {
    currentScale += SCALE_STEP;
    changeScale(currentScale);
  }
};

const initScale = () => {
  scaleSmaller.addEventListener('click', scaleSmallerClickHandlder);
  scaleBigger.addEventListener('click', scaleBiggerClickHandlder);
};

const resetScale = () => {
  currentScale = MAX_SCALE;
  changeScale(MAX_SCALE);
};

export{initScale, resetScale};
