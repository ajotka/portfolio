import $ from 'jquery';

class SelectLanguage {
    constructor(select) {
        this.select = select;
        this.selectLabel = select.find('.js-select-language__label');
        this.dropdown = select.find('.js-select-language__dropdown');
        this.element = select.find('.js-select-language__element');
    }

    static choseLanguage(lang) {
        window.location.href = lang;
    }

    events() {
        this.selectLabel.on('click', () => {
            this.dropdown.toggleClass('show');
        });

        this.element.on('click', (e) => {
            e.preventDefault();
            SelectLanguage.choseLanguage($(e.target).attr('data-language'));
        });
    }

    init() {
        console.log('Select Language init');

        this.events();
    }
}

export default SelectLanguage;
