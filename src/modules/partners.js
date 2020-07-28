import Сarousel from './class/carousel.class';

const partners = () => {

    const carousel  = new Сarousel(document.querySelectorAll('#partners .partners-slider__slide'),
        document.getElementById('partners-arrow_left'),
        document.getElementById('partners-arrow_right')
    );

    carousel.eventListener();

};

export default partners;
