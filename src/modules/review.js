const review = () => {

    const slides = document.querySelectorAll('#reviews .reviews-slider__slide'),
        arrowLeft = document.getElementById('reviews-arrow_left'),
        arrowRight = document.getElementById('reviews-arrow_right');

    let indexSlide = 0;

    const showSlide = index => {
        console.log('index: ', index);
        slides.forEach((elem, key) =>
            elem.style.display = (key === index) ? 'flex' : 'none');
    };

    arrowLeft.addEventListener('click', () => {
        indexSlide = (indexSlide === 0) ? slides.length - 1 : indexSlide - 1;
        showSlide(indexSlide);
    });

    arrowRight.addEventListener('click', () => {
        indexSlide = (indexSlide === slides.length - 1) ? 0 : indexSlide + 1;
        showSlide(indexSlide);
    });


};

export default review;
