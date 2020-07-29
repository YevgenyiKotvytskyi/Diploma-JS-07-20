/* eslint-disable no-use-before-define */
const portfolioMobile = () => {

    const arrowRight = document.getElementById('portfolio-arrow_right'),
        arrowLeft = document.getElementById('portfolio-arrow_left'),
        arrowRightMobile = document.getElementById('portfolio-arrow-mobile_right'),
        arrowLeftMobile = document.getElementById('portfolio-arrow-mobile_left'),

        current = document.querySelector('#portfolio-counter .slider-counter-content__current'),
        total = document.querySelector('#portfolio-counter .slider-counter-content__total'),
        slides = document.querySelectorAll('.portfolio-slider-mobile .portfolio-slider__slide-frame');

    let sliderIndex = 0;

    const styleHover = () => {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `

         @media (max-width: 575px) {
            .portfolio-slider__slide-frame:before {
                display: none;
                z-index: -100;
            }
        }

        `;
        document.querySelector('head').appendChild(style);
    };


    const init = () => {
        styleHover();
        arrowRightMobile.style.zIndex = 200;
        arrowLeftMobile.style.zIndex = 200;
        current.textContent = 1;
        total.textContent = slides.length;
        slides.forEach(elem => {
            elem.style.cursor = 'default';
            elem.querySelector('.item-hover').style.display = 'none';
        });

        showArrow();
    };

    const showArrow = () => {
        if (window.innerWidth <  576) {
            arrowRightMobile.style.display = (sliderIndex < slides.length - 1) ? 'flex' : 'none';
            arrowLeftMobile.style.display = (sliderIndex > 0) ? 'flex' : 'none';
            arrowRight.style.display =  'none';
            arrowLeft.style.display =  'none';
        } else {
            arrowRightMobile.style.display = 'none';
            arrowLeftMobile.style.display =  'none';
        }
    };

    arrowRightMobile.addEventListener('click', () => {


        if (window.innerWidth >=  576) return;

        console.log('window.innerWidth >=  576: ', window.innerWidth >=  576);

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

    arrowLeftMobile.addEventListener('click', () => {
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
        showArrow();
    });

    init();

};

export default portfolioMobile;
