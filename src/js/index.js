import $ from 'jquery';

import Menu from './components/menu';
import Roles from './components/roles';
import ScrollMenu from './components/scroll-menu';
import Test from './components/test';

$(document).ready(() => {
    window.testComponent = Test;

    const menu = new Menu($('.header__menu'));
    menu.init();

    const roles = new Roles($('.roles'));
    roles.init();

    const nav = new ScrollMenu($('#nav'));
    nav.init();
});
