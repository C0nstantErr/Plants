'use strict';
const body = document.body;
const burger = document.querySelector('.header__burger'); 
const menu = document.querySelector('.header__list');
const menuLinks = document.querySelectorAll('.header__link');
const logo = document.querySelector('.logo');

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
logo.addEventListener('click', closeMenu);

function closeMenu() {
  burger.classList.remove('active');
  menu.classList.remove('active');
  body.classList.remove('locked');
}

console.log(`
Итоговая оценка: 75

1. Вёрстка соответствует макету. Ширина экрана 768px (22.5/24)
 - блок header +2
 - секция welcome +3
 - секция about +4
 - секция service +4
 - секция prices +4
 - секция contacts +4 (есть смещение каринки по горизонтали в пределах 10рх)
 - блок footer + 1,5 (баллы стоит снять за отличия от макета. Никто не просил дбавлять иконки github и rs school)

2. Вёрстка соответствует макету. Ширина экрана 380px (22,5/24)
 - блок header +2 (смещение в пределах 10рх)
 - секция welcome +3
 - секция about +4
 - секция service +4
 - секция prices +4
 - секция contacts +4
 - блок footer + 1,5 (минус баллы по той же причине что и для 768рх)

 3. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутк с сохранением контента. (15/15)
 - нет полосы прокрутки при ширине страницы от 1440рх до 380px +7
 - нет полосы прокрутки при ширине страницы от 380px до 320рх +8

4. На ширине экрана 380рх и меньше реализовано адаптивное меню (20/22)
(Допускается появление адаптивного меню на ширине более 380, но не допускается на ширине более 770px) 
 - при ширине страницы 380рх панель навигации скрывается, появляется бургер-иконка +2
 - при нажатии на бургер-иконку плавно появляется адаптивное меню +4
 - адаптивное меню соответствует цветовой схеме макета +4
 - при нажатии на крестик адаптивное меню плавно скрывается уезжая за экран +4
 - ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям +2 (ссылки работают, но прокрутка с учетом закрытия меню выглядит не так плавно)
 - при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, также скрытие меню происходит если сделать клик вне данного окна +4
`)

/*--------------------------------- Part 3 -----------------------------------------------------*/ 

const buttonContainer = document.querySelector('.service__buttons'); // Контейнер где хранятся кнопки
const serviceButtons = buttonContainer.querySelectorAll('.service__button');  // Коллекция всех кнопок

// Вешаем слушатель по событию "клик" на каждую кнопку, вызываю функцию onServiceButtonClick
for (let button of serviceButtons) {
  button.addEventListener('click', onServiceButtonClick);
}

// функция получает обьект event (e), который содержит инфо о нашем событии
function onServiceButtonClick(e) {
  const button = e.target; // Кнопка на которую кликнули
  let activeButtons = buttonContainer.querySelectorAll('.active'); // Коллекция кнопок с классом active

  /* На кнопку можно кликнуть только в том сучае, если:
  1) активных кнпок меньше двух. 
  2) Если сама кнопка активна, и нам нужно вернуть ее в исходное состояние*/ 
  if (activeButtons.length < 2 || button.classList.contains('active')) {
    button.classList.toggle('active');
  }

  // Получаем количество активных кнопок при клике
  let activeCount = Array.from(serviceButtons).reduce((count, button) => {
    if(button.classList.contains('active')) return ++count;
    else return count; 
  }, 0)
// Если их уже две - блокируем третью, иначе - снимаем блок если у кого-то есть
  if (activeCount == 2) {
    for (let item of serviceButtons) {
      if (!item.classList.contains('active')) item.classList.add('locked');
    }
  } else {
    for (let item of serviceButtons) {
      if(item.classList.contains('locked')) item.classList.remove('locked');
    }
  }
}

