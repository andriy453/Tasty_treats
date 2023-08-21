// const div = document.querySelector('.mySwiper');
// function events() {
//   fetch(`https://tasty-treats-backend.p.goit.global/api/events`)
//     .then(res => res.json())
//     .then(res => {
//       console.log(res);
//       murkap(res);
//     });
// }
// events();
// function murkap(mar) {
//   div.insertAdjacentHTML(
//     'beforeend',
//     mar
//       .map(mar => {
//         return `
//         <swiper-slide  class="slide">
//         <div class='slider_img1'> <img class="img_imgUrl" src="${mar.cook.imgUrl}" alt=""></div>
//         <div class='slider_img2'><img class="img_previewUrl" src="${mar.topic.previewUrl}" alt=""></div>
//         <div class='slider_img3'><img class="img_imgWebpUrl" src="${mar.topic.imgWebpUrl}" alt=""></div>
//       </swiper-slide>
      
      
//               `;
//       })
//       .join('')
//   );
// }