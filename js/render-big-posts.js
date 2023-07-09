import {isEscapeKey} from './utils.js';

const COMMENTS_COUNTER = 5;

const pictureContainer = document.querySelector('.big-picture');
const bigImage = pictureContainer.querySelector('img');
const socialCaption = document.querySelector('.social__caption');
const likesCount = document.querySelector('.likes-count');
const pictureCancel = document.querySelector('.big-picture__cancel');
const commentsLoader = document.querySelector('.comments-loader');
const socialCommentCount = document.querySelector('.social__comment-count');
const socialComments = pictureContainer.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment');

let comments = [];
let showingComments = 0;

const openModal = () => {
  pictureContainer.classList.remove('hidden');
  pictureCancel.addEventListener('click', pictureCancelClickHandler);
  document.addEventListener('keydown', documentKeydownHandler);
  document.body.classList.add('modal-open');
  commentsLoader.addEventListener('click', commentsLoaderClickHandler);
};

const closeModal = () => {
  pictureContainer.classList.add('hidden');
  pictureCancel.removeEventListener('click', pictureCancelClickHandler);
  document.removeEventListener('keydown', documentKeydownHandler);
  document.body.classList.remove('modal-open');
  commentsLoader.removeEventListener('click', commentsLoaderClickHandler);
  commentsLoader.classList.remove('hidden');
  showingComments = 0;
};

function pictureCancelClickHandler (event) {
  event.preventDefault();
  closeModal();
}

function documentKeydownHandler (event) {
  if(isEscapeKey(event) && !event.target.closest('.social__footer-text')) {
    event.preventDefault();
    closeModal();
  }
}

const fillCommentCounter = () => {
  socialCommentCount.innerHTML = `${showingComments} из <span class='comments-count'>${comments.length}</span> комментариев`;
};

const fillComment = (item) => {
  const comment = socialComment.cloneNode(true);
  const img = comment.querySelector('.social__picture');
  img.src = item.avatar;
  img.alt = item.name;
  comment.querySelector('.social__text').textContent = item.message;
  return comment;
};

const setButtonState = () => {
  if (showingComments >= comments.length) {
    commentsLoader.classList.add('hidden');
    return;
  }
  commentsLoader.classList.remove('hiddent');
};

const fillComments = () => {
  const currentComments = comments.slice(showingComments, showingComments + COMMENTS_COUNTER);
  showingComments = Math.min (showingComments + COMMENTS_COUNTER, comments.length);
  currentComments.forEach((comment) => socialComments.append(fillComment(comment)));
  fillCommentCounter();
  setButtonState();
};

function commentsLoaderClickHandler(event) {
  event.preventDefault();
  fillComments();
}

const fillBigPicture = (post) => {
  bigImage.src = post.url;
  socialCaption.textContent = post.description;
  likesCount.textContent = post.likes;
};

const renderBigPost = (post) => {
  socialComments.innerHTML = '';
  comments = post.comments;
  openModal();
  fillBigPicture(post);
  fillComments();
};

export {renderBigPost};
