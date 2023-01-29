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
const buttonContainer = document.querySelector('.service__buttons'); 
const serviceButtons = buttonContainer.querySelectorAll('.service__button');  
const serviceCards = document.querySelectorAll('.service__item'); 

for (let button of serviceButtons) {
  button.addEventListener('click', onServiceButtonClick);
}

function onServiceButtonClick(e) {
  const button = e.target; 
  let activeButtons = buttonContainer.querySelectorAll('.active'); 

  if (activeButtons.length < 2 || button.classList.contains('active')) {
    blurCards(button, serviceButtons, serviceCards);
    button.classList.toggle('active');
  }
  
  let activeCount = Array.from(serviceButtons).reduce((count, button) => {
    if(button.classList.contains('active')) return ++count;
    else return count; 
  }, 0)

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
  let activeBtn = buttonArr.filter((button) => {
    return button.classList.contains('active');
  });

  if (!activeBtn.length || (activeBtn[0].dataset.name === currentButton.dataset.name && activeBtn.length < 2)) {
    for (let card of cards) {
      if(card.dataset.parent !== currentButton.dataset.name) {
        card.classList.toggle('blur');
      }
    }
  } else {
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
  contactFIeld.classList.add('no-hover'); 
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
  2. в секции "контакты", так как выпадающий список был реализован через :hover, на мобилках нужен дополнительный клик вне списка, чтоб закрыть его. Выглядит не очень.
`)