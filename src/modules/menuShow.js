const menuShow = () => {
    const popupMenu =  document.querySelector('.popup-dialog-menu'),
        menu = document.querySelector('.menu'),
        closeMenu = document.querySelector('.close-menu'),
        main = document.getElementById('main');

    let open = false;

    const toggleMenu = () => {
        const transformValue = (window.innerWidth > 576) ? 'translate3d(645px,0,0)' : 'translate3d(0,-100vh,0)';
        if (popupMenu.style.transform !== 'translate3d(0px, 0px, 0px)') {
            popupMenu.style.transform  = 'translate3d(0,0,0)';
            open = true;
        } else {
            popupMenu.style.transform  = transformValue;
            open = true;
        }

    };

    menu.addEventListener('click', toggleMenu);

    closeMenu.addEventListener('click', toggleMenu);

    main.addEventListener('click', e => {
        if (!e.target.closest('.menu') && open)
            popupMenu.style.transform =
                (window.innerWidth > 576) ? 'translate3d(645px,0,0)' : 'translate3d(0,-100vh,0)';
    });

};

export default menuShow;
