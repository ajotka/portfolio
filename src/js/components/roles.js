import $ from 'jquery';

class Roles {
    constructor(roles) {
        this.roles = roles;
    }

    events() {
        let current = 1; // keeps track of the current div
        const height = this.roles.height(); // the height of the roles div
        const numberDivs = this.roles.children().length; // the number of children of the roles div
        const first = $('.roles div:nth-child(1)'); // the first div nested in roles div
        setInterval(() => {
            const number = current * -height;
            first.css('margin-top', `${number}px`);
            if (current === numberDivs) {
                first.css('margin-top', '0px');
                current = 1;
            } else {
                current += 1;
            }
        }, 2000);
    }

    init() {
        this.events();
    }
}

export default Roles;
