const problemsHint = () => {
    const problem = document.getElementById('problems'),
        hintOpasity = 1;
    let popUp;

    const styleRotete = () => {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `
        .problem-item-popup-rotate:before {
            transform: rotateX(180deg);
        }
        `;
        document.querySelector('head').append(style);
    };


    const handlerMouse = e => {

        const target = e.target,
            problemItem = target.closest('.problems-item__icon');
        let activePopUp;

        if (problemItem) {
            activePopUp = problemItem.querySelector('.problems-item-popup');
            activePopUp.style.visibility = 'visible';
            activePopUp.style.opacity = hintOpasity;
            activePopUp.style.bottom = '90px';
            activePopUp.style.top = '';
            activePopUp.classList.remove('problem-item-popup-rotate');
            if (activePopUp.getBoundingClientRect().top < 0) {
                activePopUp.style.top = '160px';
                activePopUp.classList.add('problem-item-popup-rotate');
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

    problem.addEventListener('mouseover', handlerMouse);

    problem.addEventListener('mouseleave', handlerMouse);

};
export default problemsHint;
