import { TweenMax } from "gsap";

const fadeOut = ( { duration, delay, target } ) => {
    return new Promise ( ( resolve ) => {
        const wrapper = document.querySelector ( '.presentation-wrapper' );
        if ( wrapper ) {
            TweenMax.to ( target, duration, {
                delay,
                opacity    : 0,
                onComplete : () => resolve ()
            } )
        }
    } )
};

export { fadeOut };