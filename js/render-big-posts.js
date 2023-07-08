// const COMMENTS_COUNTER = 5;

const pictureContainer = document.querySelector('.big-picture');
const bigImage = pictureContainer.querySelector('img');
const socialCaption = document.querySelector('.social__caption');
const likesCount = document.querySelector('.likes-count');
const pictureCancel = document.querySelector('.big-picture__cancel');
// const closePictureButton = document.querySelector('#picrure-cancel');

const closeModal = () => {
  pictureContainer.classList.add('hidden');
  pictureCancel.removeEventListener('click', pictureCancelClickHandler);
  document.removeEventListener('keydown', documentKeydownHandler);
  document.body.classList.remove('modal-open');
};

const openModal = () => {
  pictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  pictureCancel.addEventListener('click', pictureCancelClickHandler);
  document.addEventListener('keydown', documentKeydownHandler);
};

function pictureCancelClickHandler (event) {
  event.preventDefault();
  closeModal();
}

function documentKeydownHandler (event) {
  if(event.key === 'Escape') {
    event.preventDefault();
    closeModal();
  }
}

const fillBigPicture = (post) => {
  bigImage.src = post.url;
  socialCaption.textContent = post.description;
  likesCount.textContent = post.likes;
};

const renderBigPost = (post) => {
  // removeComments();
  openModal();
  fillBigPicture(post);
};

export {renderBigPost};
