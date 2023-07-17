import {isEscapeKey, isNotInput} from '../utils/utils.js';
import {initScale, resetScale} from './scale.js';
import { initSlider, updateSlider } from './filters.js';
import {pristineInit, pristineReset, pristineValidate} from './validate.js';


const uploadInput = document.querySelector('.img-upload__input');
const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const filterList = document.querySelector('.effects__list');
const defaultFilter = document.querySelector('input[checked].effects__radio').value;

const filterListChangeHandler = (event) => {
  updateSlider(event.target.value);
};

const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', documentKeydownHandler);
  imgUploadCancel.addEventListener('click', imgUploadCancelClickHandler);
  filterList.addEventListener('change', filterListChangeHandler);
};

const closeUploadForm = () => {
  resetScale();
  pristineReset();
  updateSlider(defaultFilter);
  uploadForm.reset();
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', documentKeydownHandler);
  imgUploadCancel.removeEventListener('click', imgUploadCancelClickHandler);
  filterList.removeEventListener('change', filterListChangeHandler);
};

const uploadInputChangeHandler = () => openUploadForm();

function imgUploadCancelClickHandler(event) {
  event.preventDefault();
  closeUploadForm();
}

function uploadFormSubmitHandler(event) {
  event.preventDefault();

  if (pristineValidate()) {
    closeUploadForm();
  }
}

function documentKeydownHandler (event) {
  if(isEscapeKey(event) && isNotInput(event)) {
    event.preventDefault();
    closeUploadForm();
  }
}

const initUploadForm = () => {
  initScale();
  pristineInit();
  initSlider(defaultFilter);
  uploadForm.addEventListener('submit', uploadFormSubmitHandler);
  uploadInput.addEventListener('change', uploadInputChangeHandler);
};

export {initUploadForm};
