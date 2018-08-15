import $ from 'jquery';

class Menu {
    constructor(menu) {
        this.menu = menu;
        this.menuButton = menu.find('.header__menu-button');
        this.closeButton = menu.find('.header__menu-page .close, .logo__small, nav a');
        this.element = menu.find('.header__menu-page');
    }

    events() {
        this.menuButton.on('click', () => {
            this.element.fadeIn( function() {
                $(this).css('opacity', "1").css('height', "100%");
            });
        });

        this.closeButton.on('click', (e) => {
            this.element.fadeOut( 500, function() {
                $(this).css('opacity', "0").css('height', "0");
            });
        });
    }

    init() {
        this.events();
    }
}

export default Menu;
