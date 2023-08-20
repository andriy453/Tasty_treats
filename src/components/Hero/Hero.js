const div = document.querySelector('.image-content');
function events() {
  fetch(`https://tasty-treats-backend.p.goit.global/api/events`)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      murkap(res);
    });
}
events();
function murkap(mar) {
  div.insertAdjacentHTML(
    'beforeend',
    mar
      .map(mar => {
        return `<div>${mar.topic.area}</div>
              <div>${mar.topic.name}</div>
              <img  class="name1" src="${mar.topic.previewUrl}" alt="">
              <img   class="name2" src="${mar.topic.imgWebpUrl}" alt="">
              <img   class="name3" src="${mar.cook.imgUrl}" alt="">
              `;
      })
      .join('')
  );
}
