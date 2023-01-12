'use strict';
const body = document.body;
const burger = document.querySelector('.header__burger'); 
const menu = document.querySelector('.header__list');
const menuLinks = document.querySelectorAll('.header__link');


burger.addEventListener('click', onBurgerClick);

function onBurgerClick() {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
    body.classList.toggle('locked');
    
    for (let i = 0; i < menuLinks.length; i++) {
      menuLinks[i].classList.remove('header__link_active');
    }
}

for (let i = 0; i < menuLinks.length; i++) {
  menuLinks[i].addEventListener('click', onMenuLinkClick);
}

function onMenuLinkClick() {
  if (window.innerWidth <= 767) {
    onBurgerClick();
    if (body.className === 'locked') {
      burger.classList.remove('locked');
    }
  }
}

menu.addEventListener('click', closeMenu);

function closeMenu() {
  burger.classList.remove('active');
  menu.classList.remove('active');
  body.classList.remove('locked');
}