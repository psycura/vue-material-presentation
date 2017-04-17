import { TweenMax } from "gsap";

const fadeOut = ( { duration, delay, target }  ) => {
    return new Promise ( ( resolve ) => {
        TweenMax.to ( target, duration, {
            delay,
            opacity    : 0,
            onComplete : () => resolve ()
        } )
    } )
};

export { fadeOut };