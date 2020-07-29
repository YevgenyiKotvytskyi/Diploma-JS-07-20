const sendForm = () => {

    const submitButton = document.querySelectorAll('form button'),
        thank = document.querySelector('.popup.popup-thank'),
        close = document.querySelector('.popup.popup-thank .close');

    const postData = (body, form, succesPost, errorPost) => {
        fetch('./server.php',
            {
                method: 'POST',
                mode: 'same-origin',
                cache: 'default',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            .then(response => {
                if (response.status !== 200) throw new Error('Status network 200!');
                succesPost();
            })
            .catch(error => {
                errorPost(error);
            });
    };

    const showAlert = (descr, text) => {
        const span = document.createElement('span');
        span.style.color = "red";
        span.style.color = "red";
        span.innerHTML = `<b>${text}<b><br>`;
        descr.insertBefore(span, descr.firstChild);

        setTimeout(() => {
            descr.removeChild(descr.firstChild);
        }, 5000);

    };

    const handlerSubmit = e => {

        e.preventDefault();

        const form = e.target.closest('form');

        const isCheckedRequired  = () => {
            for (const elem of [...form.elements]) {
                if (elem.type.toLowerCase() === 'checkbox') {
                    if (!elem.checked) {
                        const descr = elem.parentNode.querySelector('.checkbox__descr');
                        if (descr) showAlert(descr, 'Выбирете чекбокс для отправки!');
                        console.error('Checkbox должен быть выбран!',);
                    }
                    return elem.checked;
                }
            }
            return true;
        };

        const isPhoneValid = (name, message, options) => {
            const elem = form.querySelector(`[name="${name}"]`);
            if (elem) {
                if (options.lenght && elem.value.length !== options.lenght) {
                    showAlert(elem.parentNode, message);
                    return false;
                }
                if (options.minLenght && elem.value.trim().length < options.minLenght) {
                    showAlert(elem.parentNode, message);
                    return false;
                }
            }
            return true;
        };

        if  (!isCheckedRequired()) return;
        if (!isPhoneValid('phone', 'Введите тел. из 18 цифр!', { lenght: 18 })) return;
        if (!isPhoneValid('name', 'Введите имя', { minLenght: 1 })) return;

        const formData = new FormData(form);
        const body = {};

        formData.forEach((val, key) => {
            body[key] = val;
        });


        const succesPost = () => {
            [...form.elements].forEach(elem => {
                if (elem.value) elem.value = '';
                if (elem.checked) elem.checked = false;
            });
            thank.style.visibility = 'visible';
        };

        const errorPost = error => {
            console.error(error);
        };

        postData(body, form, succesPost, errorPost);

    };

    submitButton.forEach(button => button.addEventListener('click', handlerSubmit));

    close.addEventListener('click', () => thank.style.visibility = 'hidden');

    const handlerKey = e => {
        const target = e.target,
            name = /[а-яА-ЯёЁ\s]+/g,
            input = target.value;

        let template = null;

        if (input && target.matches('form input[name=name]')) template = name;
        if (template) {
            const arrInput = input.match(template);
            if (arrInput) {
                target.value = arrInput.join('');
            } else {
                target.value = '';
            }
        }

    };

    document.addEventListener('input', handlerKey);


};

export default sendForm;
