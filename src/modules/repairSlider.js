const repairSlider = () => {

    const
        formulaSlider = document.querySelector('.formula-slider'),
        arrowLeft = document.getElementById('repair-types-arrow_left'),
        arrowRight = document.getElementById('repair-types-arrow_right'),
        arrowNavLeft = document.getElementById('nav-arrow-repair-left_base'),
        arrowNavRight = document.getElementById('nav-arrow-repair-right_base'),
        currentCounter = document.querySelector('#repair-counter .slider-counter-content__current'),
        totalCounter = document.querySelector('#repair-counter .slider-counter-content__total'),
        repairButtons = document.querySelectorAll('.nav-list-repair button'),
        navList = document.querySelector('.nav-list-repair'),
        sliders = document.querySelectorAll('.repair-types-slider>div');

    const sliderClassName = 'types-repair',
        maxWidth = 1024;

    let activeSliders,
        slidersIndex = 0,
        activeSlide = 0,
        smallScreen = false;

    const setActiveSlider = index => {
        activeSliders = document.querySelectorAll(`.${sliderClassName}${index + 1} .repair-types-slider__slide`);
        for (let i = 0; i < sliders.length; i++) {
            const current = sliders[i];
            if (i === index) {
                current.style.display = 'block';
                console.log('current-active: ', current);
            } else {
                current.style.display = 'none';
                console.log('current: ', current);
            }
        }
        totalCounter.textContent = activeSliders.length;
        activeSlide = 0;
        setActiveSlide(activeSlide);
        console.log('activeSlides.length: ', activeSliders.length);
    };

    const setActiveSlide = index => {
        currentCounter.textContent = index + 1;
        activeSliders.forEach((elem, i) => {
            if (i === index) {
                elem.style.display = 'block';
            } else {
                elem.style.display = 'none';
            }
        });
    };

    const handlerButton = e => {
        const target = e.target;

        if (target.tagName.toLowerCase() === 'button') {
            for (let i = 0; i < repairButtons.length; i++) {
                const current = repairButtons[i];
                if (current === target) {
                    current.classList.add('active');
                    setActiveSlider(i);
                } else {
                    current.classList.remove('active');
                }
            }
        }
    };

    const reportWindowSize = () => {
        if (window.innerWidth <= maxWidth && smallScreen) return;

        if (window.innerWidth <= maxWidth)  {
        //     smallScreen = true;
        //     slidersIndex = 1;
        //     showSlide(currentSlide);
        //     formulaSlider.style.display = 'flex';
        //     for (let i = 0; i < slideItems.length; i++) {
        //         if (i > 2) slideItems[i].style.display = 'none';
        //     }
        // 
        }
    };

    setActiveSlider(0);

    navList.addEventListener('click', handlerButton);

    arrowLeft.addEventListener('click', () => {
        activeSlide--;
        if (activeSlide < 0) activeSlide = activeSliders.length - 1;
        setActiveSlide(activeSlide);
    });

    arrowRight.addEventListener('click', () => {
        activeSlide++;
        if (activeSlide > activeSliders.length - 1) activeSlide = 0;
        setActiveSlide(activeSlide);
    });

    window.addEventListener('resize', reportWindowSize);

};

export default repairSlider;
