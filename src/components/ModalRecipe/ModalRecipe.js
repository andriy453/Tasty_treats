const refs ={
    gallery:document.querySelector('.gallery'),
    modal:document.querySelector(".modal"),
    overlay:document.querySelector(".overlay"),
    closeModalBtn:document.querySelector(".btn-close"),
    body:document.querySelector('body')
};


//open modal function
const openModal = function () {
    refs.modal.classList.remove("hidden");
    refs.overlay.classList.remove("hidden");

    // adding closures
    // on clicking close button
    refs.closeModalBtn.addEventListener("click", closeModal);

    // on clicking esc
    document.addEventListener("keydown", closeModalWithEsc);

      //closing modal on click outside modal

    refs.overlay.addEventListener('click', closeModal);

    // Disable scroll
    refs.body.style.overflow = "hidden";
       
};

// close modal functions
const closeModal = function () {
    refs.modal.classList.add("hidden");
    refs.overlay.classList.add("hidden");

    // remove event listeners 
    document.removeEventListener("keydown", closeModalWithEsc);
    refs.overlay.removeEventListener('click',closeModal);
    refs.closeModalBtn.removeEventListener('click', closeModal);

    // Enable scroll
    refs.body.style.overflow = "auto";
};

const closeModalWithEsc = function (e) {
    if (e.key === "Escape" && !refs.modal.classList.contains("hidden")) {
        closeModal();
    }
}



// open modal
refs.gallery.addEventListener('click',(e) => {
    if (e.target.classList.contains('btn-see-recipe')) {
        openModal();
    };
});




