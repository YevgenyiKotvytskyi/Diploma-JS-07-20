/* eslint-disable no-use-before-define */
const portfolioPopUp = () => {
    const portfolio = document.querySelector('.portfolio-slider'),
        popupPortfolio = document.querySelector('.popup-portfolio'),
        close = document.querySelector('.popup-portfolio .close'),
        slideFrames = document.querySelectorAll('.portfolio-slider .portfolio-slider__slide-frame'),
        slides = document.querySelectorAll('.popup-portfolio-slider .popup-portfolio-slider__slide'),
        texts = document.querySelectorAll('.popup-portfolio .popup-portfolio-text'),
        currentCounter = document.querySelector('.popup-portfolio .slider-counter-content__current'),
        totalCounter = document.querySelector('.popup-portfolio .slider-counter-content__total'),
        arrowLeft = document.getElementById('popup_portfolio_left'),
        arrowRight = document.getElementById('popup_portfolio_right');

    let slideIndex = 0;

    const handlerSlide = e => {
        const target = e.target,
            slideFrame = target.closest('.portfolio-slider__slide-frame');

        if (slideFrame) {
            showSlide(slideFrame.dataset.key);
        }


    };

    const init = () => {
        slideFrames.forEach((elem, key) => {
            elem.dataset.key = key;
        });
        totalCounter.textContent = slideFrames.length;
    };

    const showSlide = key => {

        const showElement = (elem, i) => {
            if (i === +key) {
                elem.style.display = 'block';
            } else {
                elem.style.display = 'none';
            }
        };

        if (+key === 0) {
            arrowLeft.style.display = 'none';
            arrowRight.style.display = 'block';
        } else if (+key === slides.length - 1) {
            arrowLeft.style.display = 'block';
            arrowRight.style.display = 'none';
        } else {
            arrowLeft.style.display = 'block';
            arrowRight.style.display = 'block';
        }

        slides.forEach(showElement);
        texts.forEach(showElement);

        currentCounter.textContent = +key + 1;
        slideIndex = +key;

        popupPortfolio.style.visibility = 'visible';
    };

    portfolio.addEventListener('click', handlerSlide);

    close.addEventListener('click', () => popupPortfolio.style.visibility = 'hidden');
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

export default portfolioPopUp;
