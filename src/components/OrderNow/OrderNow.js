const modal = document.getElementById('myModal');
const btn = document.getElementById('openModal');
const btnOrderNow = document.querySelector('.btnOrderNow')
const closeBtn = document.getElementsByClassName('close')[0];
const form = document.querySelector('.modal-form-stl');
const messageBox = document.getElementById('messageBox');
const messageText = document.getElementById('messageText');
const okButton = document.getElementById('okButton');
const thanksBox = document.getElementById('thanksBox');
const closeThanksButton = document.getElementById('closeThanksButton');

btn.addEventListener('click',(()=>{
  modal.classList.add('is-hidden');
// window.addEventListener('click',closemod)
}

)) 
if(btnOrderNow){
  btnOrderNow.addEventListener('click',(()=>{
  modal.classList.remove('is-hidden');
  // window.addEventListener('click',closemod)
})) 

}

closeBtn.onclick = function () {
  modal.classList.add('is-hidden');

};

window.addEventListener('click',closemod)
function closemod (e){
  if (e.target === modal) {
  modal.classList.add('is-hidden');
  }

}
// window.onclick = function (event) {

  // if (event.target === modal) {
  //   console.log(modal)
  //   modal.style.display = 'none';
  //   messageBox.style.display = 'none';
  //   thanksBox.style.display = 'none';
  // }
// };

form.addEventListener('submit', function (event) {
  event.preventDefault();

  modal.style.display = 'none';
  thanksBox.style.display = 'block';
});

okButton.onclick = function () {
  messageBox.style.display = 'none';
};

closeThanksButton.onclick = function () {
  thanksBox.style.display = 'none';

  form.reset();
};



