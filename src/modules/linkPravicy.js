const linkPravicy = () => {
    const links = document.querySelectorAll('.link-privacy'),
        popupPrivacy = document.querySelector('.popup.popup-privacy'),
        close = document.querySelector('.close.mobile-hide');


    links.forEach(link =>
        link.addEventListener('click', () => {
            popupPrivacy.style.visibility = 'visible';
        })
    );

    popupPrivacy.addEventListener('click', e => {
        if (!e.target.closest('.popup-dialog')) popupPrivacy.style.visibility = 'hidden';
    });

    close.addEventListener('click', () => popupPrivacy.style.visibility = 'hidden');
};

export default linkPravicy;
