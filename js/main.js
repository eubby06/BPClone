(function ($) {

	$.fn.play = function( options ) {

		var current = 0;
		var operation = 'add';

		var settings = $.extend({
			min: 0,
			max: 0
		}, options);

		var messageBoxHide = function( elem ) 
		{
			$(elem).animate({
				height: '20px',
				width: '330px'
			}, 1000);

			$(elem).removeClass("shown").addClass("hidden");
		};

		var messageBoxShow = function( elem ) 
		{
			var src = $(elem).find('img').attr('src');

			$('.marketing').animate({
				opacity: .2
			}, 'fash', function() {
				$(this).css({
					'background': 'url(' + src +')'
				})
				.animate({
					opacity: 1
				});
			});

			$(elem).animate({
				height: '200px',
				width: '450px'
			}, 1000);

			$(elem).removeClass("hidden").addClass("shown");
		};

		var messageBoxes = $(this).children();

		var hideAll = function(){

			messageBoxes.each(function( index )
			{
				$(this).css('width','330px');
				$(this).css('height','20px');
				$(this).removeClass('shown').addClass('hidden');

			});
		};

		messageBoxes.each(function( index ) 
		{
			var that = this;

			//messageBoxHide(that);

			var messageTitle = $(this).find('h2');

			messageTitle.bind('click', function()
			{
				clearInterval(autoPlay);

				hideAll();

				if ($(that).hasClass('hidden')) {

					messageBoxShow(that);

				} else {

					messageBoxHide(that);

				}

				window.setTimeout("autoPlay", 2000);
			});
		});

		messageBoxShow( $(messageBoxes.get( current )) );

		var autoPlay = setInterval(function(){

			var number = current;
		
			switch(operation)
			{
				case 'add':
					if (number < settings.max) {
						number = number + 1;
					}
					
					if (number == settings.max) {
						operation = 'minus';
					}
				break;

				case 'minus':
					if (number > settings.min) {
						number = number - 1;
					}
					
					if (number == settings.min) {
						operation = 'add';
					}
				break;
			}

			var toHide = $(messageBoxes.get( current ));
			var toShow = $(messageBoxes.get( number ));

			messageBoxHide(toHide);
			messageBoxShow(toShow);

			current = number;

		},5000);

		autoPlay();
	}

}( jQuery ));