const menuShow = () => {
    const popupMenu =  document.querySelector('.popup-dialog-menu'),
        menu = document.querySelector('.menu'),
        closeMenu = document.querySelector('.close-menu');

    const toggleMenu = () => {
        const transformValue = (window.innerWidth > 576) ? 'translate3d(645px,0,0)' : 'translate3d(0,-100vh,0)';
        if (popupMenu.style.transform !== 'translate3d(0px, 0px, 0px)') {
            popupMenu.style.transform  = 'translate3d(0,0,0)';
        } else {
            popupMenu.style.transform  = transformValue;
        }

    };

    menu.addEventListener('click', toggleMenu);
    closeMenu.addEventListener('click', toggleMenu);

};

export default menuShow;
