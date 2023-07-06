import {createPosts} from './data.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
const pictureContainer = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();
const posts = createPosts();

const createPhoto = (item) => {
  const picture = template.cloneNode(true);
  const img = picture.querySelector('.picture__img');
  img.src = item.url;
  img.alt = item.description;
  picture.id = item.id;
  picture.querySelector('.picture__likes').textContent = item.likes;
  picture.querySelector('.picture__comments').textContent = item.comments.length;
  fragment.append(picture);
};

const renderPhotos = () => {
  posts.forEach((picture) => createPhoto(picture));
  pictureContainer.append(fragment);
};

export {renderPhotos};
