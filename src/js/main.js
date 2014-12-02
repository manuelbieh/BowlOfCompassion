$(function() {

	$(document).on('load', function() {
		window.scrollTo(0, 0);
	});

	$(document).on('click', 'nav > ul > li', function(e) {
		var $$ = $(this);
		 var isOpen = $$.hasClass('is-open');
		$('nav > ul > li').removeClass('is-open');
		$$.toggleClass('is-open', !isOpen);
	});

	$(document).on('touchend click', '*', function(e) {

		if($(this).parents('nav').length == 0) {

			$('nav > ul > li').removeClass('is-open');

		}

	});

	$(document).on('click', '#toggle-nav', function(e) {
		e.preventDefault();
		$('header nav').toggleClass('is-open');
	});

	$(function() {
	    FastClick.attach(document.body);
	});

});