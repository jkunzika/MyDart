$(document).ready(function(){
var itemsOriginalWidth = $('.items').width();
var itemsCurrentWidth = itemsOriginalWidth;
var contentOriginalSize = $('.content').width();
var $body = $('body'); //Cache this for performance
			var diff = ($('#Accordion').width() - $('.content').width()) / 2;
            var setContentScale = function() {
            	
                var scaleSource = $body.width(),
                    scaleFactor = 0.75,                     
                    maxScale = 1000,
                    minScale = 500; //Tweak these values to taste

                var contentSize = scaleSource * scaleFactor; //Multiply the width of the body by the scaling factor:
                console.log("contentSize = " + contentSize);
                console.log("diff = " + diff);
                console.log("itemsOriginalWidth = " + itemsOriginalWidth);

                if (contentSize > maxScale){
                 contentSize = maxScale;
                 }
                if (contentSize < minScale) {
                contentSize = minScale; //Enforce the minimum and maximums
                }
                itemsCurrentWidth = $('.items').width();
                var itemsScaleFactor = $(window).width() - $('#Accordion').width() - $('.items').width();
                console.log("itemsScaleFactor = " + itemsScaleFactor);
                if(contentSize > 500 || contentSize < 1000){
                $('.items').css('width', itemsCurrentWidth + itemsScaleFactor);
                var resize = itemsCurrentWidth + itemsScaleFactor;
                console.log("items resized to = " + resize);
                }
                else{
                $('.items').css('width', itemsOriginalWidth);
                console.log("items resized to original width");
                }
                $('#Accordion').css('width', contentSize);// + '%');
                $('.content').css('width', contentSize - diff);// + '%');

                //$('body').css('font-size', fontSize + '%');
            }

            $(window).resize(function(){
                setContentScale();
            });

            //Fire it when the page first loads:
            setContentScale();
});