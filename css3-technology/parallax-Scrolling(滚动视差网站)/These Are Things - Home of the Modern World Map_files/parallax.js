/*Huge props to Jonathan Nicol of f6design.com whose parallax tutorial serves as the base for this site and the following code*/

$(document).ready(function() {

    $(".btn-slide").click(function(){
        $("#panel").slideToggle('slow', 'easeOutBounce');
    });
				
	redrawDotNav();
	
	/* Scroll event handler */
    $(window).bind('scroll',function(e){
    	parallaxScroll();
		redrawDotNav();
    });
    
	/* Next/prev and primary nav btn click handlers */
	$('a.scene01-about').click(function(){
    	$('html, body').animate({
    		scrollTop:0
    	}, { duration: 1750, easing: 'easeInOutQuad' }, function() {
	    	parallaxScroll(); // Callback is required for iOS
		});
    	return false;
	});
	
    $('a.scene02-shop').click(function(){
    	$('html, body').animate({
    		scrollTop:$('#scene02-shop').offset().top
    	}, { duration: 1750, easing: 'easeInOutQuad' }, function() {
	    	parallaxScroll(); // Callback is required for iOS
		});
    	return false;
    });
    
    $('a.scene03-studio').click(function(){
    	$('html, body').animate({
    		scrollTop:$('#scene03-studio').offset().top
    	}, { duration: 1750, easing: 'easeInOutQuad' }, function() {
	    	parallaxScroll(); // Callback is required for iOS
		});
    	return false;
    });
	$('a.scene04-blog').click(function(){
    	$('html, body').animate({
    		scrollTop:$('#scene04-blog').offset().top
    	}, { duration: 1750, easing: 'easeInOutQuad' }, function() {
	    	parallaxScroll(); // Callback is required for iOS
		});
    	return false;
    });
    
    $('a.scene05-about').click(function(){
    	$('html, body').animate({
    		scrollTop:$('#scene05-about').offset().top
    	}, { duration: 1750, easing: 'easeInOutQuad' }, function() {
	    	parallaxScroll(); // Callback is required for iOS
		});
    	return false;
    });
    
    $('a.scene06-contact').click(function(){
    	$('html, body').animate({
    		scrollTop:$('#scene06-contact').offset().top
    	}, { duration: 1750, easing: 'easeInOutQuad' }, function() {
	    	parallaxScroll(); // Callback is required for iOS
		});
    	return false;
    });
    
    /* Show/hide dot lav labels on hover */
    $('nav#primary a').hover(
    	function () {
			$(this).prev('h1').show();
		},
		function () {
			$(this).prev('h1').hide();
		}
    );
    
});

/* Scroll the background layers */
function parallaxScroll(){
	var scrolled = $(window).scrollTop();
	$('#parallax-bg1').css('top',(0-(scrolled*1))+'px');
	$('#parallax-bg2').css('top',(0-(scrolled*2))+'px');
	$('#parallax-bg3').css('top',(0-(scrolled*2.75))+'px');
}

/* Set navigation dots to an active state as the user scrolls */
function redrawDotNav(){
	var section1Top =  0;
	// The top of each section is offset by half the distance to the previous section.
	var section2Top =  $('#scene02-shop').offset().top - (($('#scene03-studio').offset().top - $('#scene02-shop').offset().top) / 2);
	var section3Top =  $('#scene03-studio').offset().top - (($('#scene04-blog').offset().top - $('#scene03-studio').offset().top) / 2);
	var section4Top =  $('#scene04-blog').offset().top - (($(document).height() - $('#scene04-blog').offset().top) / 2);
	var section5Top =  $('#scene05-about').offset().top - (($(document).height() - $('#scene04-blog').offset().top) / 2);
	//;
	/*$('nav#primary a').removeClass('active');
	if($(document).scrollTop() >= section1Top && $(document).scrollTop() < section2Top){
		$('nav#primary a.scene01-about').addClass('active');
	} else if ($(document).scrollTop() >= section2Top && $(document).scrollTop() < section3Top){
		$('nav#primary a.scene02-shop').addClass('active');
	} else if ($(document).scrollTop() >= section3Top && $(document).scrollTop() < section4Top){
		$('nav#primary a.scene03-studio').addClass('active');
	} else if ($(document).scrollTop() >= section4Top && $(document).scrollTop() < section5Top){
		$('nav#primary a.about').addClass('active');
	} else if ($(document).scrollTop() >= section5Top){
		$('nav#primary a.contact').addClass('active');
	}*/
	
}

/*$(function(){
								 
		  $(".bouncer").everyTime(10, function(){						 
             $(".bouncer").animate({top:"5px"}, 400).animate({top:"0px"}, 400);	
		  });
		  
	   });
	   
$(function(){
								 
		  $(".bouncerup").everyTime(10, function(){						 
             $(".bouncerup").animate({top:"0px"}, 400).animate({top:"5px"}, 400);	
		  });
		  
	   });*/


/*$(function(){
 
    //Add bounce effect on Click of the DIV
    $('div').click(function () {
          $(this).effect("bounce", { direction:'up', distance:'10', times:5 }, 50);
    });

});*/
/*
$(function(){
 
	$("div").draggable();
	
});*/
