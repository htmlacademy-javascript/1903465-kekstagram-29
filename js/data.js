import {getRandomNumber, getRandomArrayElement, shuffleArray} from './utils.js';

const POST_COUNTER = 25;
const MIN_PHOTO_INDEX = 1;
const MAX_PHOTO_INDEX = 6;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COUNT_OF_COMMENTS = 0;
const MAX_COUNT_OF_COMMENTS = 30;

const NAMES = [
  'Мария',
  'Фрол',
  'Евдоким',
  'Ефросинья',
  'Ядвига',
  'Ромуальдо',
  'Агриппина',
  'Вольдемар',
  'Васисуалий',
  'Агафья',
];

const DESCRIPTIONS = [
  'Командная работа',
  'Будни и праздники',
  'Молочный конвейер',
  'Младенец мармозетки',
  'Да я сам офигел!',
  'Гарри Поттер и узники подъезда',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

let postId = 1;
let commentId = 1;

const createMessage = (elements) => shuffleArray(elements).slice(0, getRandomNumber(1, 2)).join(' ');

const createComment = () => ({
  id: commentId++,
  avatar: `img/avatar-${getRandomNumber(MIN_PHOTO_INDEX, MAX_PHOTO_INDEX)}.svg`,
  message: createMessage(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createPost = () => ({
  id: postId,
  url: `photos/${postId++}.jpg`,
  likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
  description: getRandomArrayElement(DESCRIPTIONS),
  comments:Array.from({length: getRandomNumber(MIN_COUNT_OF_COMMENTS, MAX_COUNT_OF_COMMENTS)}, createComment)
});

const createPosts = () => Array.from({length: POST_COUNTER}, createPost);

export {createPosts};
