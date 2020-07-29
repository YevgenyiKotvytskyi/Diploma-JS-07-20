/* eslint-disable no-use-before-define */
const formulaSlider = () => {
    const maxWidth = 1024,
        formulaSlider = document.querySelector('.formula-slider'),
        arrowLeft = document.getElementById('formula-arrow_left'),
        arrowRight = document.getElementById('formula-arrow_right'),
        slideItems = document.querySelectorAll('.formula-slider .formula-item');

    let currentSlide = 0,
        smallScreen = false,
        small576 = false;



    function reportWindowSize() {

        if ((window.innerWidth <= 576 && !small576) || (window.innerWidth > 576 && small576)) {
            small576 = (window.innerWidth <= 576);
            showSlide(currentSlide);
        }

        if (window.innerWidth <= maxWidth && smallScreen) return;

        if (window.innerWidth <= maxWidth)  {
            smallScreen = true;
            currentSlide = 1;
            showSlide(currentSlide);
            formulaSlider.style.display = 'flex';
            for (let i = 0; i < slideItems.length; i++) {
                if (i > 2) slideItems[i].style.display = 'none';
            }
        } else {
            smallScreen = false;
            formulaSlider.style.display = 'block';
            slideItems.forEach(elem => elem.style.display = 'flex');
        }

    }

    const init = () => {
        slideItems.forEach((elem, key) => {
            elem.style.order = key;
        });
        showSlide(currentSlide);
    };

    const showSlide = index => {

        const
            leftItem = (index === 0) ? slideItems.length - 1 : index - 1,
            rightItem = (index === slideItems.length - 1) ? 0 : index + 1;

        for (let i = 0; i < slideItems.length; i++) {
            if (i === index) {
                slideItems[i].style.display = 'flex';
                slideItems[i].style.order = 1;
                slideItems[i].classList.add('active-item');
            } else if (i === leftItem && !small576) {
                slideItems[i].style.display = 'flex';
                slideItems[i].style.order = 0;
                slideItems[i].classList.remove('active-item');
            } else if (i === rightItem && !small576) {
                slideItems[i].style.display = 'flex';
                slideItems[i].style.order = 2;
                slideItems[i].classList.remove('active-item');
            } else {
                slideItems[i].style.display = 'none';
                slideItems[i].classList.remove('active-item');
            }
        }
    };


    init();
    reportWindowSize();

    arrowLeft.addEventListener('click', () => {
        currentSlide--;
        if (currentSlide < 0) currentSlide = slideItems.length - 1;
        showSlide(currentSlide);
    });

    arrowRight.addEventListener('click', () => {
        currentSlide++;
        if (currentSlide === slideItems.length - 1) currentSlide = 0;
        showSlide(currentSlide);
    });

    window.addEventListener('resize', reportWindowSize);

};

export default formulaSlider;
