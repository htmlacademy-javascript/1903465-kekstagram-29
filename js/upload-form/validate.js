const REGEXP = /^#[a-za-яё0-9]{1,19}$/i;
const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAGS_COUNT = 5;
const HASHTAG_INVALID = 'Хеш-тег начинается с #, длиной не более 20 символов и может состоять только из букв и цифр';
const HASHTAG_REPEAT_INVALID = 'Хеш-теги не должны повторяться';
const HASHTAG_COUNT_INVALID = `Нельзя указать больше ${MAX_HASHTAGS_COUNT} хэш-тегов`;
const COMMENT_LENGTH_INVALID = `Не более ${MAX_COMMENT_LENGTH} символов`;

const uploadForm = document.querySelector('.img-upload__form');
const imageHashtags = document.querySelector('.text__hashtags');
const imageDescription = document.querySelector('.text__description');
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

const createHashtags = (value) => (value.trim().toLowerCase().split(' '));

const checkHachtags = (value) => {
  if (!value) {
    return true;
  }
  const hashtags = createHashtags(value);
  const check = hashtags.every((element) => (element.match(REGEXP)));
  return check;
};

const checkHachtagsCount = (value) => (value.split(' ').length <= MAX_HASHTAGS_COUNT);

const checkSimilarHachtags = (value) => {
  const hashtags = createHashtags(value);
  return hashtags.length === new Set(hashtags).size;
};

const checkCommentLength = (value) => (value.length <= MAX_COMMENT_LENGTH);

const pristineValidate = () => {
  pristine.validate();
};

const pristineReset = () => {
  pristine.reset();
};

const pristineInit = () => {
  pristine.addValidator(imageDescription, checkCommentLength, COMMENT_LENGTH_INVALID, 1, true);
  pristine.addValidator(imageHashtags, checkHachtags, HASHTAG_INVALID, 1, true);
  pristine.addValidator(imageHashtags, checkHachtagsCount, HASHTAG_COUNT_INVALID, 1, true);
  pristine.addValidator(imageHashtags, checkSimilarHachtags, HASHTAG_REPEAT_INVALID, 1, true);
};

export {pristineInit, pristineReset, pristineValidate};
