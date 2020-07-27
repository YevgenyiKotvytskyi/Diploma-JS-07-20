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

    const showAlert = descr => {
        const span = document.createElement('span');
        span.style.color = "red";
        span.style.color = "red";
        span.innerHTML = '<b>Выбирете чекбокс для отправки!<b><br>';
        descr.insertBefore(span, descr.firstChild);

        setTimeout(() => {
            descr.firstChild.remove();
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
                        if (descr) showAlert(descr);
                        console.error('Checkbox должен быть выбран!',);
                    }
                    return elem.checked;
                }
            }
            return true;
        };

        if  (!isCheckedRequired()) return;

        const formData = new FormData(form);
        const body = {};

        formData.forEach((val, key) => {
            body[key] = val;
        });


        const succesPost = () => {
            [...form.elements].forEach(elem => {
                if (elem.value) elem.value = '';
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

};

export default sendForm;
