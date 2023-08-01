import {renderBigPost} from './render-big-posts.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
const pictureContainer = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

const createPost = (post) => {
  const picture = template.cloneNode(true);
  const img = picture.querySelector('.picture__img');
  img.src = post.url;
  img.alt = post.description;
  picture.id = post.id;
  picture.querySelector('.picture__likes').textContent = post.likes;
  picture.querySelector('.picture__comments').textContent = post.comments.length;
  picture.addEventListener('click', (event) => {
    event.preventDefault();
    renderBigPost(post);
  });
  fragment.append(picture);
};

const renderPosts = (posts) => {
  posts.forEach((post) => createPost(post));
  pictureContainer.append(fragment);
};

export {renderPosts};
