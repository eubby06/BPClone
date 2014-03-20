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
			$(elem).animate({
				height: '200px',
				width: '450px'
			}, 1000);

			$(elem).removeClass("hidden").addClass("shown");
		};

		var messageBoxToggle = function()
		{	
			console.log('hey');
		};

		var messageBoxes = $(this).children();

		messageBoxes.each(function( index ) 
		{
			var that = this;

			messageBoxHide(that);

			var messageTitle = $(this).find('h2');

			messageTitle.bind('click', function()
			{
				if ($(that).hasClass('hidden')) {

					messageBoxShow(that);

				} else {

					messageBoxHide(that);

				}
				
			});
		});

		messageBoxShow( $(messageBoxes.get( current )) );

		setInterval(function(){

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
	}

}( jQuery ));