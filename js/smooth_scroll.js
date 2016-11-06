$(function(){

    var $window = $(window);
    var isTweening = false;

    document.onmousewheel = function(){ customScroll(); }
    if(document.addEventListener){
        document.addEventListener('DOMMouseScroll', customScroll, false);
    }

    function customScroll(event){

        var delta = 0;

        if (!event){
            event = window.event;
        }

        if (event.wheelDelta) {
            delta = event.wheelDelta/350;
        } else if(event.detail) {
            delta = -event.detail/3;
        }

        if (delta){

            //console.log(isTweening);

            //if(!isTweening){

            //isTweening = true;

            var scrollTop = $window.scrollTop();
            var finScroll = scrollTop - parseInt(delta*100) * 3;

            //console.log(finScroll);

            TweenMax.to($window, 0.5, {
                scrollTo : { y: finScroll, autoKill:true },
                ease: Power4.easeOut,
                autoKill: true,
                overwrite: 5,
                onComplete: function(){
                    //console.log(isTweening);
                    //isTweening = false;
                }
            });

            //}
        }

        if (event.preventDefault){
            event.preventDefault();
        }

        event.returnValue = false;

    }

});