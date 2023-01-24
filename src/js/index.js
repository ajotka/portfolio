import $ from 'jquery';
import './icons';

import Menu from './components/menu';
import Roles from './components/roles';
import ScrollMenu from './components/scroll-menu';

$(document).ready(() => {
    const menu = new Menu($('.header__menu'));
    menu.init();

    const roles = new Roles($('.roles'));
    roles.init();

    const nav = new ScrollMenu($('#nav'));
    nav.init();
});
