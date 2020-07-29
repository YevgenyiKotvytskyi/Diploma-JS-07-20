const problemsHint = () => {
    const problem = document.getElementById('problems'),
        hintOpasity = 1;
    let popUp;

    const init = () => {
        problem.style.zIndex = 10;
        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `
        .problem-item-popup-rotate:before {
            transform: rotateX(180deg);
        }

        @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
            .problems-item-popup {left: -210px;}
        }

        `;
        document.querySelector('head').appendChild(style);
    };

    let smallScreen = (window.innerWidth <= 1024);

    const handlerMouse = e => {

        if (smallScreen) return;

        const target = e.target,
            problemItem = target.closest('.problems-item__icon');
        let activePopUp;

        if (problemItem) {
            activePopUp = problemItem.querySelector('.problems-item-popup');
            activePopUp.closest('.row').style.zIndex = '10';
            activePopUp.style.visibility = 'visible';
            activePopUp.style.opacity = hintOpasity;
            activePopUp.style.bottom = '90px';
            activePopUp.style.top = '';
            activePopUp.classList.remove('problem-item-popup-rotate');
            if (activePopUp.getBoundingClientRect().top < 0) {
                activePopUp.style.top = '250px';
                activePopUp.classList.add('problem-item-popup-rotate');
            }
        }

        if (popUp !== activePopUp) {
            if (popUp) {
                popUp.style.visibility = 'hidden';
                popUp.closest('.row').style.zIndex = '';
            }
            popUp = activePopUp;
        }

    };

    init();

    problem.addEventListener('mouseover', handlerMouse);

    problem.addEventListener('mouseleave', handlerMouse);

    window.addEventListener('resize', () => {
        smallScreen = (window.innerWidth <= 1024);
    });

};
export default problemsHint;
