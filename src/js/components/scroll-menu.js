import $ from 'jquery';

class ScrollMenu {
    constructor(nav) {
        this.nav = nav;
    }

    events() {
        const navItems = $(this.nav).find('a');
        const sections = $(navItems).map(() => {
            const item = $($(this).attr('href'));
            if (item.length) {
                return item;
            }
            return null;
        });
        // Bind click handler to menu items
        // so we can get a fancy scroll animation
        $('.lazy-scroll').click((e) => {
            const href = $(this).attr('href');
            const offsetTop = href === '#' ? 0 : $(href).offset().top - 100;
            $('html, body').stop().animate({
                scrollTop: offsetTop,
            }, 300);
            e.preventDefault();
        });

        // Bind to scroll
        $(window).scroll(function () {
            // Get container scroll position
            const fromTop = $(this).scrollTop();
            // Get id of current scroll item
            let cur = $(sections).map(() => {
                if ($(this).offset().top < fromTop) return this;
                return null;
            });
            // Get the id of the current element
            cur = cur[cur.length - 1];
            const id = cur && cur.length ? cur[0].id : '';
            // Set/remove current class
            $(navItems)
                .removeClass('current')
                .filter(`[href='#${id}']`).addClass('current');
            if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
                $(navItems)
                    .removeClass('current')
                    .filter("[href='#skills']").addClass('current');
            }
            if ($(window).scrollTop() + $(window).height() > $(document).height() - 56) {
                $(navItems)
                    .removeClass('current')
                    .filter("[href='#contact']").addClass('current');
            }
        });
    }

    init() {
        this.events();
    }
}

export default ScrollMenu;
