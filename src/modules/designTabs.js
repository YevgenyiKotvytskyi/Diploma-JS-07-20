/* eslint-disable no-use-before-define */
const designTabs = () => {
    const
        panel = document.getElementById('designs-list'),
        buttons = document.querySelectorAll('#designs-list .button_o'),
        slides = document.querySelectorAll('#designs .designs-slider>div'),
        previews = document.querySelectorAll('#designs .preview-block'),
        arrrowPanelLeft = document.getElementById('nav-arrow-designs_left'),
        arrrowPanelRight = document.getElementById('nav-arrow-designs_right'),
        arrrowPhotoLeft = document.getElementById('design_left'),
        arrrowPhotoRight = document.getElementById('design_right'),
        currentCount = document.querySelector('#designs .slider-counter-content__current'),
        totalCount = document.querySelector('#designs .slider-counter-content__total'),
        popup = document.querySelector('.popup.popup-design'),
        close = document.querySelector('.popup.popup-design .close'),
        link = document.querySelector('.link-list-designs'),

        popupButtons = document.querySelectorAll('#nav-list-popup-designs .button_o'),
        popupSlides = document.querySelectorAll('.popup-design-slider>div'),
        popupCurrentCount = document.querySelector('#popup-designs-counter .slider-counter-content__current'),
        popupTotalCount = document.querySelector('#popup-designs-counter .slider-counter-content__total'),
        popupArrrowPhotoLeft = document.getElementById('popup_design_left'),
        popupArrrowPhotoRight = document.getElementById('popup_design_right'),
        popupText = document.querySelectorAll('.popup-design-text');

    let indexSlider = 0,
        indexPhoto = 0,
        wideScreen = false,
        minOrder = 0,
        maxOrder = 0,

        popupIndexPhoto = 0;


    //#region display

    const handlerButtonDesign = e => {
        const target = e.target;
        if (target.tagName.toLowerCase() === 'button') {
            buttons.forEach((elem, key) => {
                if (elem === target) {
                    indexSlider = +key;
                    elem.classList.add('active');
                } else {
                    elem.classList.remove('active');
                }
            });
            showSlide(indexSlider);
            indexPhoto = 0;
            showPhoto(indexPhoto);
        }
    };

    const showSlide = index => {
        slides.forEach((elem, key) => elem.style.display = (+key === index) ? 'block' : 'none');

        previews.forEach((elem, key) => {
            if (+key === index) {
                elem.classList.add('visible');
            } else {
                elem.classList.remove('visible');
            }
        });
    };

    const handlerPreview = e => {
        const target = e.target,
            blockItem = target.closest('.preview-block__item');

        if (blockItem) {
            showPhoto(+blockItem.dataset.key);
        }

    };

    const showPhoto = index => {

        const slide = slides[indexSlider],
            photos = slide.querySelectorAll('.designs-slider__style-slide');

        if (index < 0) index = photos.length - 1;
        if (index > photos.length - 1)  index = 0;

        currentCount.textContent = index + 1;
        totalCount.textContent = photos.length;

        photos.forEach((elem, key) => {
            if (+key === index) {
                elem.style.display =  'block';
            } else {
                elem.style.display =  'none';
            }
        });

        previews[indexSlider].querySelectorAll('.preview-block__item-inner').
            forEach((elem, key) => {
                if (key === index) {
                    elem.classList.add('preview_active');
                } else {
                    elem.classList.remove('preview_active');
                }
            });
        return index;
    };

    const init = () => {
        previews.forEach(elem => {
            const blockItems = elem.querySelectorAll('.preview-block__item');
            blockItems.forEach((elem, key) => elem.dataset.key = key);
        });

        buttons.forEach((elem, key) => {
            elem.style.order = key;
            minOrder = Math.min(minOrder, key);
            maxOrder = Math.max(maxOrder, key);
        });
    };

    const handlerResize = () => {
        const slideWide = 1024; // 1135
        if (window.innerWidth > slideWide && wideScreen) return;
        if (window.innerWidth < slideWide && !wideScreen) return;
        if (window.innerWidth > slideWide) {
            wideScreen = true;
        } else {
            wideScreen = false;
        }
    };

    init();
    handlerResize();

    arrrowPanelLeft.addEventListener('click', () => {
        maxOrder++;
        buttons.forEach(elem => {
            if (+elem.style.order === minOrder) elem.style.order = maxOrder;
        });
        minOrder++;
    });

    arrrowPanelRight.addEventListener('click', () => {
        minOrder--;
        buttons.forEach(elem => {
            if (+elem.style.order === maxOrder) elem.style.order = minOrder;
        });
        maxOrder--;
    });

    document.querySelector('#designs').addEventListener('click', handlerPreview);
    panel.addEventListener('click', handlerButtonDesign);

    arrrowPhotoLeft.addEventListener('click', () => {
        indexPhoto = showPhoto(--indexPhoto);
    });

    arrrowPhotoRight.addEventListener('click', () => {
        indexPhoto = showPhoto(++indexPhoto);
    });

    //#endregion

    //#region PopUp
    const showPopupSlider = () => {
        popup.style.visibility = 'visible';
        popupButtons.forEach((elem, key) => {
            if (key === indexSlider) {
                elem.classList.add('active');
            } else {
                elem.classList.remove('active');
            }
        });

        popupText.forEach((elem, key) => {
            if (key === indexSlider) {
                elem.classList.add('visible-content-block');
            } else {
                elem.classList.remove('visible-content-block');
            }
        });
        popupSlides.forEach((elem, key) => elem.style.display = (+key === indexSlider) ? 'block' : 'none');
        showPopUpPhoto(0);
    };

    const showPopUpPhoto = index => {
        const slide = popupSlides[indexSlider],
            photos = slide.querySelectorAll('.popup-design-slider__style-slide');

        if (index < 0) index = photos.length - 1;
        if (index > photos.length - 1)  index = 0;

        popupCurrentCount.textContent = index + 1;
        popupTotalCount.textContent = photos.length;

        photos.forEach((elem, key) => {
            if (+key === index) {
                elem.style.display =  'block';
            } else {
                elem.style.display =  'none';
            }
        });
        return index;
    };

    //#endregion

    link.addEventListener('click', showPopupSlider);
    close.addEventListener('click', () => popup.style.visibility = 'hidden');

    popupArrrowPhotoLeft.addEventListener('click', () => {
        popupIndexPhoto = showPopUpPhoto(--popupIndexPhoto);
    });

    popupArrrowPhotoRight.addEventListener('click', () => {
        popupIndexPhoto = showPopUpPhoto(++popupIndexPhoto);
    });

    window.addEventListener('resize', handlerResize);


};

export default designTabs;
