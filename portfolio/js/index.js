import { i18Obj, translateContent, updateActiveLang } from './translate.js';
import { toggleNav, closeNav } from './nav.js';
import handleGalleryTabClick from './gallery.js';
import toggleTheme from './theme.js';

const state = {
  lang: 'en',
  theme: 'dark',
};

const setLocalStorage = () => {
  localStorage.setItem('lang', state.lang);
  localStorage.setItem('theme', state.theme);
};

const getLocalStorage = () => {
  if (localStorage.getItem('lang')) {
    state.lang = localStorage.getItem('lang');
    translateContent(state.lang, i18Obj);
    updateActiveLang(state.lang);
  }
  if (localStorage.getItem('theme')) {
    state.theme = localStorage.getItem('theme');
    document.getElementById('theme-checkbox').checked = state.theme === 'light';
    toggleTheme(state.theme);
  }
};

window.addEventListener('load', getLocalStorage);
window.addEventListener('beforeunload', setLocalStorage);

const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 0) {
    header.classList.add('header--fixed');
  } else {
    header.classList.remove('header--fixed');
  }
});

const navToggle = document.querySelector('.header__nav-toggle');
navToggle.addEventListener('click', toggleNav);

const nav = document.querySelector('.header__nav');
nav.addEventListener('click', closeNav);

const portfolioTabs = document.querySelector('.portfolio__tabs');
portfolioTabs.addEventListener('click', handleGalleryTabClick);

const langToggle = document.querySelector('.header__lang-toggle');
langToggle.addEventListener('click', (e) => {
  if (e.target.classList.contains('header__lang-btn')) {
    const { lang } = e.target.dataset;
    state.lang = lang;
    translateContent(lang, i18Obj);
    updateActiveLang(lang);
  }
});

const themeCheckbox = document.querySelector('.header__theme-toggle');

themeCheckbox.addEventListener('input', (e) => {
  const isChecked = e.target.checked;
  const targetTheme = isChecked ? 'light' : 'dark';
  state.theme = targetTheme;
  toggleTheme(targetTheme);
});

const buttons = document.querySelectorAll('.button');
const tabs = document.querySelectorAll('.tab');

buttons.forEach((btn) => btn.addEventListener('click', (e) => addRippleCircle(e, 'button')));
tabs.forEach((tab) => tab.addEventListener('click', (e) => addRippleCircle(e, 'tab')));

function addRippleCircle(e, parentClass) {
  const x = e.clientX + window.pageXOffset;
  const y = e.clientY + window.pageYOffset;

  const buttonTop = e.target.offsetTop;
  const buttonLeft = e.target.offsetLeft;

  const xInside = x - buttonLeft;
  const yInside = y - buttonTop;

  const circle = document.createElement('span');
  circle.classList.add(`${parentClass}__circle`);
  circle.style.top = yInside + 'px';
  circle.style.left = xInside + 'px';

  e.target.appendChild(circle);

  setTimeout(() => circle.remove(), 500);
}

console.log(`Самооценка: 85 / 85
1. Смена изображений в секции portfolio (25/25)
  - [x] при кликах по кнопкам Winter, Spring, Summer, Autumn в секции portfolio отображаются изображения из папки с соответствующим названием +20
  - [x] кнопка, по которой кликнули, становится активной т.е. выделяется стилем. Другие кнопки при этом будут неактивными +5
2. Перевод страницы на два языка (25/25)
  - [x] при клике по надписи ru англоязычная страница переводится на русский язык +10
  - [x] при клике по надписи en русскоязычная страница переводится на английский язык +10
  - [x] надписи en или ru, соответствующие текущему языку страницы, становятся активными т.е. выделяются стилем +5
3. Переключение светлой и тёмной темы (25/25)
  На страницу добавлен переключатель при клике по которому:
  - [x] тёмная тема приложения сменяется светлой +10
  - [x] светлая тема приложения сменяется тёмной +10
  - [x] после смены светлой и тёмной темы интерактивные элементы по-прежнему изменяют внешний вид при наведении и клике и при этом остаются видимыми на странице (нет ситуации с белым шрифтом на белом фоне) +5
4. Дополнительный функционал: выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы (5/5)
5. Дополнительный функционал: сложные эффекты для кнопок при наведении и/или клике (5/5)
  - Ripple Button
`);

const player = document.querySelector('.video-player');
const video = player.querySelector('.video-player__video');
const playBtn = player.querySelector('.video-player__play');
const controls = player.querySelector('.controls');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const playControl = player.querySelector('.play-btn');
const volumeContainer = player.querySelector('.volume-controls');
const muteControl = player.querySelector('.volume-btn');
const volumeSlider = player.querySelector('.volume-range');
const timerCurrent = player.querySelector('.timer__current-time');
const timerTotal = player.querySelector('.timer__total-time');
const skipButtons = player.querySelectorAll('.skip-btn');
const fullscreenBtn = player.querySelector('.fullscreen-btn');
const poster = player.querySelector('.video-player__poster');
const shadow = player.querySelector('.video-player__shadow');

const INITIAL = 'initial';
const PLAYING = 'playing';
const PAUSED = 'paused';

const playerState = {
  state: INITIAL,
  isMuted: false,
};

const formatSeconds = (seconds) => {
  return seconds < 3600
    ? new Date(seconds * 1000).toISOString().slice(14, 19)
    : new Date(seconds * 1000).toISOString().slice(11, 19);
};

const toggleVideoPlay = () => {
  if (video.paused) {
    video.play();
    playerState.state = PLAYING;
  } else {
    video.pause();
    playerState.state = PAUSED;
  }
};

const toggleVideoMute = () => (video.muted = !video.muted);
const hidePoster = () => poster.classList.add('video-player__poster--hidden');

const updatePlayer = () => {
  if (playerState.state === PLAYING) {
    playBtn.classList.remove('video-player__play--visible');
    playControl.classList.remove('play-btn--paused');
    controls.classList.remove('video-player__controls--fixed');
    progress.classList.remove('video-player__progress--fixed');
    shadow.classList.remove('video-player__shadow--visible');
    playControl.title = 'Pause (space/k)';
  }
  if (playerState.state === PAUSED) {
    playBtn.classList.add('video-player__play--visible');
    playControl.classList.add('play-btn--paused');
    controls.classList.add('video-player__controls--fixed');
    progress.classList.add('video-player__progress--fixed');
    shadow.classList.add('video-player__shadow--visible');
    playControl.title = 'Play (space/k)';
  }
};

const initVideoTimer = () => {
  timerCurrent.textContent = formatSeconds(0);
  timerTotal.textContent = formatSeconds(video.duration);
};

const updateVolumeBtn = () => {
  if (video.volume && !video.muted) {
    muteControl.classList.remove('volume-btn--muted');
    muteControl.title = 'Mute (m)';
  } else {
    muteControl.classList.add('volume-btn--muted');
    muteControl.title = 'Unmute (m)';
  }
};

const updateVolumeSliderColor = () => {
  const { value, min, max } = volumeSlider;
  const valuePercent = ((value - min) / (max - min)) * 100;

  volumeSlider.style.background =
    'linear-gradient(to right, var(--color-volume-before-thumb) 0%,' +
    'var(--color-volume-before-thumb) ' +
    valuePercent +
    '%, var(--color-volume-after-thumb) ' +
    valuePercent +
    '%, var(--color-volume-after-thumb)';
};

const handleVolumeSliderUpdate = (e) => {
  const { value } = e.target;
  video.volume = value;

  if (value) {
    video.muted = false;
  }

  updateVolumeSliderColor();
};

const scrub = (e) => {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
};

const updateProgress = () => {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${percent}%`;
  timerCurrent.textContent = formatSeconds(video.currentTime);
  if (percent === 100) {
    playerState.state = PAUSED;
    updatePlayer();
  }
  requestAnimationFrame(updateProgress);
};

const openFullscreen = () => {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    video.msRequestFullscreen();
  }
};

const handleVideoKeys = (e) => {
  console.log(e);
  switch (e.keyCode) {
    case 32:
    case 75:
      toggleVideoPlay();
      return;
    case 77:
      toggleVideoMute();
      return;
    case 70:
      openFullscreen();
      return;
    case 39:
      skip(10);
      return;
    case 37:
      skip(-10);
      return;
  }
};

const skip = (seconds) => {
  video.currentTime += seconds;
};

const handleSkipClick = (e) => {
  const skipSeconds = parseFloat(e.target.dataset.skip);
  skip(skipSeconds);
};

const showVolumeSlider = () => volumeContainer.classList.add('volume-controls--active');
const hideVolumeSlider = () => volumeContainer.classList.remove('volume-controls--active');

window.addEventListener('load', updateVolumeSliderColor);
video.addEventListener('loadedmetadata', initVideoTimer);

player.addEventListener('keydown', handleVideoKeys);

poster.addEventListener('click', toggleVideoPlay, { once: true });
poster.addEventListener('click', hidePoster, { once: true });
playBtn.addEventListener('click', hidePoster, { once: true });
playBtn.addEventListener('click', toggleVideoPlay);
playControl.addEventListener('click', toggleVideoPlay);
video.addEventListener('click', toggleVideoPlay);

video.addEventListener('play', updatePlayer);
video.addEventListener('play', updateProgress);
video.addEventListener('pause', updatePlayer);

video.addEventListener('play', () => video.focus());

video.addEventListener('volumechange', updateVolumeBtn);

muteControl.addEventListener('click', toggleVideoMute);
muteControl.addEventListener('focus', showVolumeSlider);
muteControl.addEventListener('blur', hideVolumeSlider);
volumeSlider.addEventListener('focus', showVolumeSlider);
volumeSlider.addEventListener('blur', hideVolumeSlider);

let volumeMousedown = false;
volumeSlider.addEventListener('change', handleVolumeSliderUpdate);
volumeSlider.addEventListener('mousemove', (e) => volumeMousedown && handleVolumeSliderUpdate(e));
volumeSlider.addEventListener('mouseup', () => (volumeMousedown = false));
volumeSlider.addEventListener('mousedown', () => (volumeMousedown = true));

let progressMousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => progressMousedown && scrub(e));
progress.addEventListener('mouseup', () => (progressMousedown = false));
progress.addEventListener('mousedown', () => (progressMousedown = true));

fullscreenBtn.addEventListener('click', openFullscreen);
skipButtons.forEach((btn) => btn.addEventListener('click', handleSkipClick));
