(function ($) {

	$.fn.play = function( options ) {

		var current = 0;
		var operation = 'add';
		var clickNext;

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
					'background': 'url(' + src +') center no-repeat'
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

		messageBoxes.each(function( index ) 
		{
			var that = this;

			//messageBoxHide(that);

			var messageTitle = $(this).find('h2');

			messageTitle.bind('click', function()
			{

				var toHideIndex = current;

				clearInterval(autoPlay);

				var toHide = $(messageBoxes.get( toHideIndex ));

				if (current != index) {
					messageBoxHide(toHide);
				}

				if ($(that).hasClass('hidden')) {

					messageBoxShow(that);

				}

				current = index;

			});
		});

		messageBoxShow( $(messageBoxes.get( current )) );

		var autoPlay = setInterval(function(){

			var next = current;
		
			switch(operation)
			{
				case 'add':
					if (next < settings.max) {
						next = next + 1;
					}
					
					if (next == settings.max) {
						operation = 'minus';
					}
				break;

				case 'minus':
					if (next > settings.min) {
						next = next - 1;
					}
					
					if (next == settings.min) {
						operation = 'add';
					}
				break;
			}

			var toHide = $(messageBoxes.get( current ));
			var toShow = $(messageBoxes.get( next ));

			messageBoxHide(toHide);
			messageBoxShow(toShow);

			current = next;

		}, 5000);
	}

}( jQuery ));