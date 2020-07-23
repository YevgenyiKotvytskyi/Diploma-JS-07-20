const sendForm = () => {

    const submitButton = document.querySelectorAll('form button');

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

    const handlerSubmit = e => {

        e.preventDefault();

        const form = e.target.closest('form');

        const isCheckedRequired  = () => {
            for (const elem of [...form.elements]) {
                if (elem.type.toLowerCase() === 'checkbox' &&
                    (elem.required || elem.id === 'checkbox1')) {
                    if (!elem.checked) console.log('Checkbox должен быть выбран!', elem);
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
        };

        const errorPost = error => {
            console.error(error);
        };

        postData(body, form, succesPost, errorPost);

    };

    submitButton.forEach(button => button.addEventListener('click', handlerSubmit));

};

export default sendForm;
