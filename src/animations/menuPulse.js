import { TimelineMax, TweenMax } from "gsap";
let tl = new TimelineMax ();

const menuPulse = () => {

    tl.to ( '#myCollection', .2, {
        backgroundColor : 'hsla(0,0%,60%,.2)',
    } )
    .to ( '#myCollection', .2, {
        backgroundColor : '#fff',
    } )
    
};

export { menuPulse };