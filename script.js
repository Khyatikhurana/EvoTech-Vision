const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstP(){
    var tl=gsap.timeline();

    tl.from('#nav',{
        y: '-10',
        opacity:0,
        duration: 1.5,
        ease:Expo.easeInOut

    })
    
        .to('.boundingelem',{
            y: 0,
            duration: 2,
            stagger: .2,
            delay:-1,
            ease:Expo.easeInOut
            
    })
        .from('#landingFooter',{
            y: -10,
            opacity:0,
            duration: 1.5,
            delay:-1,
            ease:Expo.easeInOut
        
})
}

//when mouse moves, the circle will skew with a given max and min skew
//when mouse moves,skew inc gradually
//normal=scale 1

function circleSkew(){
    //define default scale value
    var xscale=1;
    var yscale=1;
    var xprev=0;
    var yprev=0;

    window.addEventListener("mousemove",function(dets){
        // clearTimeout(timeout);

        var xdiff=dets.clientX-xprev;
        var ydiff=dets.clientY-yprev;
        xscale=gsap.utils.clamp(0.8,1.2,xdiff);
        yscale=gsap.utils.clamp(0.8,1.2,ydiff);

        xprev=dets.clientX;
        yprev=dets.clientY;
        
        
        circleMouse(xscale,yscale);
        // var timeout= setTimeout(function(){
        //     document.querySelector('#minicircle').style.transform=`translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;
        // },100);

        // console.log(xdiff,ydiff);
    });
}

function circleMouse(xscale,yscale){
    window.addEventListener("mousemove",function(dets){
        this.document.querySelector('#minicircle').style.transform=`translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale}, ${yscale})`;

    })
}
circleSkew();
circleMouse();
firstP();

// 1. select elem
// 2. mousemove on all 3
// 3. x and y pos of mousemove
// 4. now on x,y pos add image and move it,rotate while moving
// 5. rotation freq inc when mousemove freq inc

document.querySelectorAll(".elem").forEach(function(elem){
    var rotate=0;
    var diff_rot=0;
    elem.addEventListener("mouseleave",function(dets){
        var diff=dets.clientY-elem.getBoundingClientRect().top;
        diff_rot=dets.clientX-rotate;
        rotate=dets.clientX;
        gsap.to(elem.querySelector("img"),{
        opacity:0,
        ease: Power3,
        duration:0.5,
       });
    });

    elem.addEventListener("mousemove",function(dets){
        var diff=dets.clientY-elem.getBoundingClientRect().top;
        diff_rot=dets.clientX-rotate;
        rotate=dets.clientX;
        gsap.to(elem.querySelector("img"),{
        opacity:1,
        ease: Power3,
        top:diff,
        left:dets.clientX,
        rotate: gsap.utils.clamp(-20,20,diff_rot*0.5),
       });
    });

});