import $ from 'jquery';

class Menu {
    constructor(menu) {
        this.menu = menu;
        this.menuButton = menu.find('.menu-button');
        this.closeButton = menu.find('.menu-page .close, .logo__small, nav a');
        this.element = menu.find('.menu-page');
    }

    events() {
        this.menuButton.on('click', () => {
            this.element.fadeIn(function () {
                $(this).css('opacity', '1').css('height', '100%');
            });
        });

        this.closeButton.on('click', () => {
            this.element.fadeOut(500, function () {
                $(this).css('opacity', '0').css('height', '0');
            });
        });
    }

    init() {
        this.events();
    }
}

export default Menu;
