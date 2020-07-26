import Сarousel from './carousel.class';

const review = () => {

    const carousel  = new Сarousel(document.querySelectorAll('#reviews .reviews-slider__slide'),
        document.getElementById('reviews-arrow_left'),
        document.getElementById('reviews-arrow_right')
    );

    carousel.eventListener();

};

export default review;
