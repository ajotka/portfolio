// import $ from 'jquery';

class Test {
    constructor(component) {
        this.component = component;
    }

    init() {
        if (this.component) {
            try {
                console.log('Page is ready'); // eslint-disable-line no-console
            } catch (e) {
                console.warn(e); // eslint-disable-line no-console
            }
        }
    }
}

export default Test;
