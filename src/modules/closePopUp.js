const closePopUp = () => {

    //const popup = document.querySelector('.popup');

    const handlerClose = e => {
        const target = e.target,
            popup = target.closest('body>.popup');

        if (popup && popup.style.visibility === 'visible') {
            if (popup === target || target.matches('.close')) {
                popup.style.visibility = '';
            }
            if (popup.closest('.popup-transparency')) {

                let event;
                if (typeof(Event) === 'function') {
                    event = new Event('popupTransparencyClose');
                } else {
                    event = document.createEvent('Event');
                    event.initEvent('popupTransparencyClose', true, true);
                }

                popup.closest('.popup-transparency').dispatchEvent(event);
            }
        }
    };

    document.addEventListener('click', handlerClose);
};

export default closePopUp;
