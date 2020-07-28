class RoundSlider {

    constructor(slider, slideItems, arrowLeft, arrowRight, popupItems, maxWidth) {
        this.slider = slider;
        this.slideItems = slideItems;
        this.arrowLeft = arrowLeft;
        this.arrowRight = arrowRight;
        this.popupItems = popupItems;
        this.maxWidth = maxWidth;

        this.currentSlide = 0;
        this.smallScreen = false;

    }

    init() {

        this.slideItems.forEach((elem, key) => {
            elem.style.order = key;
        });

        this.sizeChange();
        this.addLisseners();

        this.popupItems.forEach(elem => {
            elem.style.top = '300px';
        });

    }

    showSlide() {

        const
            leftItem = (this.currentSlide === 0) ? this.slideItems.length - 1 : this.currentSlide - 1,
            rightItem = (this.currentSlide === this.slideItems.length - 1) ? 0 : this.currentSlide + 1;

        this.popupItems.forEach(elem => elem.style.visibility = 'hidden');

        for (let i = 0; i < this.slideItems.length; i++) {
            if (i === this.currentSlide) {
                this.slideItems[i].style.display = 'flex';
                this.slideItems[i].style.order = 1;
                this.slideItems[i].classList.add('active-item');
            } else if (i === leftItem) {
                this.slideItems[i].style.display = 'flex';
                this.slideItems[i].style.order = 0;
                this.slideItems[i].classList.remove('active-item');
            } else if (i === rightItem) {
                this.slideItems[i].style.display = 'flex';
                this.slideItems[i].style.order = 2;
                this.slideItems[i].classList.remove('active-item');
            } else {
                this.slideItems[i].style.display = 'none';
                this.slideItems[i].classList.remove('active-item');
            }
        }
        this.popupItems[this.currentSlide].style.visibility = 'visible';

    }

    sizeChange() {

        if (window.innerWidth <= this.maxWidth && this.smallScreen) return;

        if (window.innerWidth <= this.maxWidth)  {

            this.smallScreen = true;
            this.currentSlide = 1;
            this.showSlide(this.currentSlide);
            this.slider.style.display = 'flex';
            this.slideItems.forEach(elem => {
                elem.style.width = "180px";
                elem.querySelector('.problems-item__descr').style.width = "180px";
            });

            for (let i = 0; i < this.slideItems.length; i++) {
                if (i > 2) this.slideItems[i].style.display = 'none';
            }

        } else {
            this.smallScreen = false;
            this.slideItems.forEach(elem => elem.style.width = "");
            this.slider.style.display = 'block';
            this.slideItems.forEach(elem => elem.style.display = 'flex');
        }
    }

    addLisseners() {

        this.arrowLeft.addEventListener('click', () => {
            this.currentSlide--;
            if (this.currentSlide < 0) this.currentSlide = this.slideItems.length - 1;
            this.showSlide(this.currentSlide);
        });

        this.arrowRight.addEventListener('click', () => {
            this.currentSlide++;
            if (this.currentSlide === this.slideItems.length - 1) this.currentSlide = 0;
            this.showSlide(this.currentSlide);
        });

        window.addEventListener('resize', this.sizeChange.bind(this));
    }
}

export default RoundSlider;
