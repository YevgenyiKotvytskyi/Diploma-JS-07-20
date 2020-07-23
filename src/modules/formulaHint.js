const formulaHint = () => {
    const formula = document.getElementById('formula'),
        hintOpasity = 0.7;
    let popUp;

    const styleRotete = () => {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `
        .formula-item-popup-rotate:before {
            transform: rotateX(180deg);
        }
        `;
        document.querySelector('head').append(style);
    };


    const handlerMouse = e => {

        const target = e.target,
            formulaItem = target.closest('.formula-item__icon');
        let activePopUp;

        if (formulaItem) {
            activePopUp = formulaItem.querySelector('.formula-item-popup');
            activePopUp.style.visibility = 'visible';
            activePopUp.style.opacity = hintOpasity;
            activePopUp.style.bottom = '90px';
            activePopUp.style.top = '';
            activePopUp.classList.remove('formula-item-popup-rotate');
            if (activePopUp.getBoundingClientRect().top < 0) {
                activePopUp.style.top = '160px';
                activePopUp.classList.add('formula-item-popup-rotate');
                activePopUp.style.background = '../images/formula/item_popup_5.svg';
            }
        }

        if (popUp !== activePopUp) {
            if (popUp) {
                popUp.style.visibility = 'hidden';
            }
            popUp = activePopUp;
        }

    };

    styleRotete();

    formula.addEventListener('mouseover', handlerMouse);

    formula.addEventListener('mouseleave', handlerMouse);

};
export default formulaHint;
