import $ from 'jquery';

import Menu from './components/menu';
import Roles from './components/roles';
import Test from './components/test';

$(document).ready(() => {
    window.testComponent = Test;

    const menu = new Menu($('.header__menu'));
    menu.init();

    const roles = new Roles($('.roles'));
    roles.init();
});
