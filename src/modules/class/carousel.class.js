class Сarousel {

    constructor(slides,  arrowLeft, arrowRight) {
        this.slides = slides;
        this.arrowLeft = arrowLeft;
        this.arrowRight = arrowRight;
        this.indexSlide = 0;
        this.showSlide(this.indexSlide);
    }

    showSlide(index) {
        this.slides.forEach((elem, key) =>
            elem.style.display = (key === index) ? 'flex' : 'none');
    }

    eventListener() {

        this.arrowLeft.addEventListener('click', () => {
            this.indexSlide = (this.indexSlide === 0) ? this.slides.length - 1 : this.indexSlide - 1;
            this.showSlide(this.indexSlide);
        });

        this.arrowRight.addEventListener('click', () => {
            this.indexSlide = (this.indexSlide === this.slides.length - 1) ? 0 : this.indexSlide + 1;
            this.showSlide(this.indexSlide);
        });

    }

}

export default Сarousel;
