const menuScroll = () => {
    const popupMenu = document.querySelector('.popup-dialog-menu'),
        popupRepair = document.querySelector('.popup.popup-repair-types'),
        close = document.querySelector('.popup-repair-types .close'),
        linkRepair = document.querySelector('.link-list-repair a'),
        button = document.querySelector('.button-footer a');


    const moveScroll = finishPosition => {

        const start = Date.now(),
            startPosition =  document.documentElement.scrollTop,
            lasting = 1000,
            delay = 20,
            addScale = finishPosition / lasting;

        const timer = setInterval(() => {

            const timePassed = Date.now() - start;

            if (timePassed > 1000) {
                clearInterval(timer);
                document.documentElement.scrollTop = startPosition + finishPosition;
                return;
            }

            draw(timePassed);

        }, delay);

        function draw(timePassed) {
            document.documentElement.scrollTop = startPosition + timePassed * addScale;
        }

    };

    const scrollToLink = link => {
        if (link) {
            const linkElement = document.querySelector(link.getAttribute("href"));
            const refTop = linkElement.getBoundingClientRect().top;
            moveScroll(refTop);
        }

    };

    const toggePopupMenu = () => {
        if (popupRepair.style.visibility === '') {
            popupRepair.style.visibility  = 'visible';
        } else {
            popupRepair.style.visibility  = '';
        }
    };

    const handleMenu = e => {
        const target = e.target;

        const toggleMenu = () => {
            const transformValue = (window.innerWidth > 576) ? 'translate3d(645px,0,0)' : 'translate3d(0,-100vh,0)';
            if (popupMenu.style.transform !== 'translate3d(0px, 0px, 0px)') {
                popupMenu.style.transform  = 'translate3d(0,0,0)';
            } else {
                popupMenu.style.transform  = transformValue;
            }
        };

        if (target.matches('a.menu-link')) {
            e.preventDefault();
            toggleMenu();
            if (target.matches('.no-overflow')) {
                toggePopupMenu();
            } else {
                scrollToLink(target);
            }
            return;
        }

    };

    const handlePopupMenu = e => {
        const target = e.target;

        if (target === popupRepair && !target.matches('.popup-dialog')) {
            toggePopupMenu();
        }

    };

    const handlerButton = e => {
        e.preventDefault();
        const target = e.target;
        scrollToLink(target);
    }

    popupMenu.addEventListener('click', handleMenu);

    close.addEventListener('click', toggePopupMenu);

    popupRepair.addEventListener('click', handlePopupMenu);

    linkRepair.addEventListener('click', toggePopupMenu);

    button.addEventListener('click', handlerButton);

};

export default menuScroll;
