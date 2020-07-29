const menuShow = () => {
    const popupMenu =  document.querySelector('.popup-dialog-menu'),
        //popupMenu =  document.querySelector('.popup-menu'),
        menu = document.querySelector('.menu'),
        menuMobile = document.querySelector('.footer img.menu__icon'),
        closeMenu = document.querySelector('.close-menu');

    let open = false;

    const toggleMenu = e => {
        e.stopPropagation();
        const transformValue = (window.innerWidth > 576) ? 'translate3d(645px,0,0)' : 'translate3d(0,-100vh,0)';
        if (popupMenu.style.transform !== 'translate3d(0px, 0px, 0px)') {
            popupMenu.style.transform  = 'translate3d(0,0,0)';
            open = true;
        } else {
            popupMenu.style.transform  = transformValue;
            open = false;
        }

    };

    menu.addEventListener('click', toggleMenu);

    menuMobile.addEventListener('click', toggleMenu);

    closeMenu.addEventListener('click', toggleMenu);

    document.addEventListener('click', e => {
        if (!e.target.closest('.popup-dialog-menu') && open) {
            popupMenu.style.transform =
                 (window.innerWidth > 576) ? 'translate3d(645px,0,0)' : 'translate3d(0,-100vh,0)';
            open = false;
        }
    });

    window.addEventListener('resize', () => {
        if (!open) {
            popupMenu.style.transform =
                (window.innerWidth > 576) ? 'translate3d(645px,0,0)' : 'translate3d(0,-100vh,0)';
        }
    });
};

export default menuShow;
