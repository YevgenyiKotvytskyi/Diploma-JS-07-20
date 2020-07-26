/* eslint-disable no-use-before-define */
const service = () => {

    const nav = document.querySelector('.nav-list-popup-repair'),
        popupRepair = document.querySelector('.popup.popup-repair-types'),
        tableContent = document.querySelector('.popup-repair-types-content-table'),
        tableTitle = document.getElementById('switch-inner'),
        date = document.querySelector('.popup-repair-types-content__head-date'),
        arrowLeft = document.getElementById('nav-arrow-popup-repair_left'),
        arrowRight = document.getElementById('nav-arrow-popup-repair_right')
        ;

    const SCREEN = 1025;
    //#region Navigation

    let
        buttons = document.querySelectorAll('.nav-list.nav-list-popup-repair button'),
        tables = document.querySelectorAll('.popup-repair-types-content-table table'),
        indexButton = 0,
        smallScreen = false;

    const init = () => {
        buttons.forEach((elem, key) => elem.dataset.key = key);
    };

    init();

    const handlerButton = e => {
        const button = e.target.closest('button');
        if (button) {
            indexButton = +button.dataset.key || 0;
            showTable(indexButton);
        }
    };

    const showTable = index => {
        buttons.forEach((elem, key) => {
            if (key === index) {
                elem.style.display = 'block';
                elem.classList.add('active');
                tableTitle.textContent = elem.textContent;
            } else {
                elem.style.display = (smallScreen) ? 'none' : 'block';
                console.log('smallScreen: ', smallScreen, elem.style.display);
                elem.classList.remove('active');
            }
        });

        tables.forEach((elem, key) => {
            if (+key === index) {
                elem.style.display = 'table';
            } else {
                elem.style.display = 'none';
            }
        });
    };

    nav.addEventListener('click', handlerButton);
    //#endregion

    //#region get service data from server
    const success = data => {

        nav.innerHTML = '';
        tableContent.innerHTML = '';
        let buttonIndex = 0;

        data.forEach(elem => {
            if (elem.title) {
                nav.insertAdjacentHTML('beforeend', buttonHTML(elem.title, buttonIndex++));
                const table = createRepairListTable(elem.priceList);
                tableContent.append(table);
            }
            if (elem.date)  {
                try {
                    const [ day, month, year ] = elem.date.split('.'),
                        newDate = new Date(`${month} ${day} ${year}`);
                    date.textContent = newDate
                        .toLocaleDateString('ru', { year: 'numeric', month: 'long', day: 'numeric' });
                } catch (error) {
                    date.textContent = '***';
                    console.error(error);
                }

            }
        });

        buttons = document.querySelectorAll('.nav-list.nav-list-popup-repair button');
        tables = document.querySelectorAll('.popup-repair-types-content-table table');
        indexButton = 0;
        showTable(indexButton);
        showArrow(indexButton);

    };

    const buttonHTML = (text, key) =>
        `<button class="button_o popup-repair-types-nav__item"  data-key="${key}">${text}</button>`;

    const createRepairListTable = priceList => {
        const table = document.createElement('table');
        table.classList.add('popup-repair-types-content-table__list');
        table.innerHTML = '<tbody></tbody>';
        const body = table.firstChild;
        priceList.forEach(row => {
            body.insertAdjacentHTML('beforeend',
                `
    <tr class="mobile-row">
        <td class="repair-types-name">${row.typeService}</td>
        <td class="mobile-col-title tablet-hide desktop-hide">Ед.измерения</td>
        <td class="mobile-col-title tablet-hide desktop-hide">Цена за ед.</td>
        <td class="repair-types-value">${(row.units.trim() === 'м2') ? 'м<sup>2</sup' : row.units}</td>
        <td class="repair-types-value">${row.cost}</td>
    </tr>
`);
        });
        return table;
    };

    const error = error => {
        console.log(error);
    };

    const getData = (success, error) => {
        fetch('db/db.json')
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('response status isn\'t 200');
                }
                return response.json();
            })
            .then(success)
            .catch(error);
    };

    document.body.addEventListener('loadServiceData', () => {
        getData(success, error);
    });

    //#region

    //#region Service link handler

    const handlerServise = e => {
        const target = e.target,
            link = target.closest('.link-list-repair');

        if (link && !link.closest('.popup-menu')) {
            popupRepair.style.visibility  = 'visible';
            document.body.dispatchEvent(new Event('loadServiceData'));
        }
    };

    document.body.addEventListener('click', handlerServise);

    //#endregion

    //#region Slider

    const handlerResize = () => {
        if (window.innerWidth <= SCREEN && smallScreen) return;
        if (window.innerWidth > SCREEN && !smallScreen) return;
        smallScreen = (window.innerWidth <= SCREEN);
        showTable(indexButton);
        showArrow(indexButton);
    };


    const showArrow = index => {
        arrowLeft.style.display = (index === 0) ? 'none' : 'block';
        arrowRight.style.display = (index === buttons.length - 1) ? 'none' : 'block';
    };

    handlerResize();
    window.addEventListener('resize', handlerResize);

    arrowLeft.addEventListener('click', () => {
        indexButton--;
        showTable(indexButton);
        showArrow(indexButton);
    });


    arrowRight.addEventListener('click', () => {
        indexButton++;
        showTable(indexButton);
        showArrow(indexButton);
    });

    //#endregion


};

export default service;
