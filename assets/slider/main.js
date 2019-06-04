


$("ul.tabs").tabs("div.slide", {
	effect:"fade",
	fadeOutSpeed:400,
	rotate:true,
	onBeforeClick:function() {		
		$("#slider a.caption").each(function() {
			$(this).css("opacity", 0);
		});
	},
	onClick:function() {
	
		$("#slider a.caption").each(function() {
			$(this).css({"opacity":1, "bottom":"-10px"});
		});
	}
}).slideshow({interval:5000, clickable:false, autoplay:true});
