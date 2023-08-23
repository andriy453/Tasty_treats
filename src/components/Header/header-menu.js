import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from '../../../node_modules/boolbase/index.js';

(() => {
  const mobileMenu = document.querySelector('.js-menu-container');
  const openMenuBtn = document.querySelector('.js-open-menu');
  const closeMenuBtn = document.querySelector('.js-close-menu');

  let scrollLockMethod = null;

  const toggleMenu = () => {
    const isOpenMenu =
      openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
    openMenuBtn.setAttribute('aria-expanded', !isOpenMenu);
    mobileMenu.classList.toggle('is-open');

    if (isOpenMenu) {
      scrollLockMethod = enableBodyScroll;
      document.body.classList.remove('no-scroll'); 
    } else {
      scrollLockMethod = disableBodyScroll;
      document.body.classList.add('no-scroll'); 
    }

    // scrollLockMethod(mobileMenu);
  };

  openMenuBtn.addEventListener('click', toggleMenu);
  closeMenuBtn.addEventListener('click', toggleMenu);

  window.matchMedia('(min-width: 768px)').addEventListener('change', evt => {
    if (!evt.matches) return;
    mobileMenu.classList.remove('is-open');
    openMenuBtn.setAttribute('aria-expanded', false);
    enableBodyScroll(mobileMenu);
    scrollLockMethod = null;
    document.body.classList.remove('no-scroll'); 
  });
})();