const consultButton = () => {

    const popup = document.querySelector('.popup.popup-consultation'),
        close = document.querySelector('.popup.popup-consultation .close');
    ;

    const handlerConsult = e => {
        const target = e.target,
            button = target.closest('button.button_wide');
        if (button && button.textContent.trim().toLowerCase() === 'проконсультироваться') {
            popup.style.visibility = 'visible';
        }
    };

    document.body.addEventListener('click', handlerConsult);
    close.addEventListener('click', () => popup.style.visibility = 'hidden');
};


export default consultButton;
