import {createPosts} from './data.js';
import { renderBigPost } from './render-big-posts.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
const pictureContainer = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();
const posts = createPosts();

const createPhoto = (post) => {
  const picture = template.cloneNode(true);
  const img = picture.querySelector('.picture__img');
  img.src = post.url;
  img.alt = post.description;
  picture.querySelector('.picture__likes').textContent = post.likes;
  picture.querySelector('.picture__comments').textContent = post.comments.length;
  picture.addEventListener('click', (event) => {
    event.preventDefault();
    renderBigPost(post);
  });
  fragment.append(picture);
};

const renderPhotos = () => {
  posts.forEach((picture) => createPhoto(picture));
  pictureContainer.append(fragment);
};

export {renderPhotos};
