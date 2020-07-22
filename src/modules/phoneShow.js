const phoneShow = () => {
    const phones = document.querySelectorAll('.footer-contacts__phones .footer-contacts__phones-phone');
    const arrow = document.createElement('span');


    const showAppPhones = (displayValue = 'none') => {
        if (phones.length < 2) return;
        let first = true;
        phones.forEach(elem => {
            if (first) {
                first = false;
            } else {
                elem.style.display = displayValue;
            }
        });
    };

    const showArrow = () => {
        const phone = phones[0];
        if (phones) {
            arrow.innerHTML = 'ᐱ<br>';
            arrow.style.cssText = `margin-left: 2px;
                font-weight: lighter;
                color: grey;
                `;
            phone.after(arrow);
        }
    };


    arrow.addEventListener('mouseover', e => {
        const target = e.target;
        target.style.fontWeight = 'bold';
        console.log('target.style.cursor: ', target.style.cursor);
        target.style.cursor = "pointer";
    });

    arrow.addEventListener('mouseleave', e => {
        const target = e.target;
        target.style.fontWeight = 'lighter';
        target.style.cursor = "none";
    });

    arrow.addEventListener('click', e => {
        e.preventDefault();
        if (phones.length < 2) return;
        if (phones[0].style.display === phones[1].style.display) {
            showAppPhones();
        } else {
            showAppPhones(phones[0].style.display);
        }
    });
    showArrow();
};

export default phoneShow;
