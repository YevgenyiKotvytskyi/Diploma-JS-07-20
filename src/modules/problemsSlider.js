/* eslint-disable no-use-before-define */
import RoundSlider from './class/roundSlider.class';
const problemsSlider = () => {

    const  slider = new RoundSlider(
        document.querySelector('.problems-slider'),
        document.querySelectorAll('.problems-slider .problems-item'),
        document.getElementById('problems-arrow_left'),
        document.getElementById('problems-arrow_right'),
        document.querySelectorAll('.problems-slider .problems-item .problems-item-popup'),
        1024,
    );

    slider.init();

};

export default problemsSlider;
