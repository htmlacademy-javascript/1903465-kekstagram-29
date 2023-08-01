import {renderMessage} from '../utils/messages.js';
import {openModal} from './upload-form.js';

const FILE_TYPES = ['.gif', '.jpg', '.jpeg', '.png', '.webp'];
const ERROR_STATE = 'error';
const ERROR_MESSAGE = 'Неверный формат файла!';

const preview = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');

const renderUploadImage = ({ target }) => {
  const file = target.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const url = URL.createObjectURL(file);
    preview.src = url;
    effectsPreviews.forEach((effectsPreview) => {
      effectsPreview.style.backgroundImage = `url(${url})`;
    });
    openModal();
    return;
  }
  renderMessage(ERROR_STATE, ERROR_MESSAGE);
};

export {renderUploadImage};
