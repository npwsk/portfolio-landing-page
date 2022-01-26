const html = document.documentElement;
const body = document.body;

const navToggle = document.querySelector('.header__nav-toggle');
const headerNav = document.querySelector('.header__nav');

const toggleNav = (toggle, nav) => {
  headerNav.classList.toggle('header__nav--active');
  toggle.classList.toggle('header__nav-toggle--active');

  if (nav.classList.contains('header__nav--active')) {
    body.style.overflow = 'hidden';
    html.style.overflow = 'hidden';
  } else {
    body.style.overflow = 'auto';
    html.style.overflow = 'auto';
  }
};

navToggle.addEventListener('click', () => toggleNav(navToggle, headerNav));

const navLinks = document.querySelectorAll('.header__nav-link');
navLinks.forEach((link) => link.addEventListener('click', () => toggleNav(navToggle, headerNav)));

function handlePortfolioTabClick(e) {
  if (e.target.classList.contains('tab-btn')) {
    const season = e.target.dataset.season;
    const images = document.querySelectorAll('.portfolio__img');
    images.forEach((image, index) => {
      image.src = `./assets/img/${season}/${index + 1}.jpg`;
    });

    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach((tab) => tab.classList.remove('tab-btn--active'));
    e.target.classList.add('tab-btn--active');
  }
}

const portfolioTabs = document.querySelector('.portfolio__tabs');
portfolioTabs.addEventListener('click', handlePortfolioTabClick);

console.log(`Самооценка: 85 / 85
1. Вёрстка соответствует макету. Ширина экрана 768px (48/48)
  - [x] блок <header> (6)
  - [x] секция hero (6)
  - [x] секция skills (6)
  - [x] секция portfolio (6)
  - [x] секция video (6)
  - [x] секция price (6)
  - [x] секция contacts (6)
  - [x] блок <footer> (6)
2. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется (15/15)
  - [x] нет полосы прокрутки при ширине страницы от 1440рх до 768рх (5)
  - [x] нет полосы прокрутки при ширине страницы от 768рх до 480рх (5)
  - [x] нет полосы прокрутки при ширине страницы от 480рх до 320рх (5)
3. На ширине экрана 768рх и меньше реализовано адаптивное меню (22/22)
  - [x] при ширине страницы 768рх панель навигации скрывается, появляется бургер-иконка (2)
  - [x] при нажатии на бургер-иконку справа плавно появляется адаптивное меню, бургер-иконка изменяется на крестик (4)
  - [x] высота адаптивного меню занимает всю высоту экрана. При ширине экрана 768-620рх вёрстка меню соответствует макету, когда экран становится уже, меню занимает всю ширину экрана (4)
  - [x] при нажатии на крестик адаптивное меню плавно скрывается уезжая за правую часть экрана, крестик превращается в бургер-иконку (4)
  - [x] бургер-иконка, которая при клике превращается в крестик, создана при помощи css-анимаций без использования изображений (2)
  - [x] ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям (2)
  - [x] при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, крестик превращается в бургер-иконку (4)
`);
