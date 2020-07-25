/* eslint-disable no-use-before-define */
const portfolioMobile = () => {

    const arrowRight = document.getElementById('portfolio-arrow_right'),
        arrowLeft = document.getElementById('portfolio-arrow_left'),
        current = document.querySelector('#portfolio-counter .slider-counter-content__current'),
        total = document.querySelector('#portfolio-counter .slider-counter-content__total'),
        slides = document.querySelectorAll('.portfolio-slider-mobile .portfolio-slider__slide-frame');

    let sliderIndex = 0;

    const init = () => {
        current.textContent = 1;
        total.textContent = slides.length;
        showArrow();
    };

    const showArrow = () => {
        arrowRight.style.display = (sliderIndex < slides.length - 1) ? 'flex' : 'none';
        arrowLeft.style.display = (sliderIndex > 0) ? 'flex' : 'none';

    };

    arrowRight.addEventListener('click', () => {
        if (window.innerWidth >=  576) return;
        sliderIndex++;
        if (sliderIndex === slides.length)  sliderIndex = 0;
        if (sliderIndex === slides.length);
        for (let i = 0; i < sliderIndex; i++) {
            slides[i].style.display = 'none';
        }
        slides[sliderIndex].style.display = 'block';
        current.textContent = sliderIndex + 1;
        showArrow();
    });

    arrowLeft.addEventListener('click', () => {
        if (window.innerWidth >=  576) return;
        sliderIndex--;
        if (sliderIndex === -1)  sliderIndex = slides.length - 1;
        if (sliderIndex === slides.length);
        for (let i = 0; i < sliderIndex; i++) {
            slides[i].style.display = 'none';
        }
        slides[sliderIndex].style.display = 'block';
        current.textContent = sliderIndex + 1;
        showArrow();
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth <  576) showArrow();
    });

    init();

};

export default portfolioMobile;
