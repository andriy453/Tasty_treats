import Swiper from 'swiper';
import { Pagination, Navigation, Autoplay, Parallax } from 'swiper/modules';
import 'swiper/swiper-bundle.min.css';

const sliderContainer = document.querySelector('.events');

function events() {
  fetch(`https://tasty-treats-backend.p.goit.global/api/events`)
    .then(res => res.json())
    .then(res => {
      murkap(res);
      const swiper = new Swiper('.swiper', {
        modules: [Pagination, Navigation, Autoplay, Parallax],
        allowSlideNext: true,
        pagination: {
          el: '.slider-pagination',
          clickable: true,
        },
        autoplay: {
          delay: 2500,
        },
        parallax: true,
        speed: 1000,
    
        loop: true,
      });
    }).catch(error => console.error('Error:', error)) 
}
events();

function murkap(data) {
  const CardMarkup = data => {
    const { cook, topic } = data;
    return `<div class="swiper-slide">
  <div class="slider-card">
    <div class="chief-cook" style="background-image: url(${cook.imgUrl})">
    </div>
    <div class="mini-picture-card">
      <div class="mini-picture" style="background-image: url(${topic.previewWebpUrl})"></div>
      <p class="dish-name">
        ${topic.name}
      </p>
      <p class="country">
        ${topic.area}
      </p>
    </div>
    <div class="big-picture" style="background-image: url(${topic.previewUrl})">
    </div>
  </div>
</div>`;
  };
  const newCardMarkup = data.map(CardMarkup).join('');
  sliderContainer.insertAdjacentHTML('beforeend', newCardMarkup);
}