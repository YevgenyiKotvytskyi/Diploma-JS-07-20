const phoneShow = () => {
    const phone = document.querySelector('.header-contacts__phone-number-accord'),
        arrow = document.querySelector('.header-contacts__arrow'),
        link = phone.querySelector('a');

    arrow.addEventListener('click', e => {
        e.preventDefault();
        if (phone.style.position === 'absolute' || phone.style.position === '') {
            phone.style.position = 'relative';
            link.style.opacity = 1;
        } else {
            link.style.opacity = 0;
            phone.style.position = 'absolute';
        }
    });

};

export default phoneShow;
