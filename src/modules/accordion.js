const accordion = () => {
    const ul = document.querySelector('#faq .accordion ul'),
        questions = document.querySelectorAll('#faq .accordion li h2');

    const handlerQuestion = e => {
        const target = e.target,
            question = target.closest('h2');

        if (question) {
            questions.forEach(elem => elem.classList.remove('msg-active'));
            question.classList.add('msg-active');
        }

    };

    ul.addEventListener('click', handlerQuestion);
};

export default accordion;
