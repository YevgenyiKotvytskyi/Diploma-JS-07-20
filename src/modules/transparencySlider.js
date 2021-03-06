/* eslint-disable no-use-before-define */
const transparencySlider = () => {
    const
        maxWidth = 1090,
        slides = document.querySelectorAll('.transparency-slider .transparency-item'),
        arrowLeft = document.getElementById('transparency-arrow_left'),
        arrowRight = document.getElementById('transparency-arrow_right'),
        contract = document.querySelector('.popup.popup-transparency'),
        currentPage = document.querySelector('#transparency-popup-counter .slider-counter-content__current');

    let smallScreen = false,
        slideIndex = 0;

    // 1090px

    const showArrow = index => {
        if (index === 0) {
            arrowLeft.style.display = 'none';
            arrowRight.style.display = 'flex';
        } else if (index === slides.length - 1) {
            arrowLeft.style.display = 'flex';
            arrowRight.style.display = 'none';
        } else {
            arrowLeft.style.display = 'flex';
            arrowRight.style.display = 'flex';
        }
    };

    const handlerResize = () => {
        if (window.innerWidth <= maxWidth && smallScreen) return;

        if (window.innerWidth <= maxWidth) {
            smallScreen = true;
            showArrow(slideIndex);
            showSlide(slideIndex);
        } else {
            smallScreen = false;
            slides.forEach(elem => elem.style.display = 'flex');
            arrowLeft.style.display = 'none';
            arrowRight.style.display = 'none';

        }
    };

    const showSlide = index => {

        // currentPage.textContent = slideIndex + 1;
        if (!smallScreen) return;
        slides.forEach((elem, key) => {
            if (+key === index) {
                elem.style.display = 'flex';
            } else {
                elem.style.display = 'none';
            }
        });
    };

    arrowLeft.addEventListener('click', () => {
        slideIndex = (slideIndex === 0) ? slides.length - 1 : slideIndex - 1;
        showSlide(slideIndex);
        showArrow(slideIndex);
    });

    arrowRight.addEventListener('click', () => {
        slideIndex = (slideIndex === slides.length - 1) ? 0 : slideIndex + 1;
        showSlide(slideIndex);
        showArrow(slideIndex);
    });

    handlerResize();
    window.addEventListener('resize', handlerResize);

    contract.addEventListener('popupTransparencyClose', () => {
        slideIndex = +currentPage.textContent - 1;
        smallScreen = false;
        handlerResize();
    });

};

export default transparencySlider;
