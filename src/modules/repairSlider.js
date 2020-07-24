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
            } else {
                current.style.display = 'none';
            }
        }
        totalCounter.textContent = activeSliders.length;
        activeSlide = 0;
        setActiveSlide(activeSlide);
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
        //debugger;
        const target = e.target;
        if (target.tagName.toLowerCase() === 'button') {
            if (smallScreen) {
                for (let i = 0; i <  repairButtons.length; i++) {
                    if (repairButtons[i] === target) {
                        slidersIndex = i;
                        setSlideButton(i);
                    }
                }
            } else {
                setActiveButton(target);
            }
        }
    };

    const setActiveButton = button => {
        for (let i = 0; i < repairButtons.length; i++) {
            const current = repairButtons[i];
            if (current === button) {
                current.classList.add('active');
                slidersIndex = i;
                setActiveSlider(i);
            } else {
                current.classList.remove('active');
            }
        }
    };

    const setSlideButton = index => {
        const prevIndex =  (index === 0) ? repairButtons.length - 1 : index - 1,
            nextIndex =  (index === repairButtons.length - 1) ? 0 : index + 1;

        repairButtons.forEach((elem, key) => {
            if (key === index) {
                elem.style.display = 'inline-block';
                elem.style.order = 1;
                setActiveButton(elem);
            } else if (key === prevIndex) {
                elem.style.display = 'inline-block';
                elem.style.order = 0;
            } else if (key === nextIndex) {
                elem.style.display = 'inline-block';
                elem.style.order = 2;
            } else {
                elem.style.display = 'none';
            }
        });
    };

    const reportWindowSize = () => {
        if (window.innerWidth <= maxWidth && smallScreen) return;

        if (window.innerWidth <= maxWidth)  {
            navList.style.justifyContent = 'flex-start';
            setSlideButton(slidersIndex);
            smallScreen = true;
        } else {
            repairButtons.forEach(elem => elem.style.display = 'inline-block');
            navList.style.justifyContent = '';
            smallScreen = false;
        }
    };

    reportWindowSize();
    setActiveSlider(0);

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

    navList.addEventListener('click', handlerButton);

    window.addEventListener('resize', reportWindowSize);

    arrowNavLeft.addEventListener('click', () => {
        slidersIndex--;
        if (slidersIndex < 0) slidersIndex =  repairButtons.length - 1;
        setSlideButton(slidersIndex);
    });

    arrowNavRight.addEventListener('click', () => {
        slidersIndex++;
        if (slidersIndex > repairButtons.length - 1) slidersIndex = 0;
        setSlideButton(slidersIndex);
    });

};

export default repairSlider;
