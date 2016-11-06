$(function () { // wait for document ready

//science animation
    function science(){
        var liquidOrange = $('#liquidOrange'),
            liquidBlue = $('#liquidblue'),
            drop = $('#drop'),
            pops = $('#pops circle'),
            tube = $('#tube'),
            boile = $('#boile circle');

        var master = new TimelineMax();
        master
            .add(animationA())
            .add(animationB());

        function animationA(){
            var tl1 = new TimelineMax();
            tl1
                .to(liquidOrange, 1.5, {x:'+=135', y:'-=200', ease: Power0.easeNone})
                .to(tube, 3, {strokeDashoffset:0 , ease: Sine.easeOut})
                .to(drop, 1.1, {scale:'+=2',y:195 , ease: Expo.easeIn, onComplete: function(){
                    tl1.set(drop,{css:{display:'none'}});
                }},'-=.2')
                .to(liquidBlue,.2,{css:{fill:'#00FF1E'}})
            return tl1;
        }

        function animationB(){
            var tl1 = new TimelineMax({repeat:-1});
            tl1
                .staggerTo(pops,.5, { opacity:0,scale:'-=.7',y:-130 ,  ease: Power0.easeNone},.4,0)
                .staggerFromTo(boile,.5, { opacity:0, ease: Power0.easeNone }, { opacity:1,scale:0,y:'-=60' , ease: Power0.easeNone},.1,0);


            return tl1;
        }

        return master;
    }

    science();


});