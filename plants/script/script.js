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
/*--------------------------------- Part 3 -----------------------------------------------------*/ 
/*---------------------------------  Services  -------------------------*/ 
const buttonContainer = document.querySelector('.service__buttons'); // Контейнер где хранятся кнопки
const serviceButtons = buttonContainer.querySelectorAll('.service__button');  // Коллекция всех кнопок
const serviceCards = document.querySelectorAll('.service__item'); // Колекция всех карточек
// Вешаем слушатель по событию "клик" на каждую кнопку, вызываю функцию onServiceButtonClick
for (let button of serviceButtons) {
  button.addEventListener('click', onServiceButtonClick);
}
// функция получает обьект event (e), который содержит инфо о нашем событии
function onServiceButtonClick(e) {
  const button = e.target; // Кнопка на которую кликнули
  let activeButtons = buttonContainer.querySelectorAll('.active'); // Коллекция кнопок с классом active до клика
  /* На кнопку можно кликнуть только в том сучае, если:
  1) активных кнпок меньше двух. 
  2) Если сама кнопка активна, и нам нужно вернуть ее в исходное состояние*/ 
  if (activeButtons.length < 2 || button.classList.contains('active')) {
    blurCards(button, serviceButtons, serviceCards);
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

function blurCards(currentButton, allButton, cards) {
  let buttonArr = Array.from(allButton);
  // массив уже активных кнопок
  let activeBtn = buttonArr.filter((button) => {
    return button.classList.contains('active');
  });
  // если активных кнопок нет, либо активная и есть та кнопка на которую мы кикаем и она всего одна
  if (!activeBtn.length || (activeBtn[0].dataset.name === currentButton.dataset.name && activeBtn.length < 2)) {
    // переключаем класс "блюр" для всех карточек у которых значение атрибута data-parent отлич. от data-name у тек. кнопки
    for (let card of cards) {
      if(card.dataset.parent !== currentButton.dataset.name) {
        card.classList.toggle('blur');
      }
    }
  } else {
    // если активная кнопка уже есть: переключаем блюр у карточек с таким же аттрибутом data-parent как у тек.кнопки
    for (let card of cards) {
      if (card.dataset.parent === currentButton.dataset.name) {
        card.classList.toggle('blur');
      }
    }
  }
}
/*---------------------------------  Prices  -------------------------*/ 
const tariffs = document.querySelector('.prices__tariffs');
const pricesCards = tariffs.querySelectorAll('.card');
const cardsDropDown = tariffs.querySelectorAll('.card__title');

cardsDropDown.forEach(item => item.addEventListener('click', showInfo));

function showInfo(e) {
  let curretButtonStatus = e.target.classList.contains('open');
  cardsDropDown.forEach(card => {
    card.classList.remove('open');
    pricesCards.forEach(card => card.classList.remove('bg-open'));
  })
  if(!curretButtonStatus) {
    e.target.classList.add('open');
    let index = Array.from(cardsDropDown).findIndex(card => card.classList.contains('open'));
    pricesCards[index].classList.add('bg-open')
  }
}
/*---------------------------------  Contacts  -------------------------*/ 
const contact = document.querySelector('.contact');
const template = contact.querySelector('.contact__adress').cloneNode(true);
const contactFIeld = contact.querySelector('.contact__info');
const contactList = contact.querySelector('.contact__list');
const contactCity = contactList.querySelectorAll('.contact__item');
const adresses = [
  {
    city: "Canandaigua, NY",
    phone: "+1 585 393 0001",
    adress: "151 Charlotte Street"
  },

  {
    city: "New York City",
    phone: "+1 212 456 0002",
    adress: "9 East 91st Street"
  },

  {
    city: "Yonkers, NY",
    phone: "+1 914 678 0003",
    adress: "511 Warburton Ave"
  },

  {
    city: "Sherrill, NY",
    phone: "+1 315 908 0004",
    adress: "14 WEST Noyes BLVD"
  },
];

contactCity.forEach(contact => contact.addEventListener('click', showContact));

function showContact(e) {
  let currentInfo = contact.querySelector('.contact__adress');
  let city = e.target;
  let card = createContact(template, adresses, city);
  let contactCityText = contact.querySelector('.contact__info-text');

  card.classList.add('selected');
  contactFIeld.classList.add('no-hover'); //при выборе города чтоб список скрывался
  setTimeout(() => {
    contactFIeld.classList.remove('no-hover')
  }, 100)

  currentInfo.replaceWith(card); 
  contactCityText.textContent = city.textContent;
}

function createContact(template, adresses, city) {
  const contactCard = template.cloneNode(true);
  const cityName = city.textContent; 
  const contactButton = contactCard.querySelector('.contact__card-button');
  const contacts = adresses.find(item => item.city === cityName);
  
  for(let key in contacts) {
    let field = Array.from(contactCard.querySelectorAll('[data-name]')).find(elem => elem.dataset.name === key);
    field.innerHTML = contacts[key];
  }

  setPhoneNumber(contactButton, contacts);
  return contactCard;
}

function setPhoneNumber(link, adressInfo) {
  let phone; 
  for (let key in adressInfo) {
    if (key === 'phone') phone = adressInfo[key];
  }
  link.setAttribute('href', `tel:${phone}`);
}

console.log(`
  Итоговая оценка: 100
  1. аккордиону в секции тарифы не хватает плавности появления, хотя этого не было в ТЗ.
`)

/*---------------------------------  Contacts- menu on touchscreen  -------------------------*/ 
const deviceWidth = parseInt(window.innerWidth);
const deviceHeight = parseInt(window.innerHeight);
const isTouchScreen = (deviceWidth <= 992 || deviceHeight <=992);


if (isTouchScreen) {
  contact.addEventListener('click', (e) => {
    let target = e.target; 
    do {
      if(target == contactFIeld) {
        contactFIeld.classList.toggle('touched');
        return;
      }
      target = target.parentNode; //проверяет есlи мы кликнули по дочернему элементу, нам тоже нужно приметить стили. в конечном итоге вернет null;
    } while (target);
    contactFIeld.classList.remove('touched');
  })
}
