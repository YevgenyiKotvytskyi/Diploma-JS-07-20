/* eslint-disable no-use-before-define */
const scheme = () => {
    const buttons = document.querySelectorAll('#scheme-list button'),
        slides = document.querySelectorAll('#scheme .scheme-slider__slide'),
        descriptions = document.querySelectorAll('#scheme .scheme-description-block'),
        arrowLeft = document.getElementById('nav-arrow-scheme_left'),
        arrowRight = document.getElementById('nav-arrow-scheme_right');

    let indexButton = 0,
        minOrder = 0,
        maxOrder = 0;


    const handlerButton = e => {
        const target = e.target,
            button = target.closest('button');

        if (button) {
            indexButton = +button.dataset.key;
            setActive(buttons, indexButton, 'active');
            slides.forEach((elem, key) =>
                elem.style.display = (key === indexButton) ? 'block' : 'none');
            descriptions.forEach((elem, key) =>
                elem.style.display = (key === indexButton) ? 'block' : 'none');
        }
    };

    const setActive = (list, index, className) => {
        list.forEach((elem, key) => {
            if (key === index) {
                elem.classList.add(className);
            } else {
                elem.classList.remove(className);
            }
        });
    };

    const init = () =>  {

        buttons.forEach((elem, key) => elem.dataset.key = key);

        buttons.forEach((elem, key) => {
            elem.style.order = key;
            minOrder = Math.min(minOrder, key);
            maxOrder = Math.max(maxOrder, key);
        });
    };

    init();

    document.getElementById('scheme-list').addEventListener('click', handlerButton);

    arrowLeft.addEventListener('click', () => {
        maxOrder++;
        buttons.forEach(elem => {
            if (+elem.style.order === minOrder) elem.style.order = maxOrder;
        });
        minOrder++;
    });

    arrowRight.addEventListener('click', () => {
        minOrder--;
        buttons.forEach(elem => {
            if (+elem.style.order === maxOrder) elem.style.order = minOrder;
        });
        maxOrder--;
    });


};

export default scheme;
