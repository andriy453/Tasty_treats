const scrollBtn = document.querySelector('.scroll-top-btn');

window.onscroll = () => {
    if (window.scrollY > 700) {
        scrollBtn.classList.remove('show-btn_hide');
    } else if (window.scrollY < 700) {
        scrollBtn.classList.add('show-btn_hide');
    }
}

scrollBtn.onclick = () => {
    window.scrollTo(0, 0);
}