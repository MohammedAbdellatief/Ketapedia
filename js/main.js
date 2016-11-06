$(function () { // wait for document ready

    //reload page on size change to aadjust tablet orientation
    //var supportsOrientationChange = "onorientationchange" in window,
    //    orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
    //window.addEventListener(orientationEvent, function() {
    //    window.location.reload();
    //}, false);

    $(document).ready(function(){
        $(this).scrollTop(0);
    });

    //apply whole script only on screen larger than 768 px wide or if tablet
    if ( !/Android|webOS|iPhone|iPod|iPad|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)  &&  $(window).width() >= 768) {

        $('body').removeClass('min_v');

        var $device = $('.device'),
            $play = $('.play'),
            $videoThumb = $('.vid_thumb'),
            $vLab = $('.v_lab'),
            $covers = $('.covers li'),
            $deviceInner = $('.device svg'),
            $innerS1 = $('.innerS1'),
            $innerS2 = $('.innerS2'),
            $innerS3 = $('.innerS3'),
            $wHeight = $(window).height(),
            $wWidth = $(window).width(),
            $dHeight = $($device).height(),
            $dWidth = $($device).width(),
            $dOffset = $($device).offset(),
            $bottomLP = $('.laptop_bottom').offset(),
            $bottomLPLeft = $bottomLP.left,
            $square = $('.sqr'),
            $prlx_lyr_1 = $('.prlx_lyr_1'),
            $prlx_lyr_2 = $('.prlx_lyr_2'),
            $parllax = $('.parallax');

        $parllax.height($(document).height());

        // init
        var ctrl = new ScrollMagic.Controller({
            globalSceneOptions: {
                triggerHook: 'onLeave'
            }
        });

        // change behaviour of controller to animate scroll instead of jump
        ctrl.scrollTo(function (newpos) {
            TweenMax.to(window, 1.3, {scrollTo: {y: newpos ,autoKill : true, ease: Sine.easeInOut}});
        });

        //  bind scroll to anchor links
        $(document).on("click", "a[href^=#]", function (e) {
            var id = $(this).attr("href");
            if ($(id).length > 0) {
                e.preventDefault();
                // trigger scroll
                ctrl.scrollTo(id);
            }
        });

        // Create all scenes
        $(".sec").each(function() {
            new ScrollMagic.Scene({
                triggerElement: this,
                duration: '40%'
            })
                .setPin(this)
                //.addIndicators()
                .addTo(ctrl);
        });



        //intro animations
        //TweenMax.set($videoThumb,{x:($dOffset.left ), y:($dOffset.top + 40)});
        TweenMax.to($device,.1,{className:"+=draw",onComplete:    function(){
            $device.removeClass('transition , slow');
            TweenMax.to($videoThumb,1,{opacity:1, delay:1.7});
        }});



        // device rotation (sec 1:2)
        var sec1 = new TimelineMax();
        sec1
            .to([$videoThumb, $play,$innerS1],.7, {opacity:0,scale:.5},0)
            .to($device, 1, {x: '-50%' , y:'+=50',scale:'+=.35', rotation:90},0)
            .to($('.device.top'),1,{opacity:0, delay:.5},0);


        new ScrollMagic.Scene({
            duration: '150%'
        })
            .setTween(sec1)
            .triggerElement($('body')[0])
            .addTo(ctrl);


        // parallax (sec 2:3)
        var currentTop = $square.offset().top;
        var randomTop =  currentTop + Math.random()*400;

        var prlx = new TimelineMax();
        prlx
            //.from($square, 20, {top: randomTop},0)
            .to($prlx_lyr_1, 40, {top:'+=900', delay:3},0)
            .to($prlx_lyr_2, 20, {top:'+=400'},0);

        new ScrollMagic.Scene({
            triggerElement: $('body')[0],
            duration: '400%'
        })
            .setTween(prlx)
            .addTo(ctrl);


        // sec2 animaion (sec 2:3)
        var sec2 = new TimelineMax();
        sec2
            .from($innerS2, 2, {opacity: 0, delay:6},0)
            .staggerFrom($covers,2,{opacity:0,scale:'-=.5', delay:6},1,0)
            .set($vLab ,{display:'block'});

        new ScrollMagic.Scene({
            triggerElement: $('body')[0],
            duration: '100%'
        })
            .setTween(sec2)
            .addTo(ctrl);

        //animation A
        function animationA(){
            var tl1 = new TimelineMax();
            tl1
                .to(liquidOrange, 1.2, {x:'+=135', y:'-=200', ease: Power0.easeNone})
                .to(tube, 2.2, {strokeDashoffset:0 , ease: Sine.easeOut})
                .to(drop, 1, {scale:'+=2',y:195 , ease: Expo.easeIn, onComplete: function(){
                    tl1.set(drop,{css:{display:'none'}});
                }},'-=.2')
                .to(liquidBlue,.2,{css:{fill:'#00FF1E'}})
            return tl1;
        }
        //animation B
        function animationB(){
            var tl1 = new TimelineMax({repeat:-1});
            tl1
                .staggerTo(pops,.5, { opacity:0,scale:'-=.7',y:-130 ,  ease: Power0.easeNone},.4,0)
                .staggerFromTo(boile,.5, { opacity:0, ease: Power0.easeNone }, { opacity:1,scale:0,y:'-=60' , ease: Power0.easeNone},.1,0);
            return tl1;
        }


        //science animation
        var master = new TimelineMax({paused:'true'}),
            liquidOrange = $('#liquidOrange'),
            liquidBlue = $('#liquidblue'),
            drop = $('#drop'),
            pops = $('#pops circle'),
            tube = $('#tube'),
            boile = $('#boile circle');

            master
                .add(animationA())
                .add(animationB());



        // device rotation Y (sec 2:3)
        var sec3 = new TimelineMax();
        sec3
            .to($covers,2,{opacity:0, delay:1.5})
            .to($device, 7, {bottom:'-=125'},'-=1')
            .to($deviceInner,10, {rotationY:-75},'-=7')
            .from($vLab,2, {opacity: 0, onComplete: function(){
                master.play();
            }},11)
            .from($innerS3,2, {opacity: 0, delay:5},'-=7');



        new ScrollMagic.Scene({
            triggerElement: $('#sec2')[0],
            duration: '130%'

        })
            .setTween(sec3)
            .addTo(ctrl);


        // footer animation
        var footer = new TimelineMax();
        footer
            .to($vLab,1, {opacity: 0, delay:1,onComplete:function(){
                //TweenMax.set($vLab,{position:'absolute', display:'block'});
            }})
            .to($device, 3, {scale:'-=.90',x:$bottomLPLeft -($wWidth/2), y:0,bottom:20, rotation:0, className:'+=white'},1.5)
            .to($deviceInner, 3, {rotationY:-30, onComplete: function(){
                master.pause(0);
            }},1.5);


        new ScrollMagic.Scene({
            triggerElement: $('#sec3')[0],
            duration: '120%'
        })
            .setTween(footer)
            .addTo(ctrl);

    }
    // if screen smaller than 768px
    else if( /Android|webOS|iPhone|iPod|iPad|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)  &&  $(window).width() >= 768 ){
        $('body').addClass('min_v');

    }

    //if touch device apply scroll on swipe
    //$(function(){
    //    var section = 1;
    //
    //    $('#swipebox')
    //        .swipeEvents()
    //        .bind("swipeDown",  function(){
    //            //swipe down code
    //            if(section > 1){
    //                section--;
    //                TweenMax.to(window, 0.5, {scrollTo:{y:$("#sec" + section).offset().top}});
    //            }
    //
    //        })
    //        .bind("swipeUp",    function(){
    //            //swipe up code
    //            if(section < 4){
    //                section++;
    //            }
    //            TweenMax.to(window, 0.5, {scrollTo:{y:$("#sec" + section).offset().top}});
    //
    //        });
    //});


});