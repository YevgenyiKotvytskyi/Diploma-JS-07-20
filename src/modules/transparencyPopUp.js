/* eslint-disable no-use-before-define */
const transparencyPopUp = () => {
    const
        slider = document.querySelector('.transparency-slider'),
        items = document.querySelectorAll('.transparency-slider .transparency-item'),
        slides = document.querySelectorAll('.popup-transparency-slider__slide'),
        contract = document.querySelector('.popup.popup-transparency'),
        current =  document.querySelector('.popup-transparency .slider-counter-content__current'),
        total =  document.querySelector('.popup-transparency .slider-counter-content__total'),
        arrowLeft = document.getElementById('transparency_left'),
        arrowRight = document.getElementById('transparency_right');

    let slideIndex = 0;

    const handlerSlider = e => {
        const target = e.target,
            slide = target.closest('.transparency-item');
        if (slide) {
            slideIndex = +slide.dataset.key;
            showArrow(slideIndex);
            showSlide(slideIndex);
            contract.style.visibility = 'visible';
        }
    };


    const showArrow = index => {
        if (index === 0) {
            arrowLeft.style.display = 'none';
            arrowRight.style.display = 'block';
        } else if (index === slides.length - 1) {
            arrowLeft.style.display = 'block';
            arrowRight.style.display = 'none';
        } else {
            arrowLeft.style.display = 'block';
            arrowRight.style.display = 'block';
        }
    };

    const showSlide = key => {

        const showElement = (elem, i) => {
            if (i === +key) {
                elem.style.display = 'block';
            } else {
                elem.style.display = 'none';
            }
        };

        slides.forEach(showElement);
        current.textContent = key + 1;
        showArrow(key);

    };

    const init = () => {
        items.forEach((elem, key) => elem.dataset.key = key);
        total.textContent = slides.length;
        showArrow(slideIndex);
    };

    const handlerClose = () => {
        contract.style.visibility = 'hidden';
		let event;
		if (typeof(Event) === 'function') {
			event = new Event('popupTransparencyClose');
		} else {
			event = document.createEvent('Event');
			event.initEvent('popupTransparencyClose', true, true);
		}		
        contract.dispatchEvent(event);
    };

    slider.addEventListener('click', handlerSlider);

    arrowLeft.addEventListener('click', () => {
        slideIndex = (slideIndex === 0) ? slides.length - 1 : slideIndex - 1;
        showSlide(slideIndex);
    });

    arrowRight.addEventListener('click', () => {
        slideIndex = (slideIndex === slides.length - 1) ? 0 : slideIndex + 1;
        showSlide(slideIndex);
    });

    document.addEventListener('click', e => {
        const target = e.target;
        if (target.closest('.close')) handlerClose();
    });

    init();

};

export default transparencyPopUp;
