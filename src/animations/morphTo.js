import { TweenMax, TimelineMax } from "gsap";
let tl = new TimelineMax ();

const morphTo = ( { duration, delay, target } ) => {
    return new Promise ( ( resolve ) => {
        const { srcElement, targetElement } = target;
        
        const prevEl         = document.querySelector ( srcElement ),
              nextEl         = document.querySelector ( targetElement ),
              slideWrapper   = document.querySelector ( '.slide-wrapper' ),
              contentWrapper = slideWrapper.firstElementChild;
        
        const rectCurrent = prevEl.getBoundingClientRect (),
              rectNext    = nextEl.getBoundingClientRect ();
        
        const cloneOfCurrent = prevEl.cloneNode ( false ),
              cloneOfTarget  = nextEl.cloneNode ( false );
        
        const wrapper        = document.querySelector ( '.wrapper' );
        
        const styleCurrent = {
            position  : 'fixed',
            left      : rectCurrent.left,
            top       : rectCurrent.top,
            height    : rectCurrent.height,
            width     : rectCurrent.width,
            listStyle : 'none',
            opacity   : 1,
            zIndex    : 1000,
            
        };
        
        const styleNext = {
            position  : 'fixed',
            left      : rectNext.left,
            top       : rectNext.top,
            height    : rectNext.height,
            width     : rectNext.width,
            listStyle : 'none',
            opacity   : 0,
        };

        
        wrapper.appendChild ( cloneOfTarget );
        
        wrapper.appendChild ( cloneOfCurrent );
        
        TweenMax.set ( cloneOfCurrent, styleCurrent );
        TweenMax.set ( cloneOfTarget, styleNext );
        
        const targetObjRect = cloneOfTarget.getBoundingClientRect ();
        const targetWidth   = targetObjRect.width,
              targetHeight  = targetObjRect.height,
              targetLeft    = targetObjRect.left,
              targetTop     = targetObjRect.top;
        
        const targetStyles = getComputedStyle ( cloneOfTarget );
        
        TweenMax.to ( contentWrapper, .1, {
            opacity : 0
        } );
        
        TweenMax.to ( cloneOfCurrent, duration, {
            delay,
            opacity      : 1,
            left         : targetLeft,
            top          : targetTop,
            height       : targetHeight,
            width        : targetWidth,
            border       : targetStyles.border,
            borderRadius : targetStyles.borderRadius,
            boxShadow    : targetStyles.boxShadow,
            onComplete   : () => {
                resolve ();
                cloneOfCurrent.remove ();
                cloneOfTarget.remove ();
            }
        } );

    } )
};

export { morphTo }