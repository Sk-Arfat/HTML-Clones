

document.addEventListener('DOMContentLoaded',() => {

const crouselImages = document.querySelector('.crousel-images');
const images = document.querySelectorAll('.crousel-images img');
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

let currentIndex = '' ;

const updateCrousel = () => {
    let imageWidth = images[0].clientWidth;
    crouselImages.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
};


setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    updateCrousel();
},5000);

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex +1) % images.length;
    updateCrousel();
});

prevButton.addEventListener("click",() => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCrousel();
});


window.addEventListener('resize',updateCrousel);
});

