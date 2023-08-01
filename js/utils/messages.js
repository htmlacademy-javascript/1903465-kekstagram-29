import {isEscapeKey} from './utils.js';

let modal;
let isOpen = false;

const createElement = (template) => {
  const div = document.createElement('div');
  div.innerHTML = template;
  return div.firstChild;
};

const createMessageTemplate = (state, message, buttonText) =>
  `<section class='${state}'>
    <div class='${state}__inner'>
      <h2 class='${state}__title'>${message}</h2>
      ${buttonText ? `<button type='button' class='${state}__button'>${buttonText}</button>` : ''}
    </div>
  </section>`;

const createDomElement = (state, message, buttonText) => {
  modal = createElement(createMessageTemplate(state, message, buttonText));
  document.body.append(modal);
};

const closeMessage = () => {
  if (!isOpen) {
    document.body.classList.remove('modal-open');
  }

  document.removeEventListener('keydown', documentKeydownHandler);
  modal.remove();
};

function documentKeydownHandler(event) {
  if (isEscapeKey(event)) {
    event.preventDefault();
    closeMessage();
  }
}

const submitButtonClickHandler = (event) => {
  event.preventDefault();
  closeMessage();
};

const messageContainerClickHandler = (event, state) => {
  if (!event.target.closest(`.${state}__inner`)) {
    closeMessage();
  }
};

const renderMessage = (state, message, buttonText) => {
  isOpen = false;
  createDomElement(state, message, buttonText);

  if (buttonText) {
    modal.querySelector(`.${state}__button`).addEventListener('click', submitButtonClickHandler);
  }

  document.addEventListener('keydown', documentKeydownHandler);
  document.body.classList.add('modal-open');
  modal.addEventListener('click', (event) => {
    messageContainerClickHandler(event, state);
  });

  if (!document.body.classList.contains('modal-open')) {
    document.body.classList.add('modal-open');
    return;
  }

  isOpen = true;
};

export {renderMessage};
