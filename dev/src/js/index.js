'use strict';

document.querySelector('#ham').addEventListener('click', () => {
  const body = document.querySelector('body');
  if (body.classList.length) {
    body.classList = [];
  } else {
    body.classList = ['menu-opened'];
  }
});
