/* eslint-disable no-use-before-define */
const transparencyPopUp = () => {
    const
        slider = document.querySelector('.transparency-slider'),
        slides = document.querySelectorAll('.popup-transparency-slider__slide'),
        contract = document.querySelector('.popup.popup-transparency'),
        close = document.querySelector('.popup-transparency .close.mobile-hide'),
        current =  document.querySelector('.popup-transparency .slider-counter-content__current'),
        total =  document.querySelector('.popup-transparency .slider-counter-content__total'),
        arrowLeft = document.getElementById('transparency_left'),
        arrowRight = document.getElementById('transparency_right');

    let slideIndex = 0;

    const handlerSlider = e => {
        const target = e.target,
            slide = target.closest('.transparency-item');
        if (slide) {
            contract.style.visibility = 'visible';
        }
    };


    const showArrow = index => {
        if (index === 0) {
            arrowLeft.style.display = 'none';
            arrowRight.style.display = 'block';
        } else if (index === slides.length - 1) {
            arrowLeft.style.display = 'block';
            arrowRight.style.display = 'none';
        } else {
            arrowLeft.style.display = 'block';
            arrowRight.style.display = 'block';
        }
    };

    const showSlide = key => {

        const showElement = (elem, i) => {
            if (i === +key) {
                elem.style.display = 'block';
            } else {
                elem.style.display = 'none';
            }
        };

        slides.forEach(showElement);
        current.textContent = key + 1;
        showArrow(key);

    };

    const init = () => {
        slideIndex  = +current.textContent;
        total.textContent = slides.length;
        showArrow(slideIndex);
    };

    slider.addEventListener('click', handlerSlider);

    close.addEventListener('click', () => {
        contract.style.visibility = 'hidden';
        contract.dispatchEvent(new Event('popupTransparencyClose'));
    });

    arrowLeft.addEventListener('click', () => {
        slideIndex = (slideIndex === 0) ? slides.length - 1 : slideIndex - 1;
        showSlide(slideIndex);
    });

    arrowRight.addEventListener('click', () => {
        slideIndex = (slideIndex === slides.length - 1) ? 0 : slideIndex + 1;
        showSlide(slideIndex);
    });

    init();

};

export default transparencyPopUp;
