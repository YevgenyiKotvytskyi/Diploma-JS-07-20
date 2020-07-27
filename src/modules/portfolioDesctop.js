const portfolioDesctop = () => {
    const arrowRight = document.getElementById('portfolio-arrow_right'),
        arrowLeft = document.getElementById('portfolio-arrow_left'),
        sliderTabs = document.querySelectorAll('.portfolio-slider__slide');
    let tabMax = 0,
        tabMin = 0,
        invisibleSlides = 0,
        mobileVersion = false;

    const init = () => {

        for (let i = sliderTabs.length - 1; i > -1; i--) {
            sliderTabs[i].style.order = i;
            tabMin  = Math.min(tabMin, i);
            tabMax  = Math.max(tabMax, i);
        }
    };

    const showArrows = () => {
        arrowLeft.style.display =  (tabMin > 0) ? 'flex' : 'none';
        arrowRight.style.display =  (tabMax < 6 + invisibleSlides) ? 'flex' : 'none';
    };

    init();

    arrowRight.addEventListener('click', () => {
        if (mobileVersion) return;
        tabMax++;
        for (const elem of sliderTabs) {
            if (+elem.style.order === tabMin) {
                elem.style.order = tabMax;
            }
        }
        tabMin++;
        showArrows();
    });

    arrowLeft.addEventListener('click', () => {
        if (mobileVersion) return;
        tabMin--;
        for (const elem of sliderTabs) {
            if (+elem.style.order === tabMax) {
                elem.style.order = tabMin;
            }
        }
        tabMax--;
        showArrows();
    });

    const reportWindowSize = () => {
        mobileVersion = false;
        if (window.innerWidth >=  1024)  {
            invisibleSlides = 0;
            showArrows();
        } else if (window.innerWidth >=  901) {
            invisibleSlides = 1;
            showArrows();
        } else if (window.innerWidth >=  576) {
            invisibleSlides = 2;
            showArrows();
        } else {
            mobileVersion = true;
        }
    };

    reportWindowSize();

    window.addEventListener('resize', reportWindowSize);

};

export default portfolioDesctop;
