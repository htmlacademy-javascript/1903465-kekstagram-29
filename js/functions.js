const compareStringLength = (string, maxLength) => string.length <= maxLength;

compareStringLength ('проверяемая строка', 20);

const isPalindrome = (string) => {
  string = string.toLowerCase().replaceAll(' ', '');
  return string === string.split ('').reverse().join('');
};

isPalindrome ('Лёша на полке клопа нашёл ');


const extractingNumbers = (string) => parseInt(String(string.replace(/\D/g, '')), 10);

extractingNumbers ('ECMAScript 2022');
