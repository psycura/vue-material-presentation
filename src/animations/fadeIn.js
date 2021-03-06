import { TweenMax } from "gsap";

const fadeIn = ( { duration, delay, target } ) => {
    return new Promise ( ( resolve ) => {
        const wrapper = document.querySelector ( '.presentation-wrapper' );
        if(wrapper){
            TweenMax.set ( target, { opacity : 0 } );
            TweenMax.to ( target, duration, {
                delay,
                opacity    : 1,
                onComplete : () => {
                    resolve ();
                }
            } )
        }
        
    } )
};

export { fadeIn };

