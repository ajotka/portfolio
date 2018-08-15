import $ from 'jquery';

class ScrollMenu {
    constructor(nav) {
        this.nav = nav;
    }

    events() {
    	var lastId,
        	navItems = $(this.nav).find("a"),
        	sections = $(navItems).map( function() {
					      var item = $($(this).attr("href"));
					      if (item.length) { return item; }
					    });
    	// Bind click handler to menu items
		// so we can get a fancy scroll animation
		$(navItems).click( function(e) {
			var href = $(this).attr("href"),
		    offsetTop = href === "#" ? 0 : $(href).offset().top - 100;
			$('html, body').stop().animate({ 
			 	scrollTop: offsetTop
			}, 300);
			e.preventDefault();
		});

		// Bind to scroll
		$(window).scroll( function() {
		   // Get container scroll position
		   var fromTop = $(this).scrollTop();
		   // Get id of current scroll item
		   var cur = $(sections).map( function() {
		     if ($(this).offset().top < fromTop)
		       return this;
		   });
		   // Get the id of the current element
		   cur = cur[cur.length-1];
		   var id = cur && cur.length ? cur[0].id : "";
		   // Set/remove current class
			    $(navItems)
				    .removeClass("current")
				    .filter("[href='#"+id+"']").addClass("current");
			if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
		       $(navItems)
		       		.removeClass("current")
		       		.filter("[href='#skills']").addClass("current");
		    }
			if($(window).scrollTop() + $(window).height() > $(document).height() - 56) {
		       $(navItems)
		       		.removeClass("current")
		       		.filter("[href='#contact']").addClass("current");
		    }
		});
    }

    init() {
        this.events();
    }
}

export default ScrollMenu;
