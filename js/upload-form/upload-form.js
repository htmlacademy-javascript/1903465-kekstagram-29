import {isEscapeKey} from '../utils/utils.js';
import {initScale, resetScale} from './photo-scale.js';
import {setUpdateOptions, createSlider} from './photo-filters.js';
import {pristineInit, pristineReset, pristineValidate} from './validate.js';
import {renderMessage} from '../utils/messages.js';
import {sendData} from '../utils/api.js';
import {renderUploadImage} from './upload-image.js';

const SEND_URL = 'https://29.javascript.pages.academy/kekstagram/';
const SUCCESS_STATE = 'success';
const SUCCESS_MESSAGE = 'Изображение успешно загружено';
const SUCCESS_BUTTON_TEXT = 'Круто!';
const ERROR_STATE = 'error';
const ERROR_MESSAGE = 'Ошибка загрузки файла';
const ERROR_BUTTON_TEXT = 'Попробовать ещё раз';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');
const effectsList = document.querySelector('.effects__list');
const currentEffectValue = effectsList.querySelector('input:checked').value;
const submitButton = document.querySelector('.img-upload__submit');

const setSubmitButtonStatus = (state) => {
  submitButton.disabled = state;
};

const effectsListChangeHandler = (event) => setUpdateOptions(event.target.value);

const openModal = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', documentKeydownHandler);
};

const closeModal = () => {
  uploadForm.reset();
  pristineReset();
  resetScale();
  setUpdateOptions(currentEffectValue);
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', documentKeydownHandler);
};

const closeButtonClickHandler = (event) => {
  event.preventDefault();
  closeModal();
};

function documentKeydownHandler(event) {
  const textHashtags = event.target.closest('.text__hashtags');
  const textDescription = event.target.closest('.text__description');
  const errorContainer = document.querySelector('.error');
  if (isEscapeKey(event) && !textHashtags && !textDescription && !errorContainer) {
    event.preventDefault();
    closeModal();
  }
}

const onSuccess = () => {
  closeModal();
  renderMessage(SUCCESS_STATE, SUCCESS_MESSAGE, SUCCESS_BUTTON_TEXT);
  setSubmitButtonStatus(false);
};

const onError = () => {
  renderMessage(ERROR_STATE, ERROR_MESSAGE, ERROR_BUTTON_TEXT);
  setSubmitButtonStatus(false);
};

function uploadFormSubmitHandler(event) {
  event.preventDefault();
  if (pristineValidate()) {
    setSubmitButtonStatus(true);
    sendData(SEND_URL, onSuccess, onError, new FormData(event.target));
  }
}

const uploadInputChangeHandler = (event) => {
  renderUploadImage(event);
  openModal();
};

const initUploadForm = () => {
  pristineInit();
  initScale();
  createSlider(currentEffectValue);
  uploadInput.addEventListener('change', uploadInputChangeHandler);
  uploadForm.addEventListener('submit', uploadFormSubmitHandler);
  closeButton.addEventListener('click', closeButtonClickHandler);
  effectsList.addEventListener('change', effectsListChangeHandler);
};

export {initUploadForm};
