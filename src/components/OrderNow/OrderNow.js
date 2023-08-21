const modal = document.getElementById('myModal');
const btn = document.getElementById('openModal');
const closeBtn = document.getElementsByClassName('close')[0];
const form = document.querySelector('.modal-form-stl');
const messageBox = document.getElementById('messageBox');
const messageText = document.getElementById('messageText');
const okButton = document.getElementById('okButton');
const thanksBox = document.getElementById('thanksBox');
const closeThanksButton = document.getElementById('closeThanksButton');

btn.onclick = function () {
  modal.style.display = 'block';
};

closeBtn.onclick = function () {
  modal.style.display = 'none';
  messageBox.style.display = 'none';
  thanksBox.style.display = 'none';
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
    messageBox.style.display = 'none';
    thanksBox.style.display = 'none';
  }
};

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
