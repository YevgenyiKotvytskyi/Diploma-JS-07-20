const formulaSlider = () => {
    const maxWidth = 1024,
        formulaSlider = document.querySelector('.formula-slider'),
        arrowLeft = document.getElementById('formula-arrow_left'),
        arrowRight = document.getElementById('formula-arrow_right');

    const arrowTop = '50%';

    let currentSlide = 1,
        slideItems = document.querySelectorAll('.formula-slider .formula-item'),
        smallScreen = false;

    const
        firstItem = slideItems[0].cloneNode(true),
        lastItem = slideItems[slideItems.length - 1].cloneNode(true);


    function reportWindowSize() {
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
        arrowLeft.style.top = arrowTop;
        arrowRight.style.top = arrowTop;
        formulaSlider.prepend(lastItem);
        formulaSlider.append(firstItem);
        slideItems = document.querySelectorAll('.formula-slider .formula-item');
        slideItems.forEach (elem => elem.style.justifyContent = 'start');
        showSlide(currentSlide);
    };

    const showSlide = index => {

        const
            leftItem = index - 1,
            rightItem = index + 1;

        for (let i = 0; i < slideItems.length; i++) {
            if (i === index) {
                slideItems[i].style.display = 'flex';
                slideItems[i].classList.add('active-item');
            } else if (i === leftItem || i === rightItem) {
                slideItems[i].style.display = 'flex';
                slideItems[i].classList.remove('active-item');
            } else {
                slideItems[i].style.display = 'none';
                slideItems[i].classList.remove('active-item');
            }
        }

    };

    init();
    reportWindowSize();

    arrowLeft.addEventListener('click', e => {
        currentSlide--;
        if (currentSlide < 1) currentSlide = slideItems.length - 2;
        showSlide(currentSlide);
    });

    arrowRight.addEventListener('click', e => {
        currentSlide++;
        if (currentSlide > slideItems.length - 2) currentSlide = 1;
        showSlide(currentSlide);
    });

    window.addEventListener('resize', reportWindowSize);

};

export default formulaSlider;
