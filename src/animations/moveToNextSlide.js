import { TweenMax } from "gsap";

const moveToNextSlide = ( { duration, delay, target } ) => {
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
        
        const wrapper = document.querySelector ( '.wrapper' );
        
        wrapper.appendChild ( cloneOfCurrent );
        wrapper.appendChild ( cloneOfTarget );
        
        const styleCurrent = {
            position  : 'fixed',
            left      : rectCurrent.left,
            top       : rectCurrent.top,
            height    : rectCurrent.height,
            width     : rectCurrent.width,
            listStyle : 'none',
            opacity   : 1
        };
        
        const styleNext = {
            position  : 'fixed',
            left      : rectNext.left,
            top       : rectNext.top,
            height    : rectNext.height,
            width     : rectNext.width,
            listStyle : 'none',
            opacity   : 0
        };
        
        TweenMax.set ( cloneOfCurrent, styleCurrent );
        TweenMax.set ( cloneOfTarget, styleNext );
        
        const targetObjRect  = cloneOfTarget.getBoundingClientRect ();
        const currentObjRect = cloneOfCurrent.getBoundingClientRect ();
        const targetWidth    = targetObjRect.width,
              targetHeight   = targetObjRect.height,
              targetLeft     = targetObjRect.left,
              targetTop      = targetObjRect.top,
              currentLeft    = currentObjRect.left,
              currentTop     = currentObjRect.top;
        
        TweenMax.to ( contentWrapper, .1, {
            opacity : 0
        } );
        
        const delta = targetLeft - currentLeft;
        
        TweenMax.to ( cloneOfCurrent, duration, {
            delay,
            bezier     : {
                type   : 'soft',
                values : [
                    {
                        left    : currentLeft + delta * .2,
                        top     : getCoords ( currentLeft + delta * .8 ),
                        width   : targetWidth * .3,
                        height  : targetHeight * .4,
                        opacity : 1
                    },
                    {
                        left    : currentLeft + delta * .5,
                        top     : getCoords ( currentLeft + delta * .9 ),
                        width   : targetWidth * .8,
                        height  : targetHeight * .8,
                        opacity : 1
                    },
                    {
                        left    : currentLeft + delta * .8,
                        top     : getCoords ( currentLeft + delta * .9 ),
                        width   : targetWidth * .8,
                        height  : targetHeight * .8,
                        opacity : 1
                    },
                    {
                        left    : currentLeft + delta,
                        top     : getCoords ( currentLeft + delta ),
                        width   : targetWidth,
                        height  : targetHeight,
                        opacity : 1
                    } ],
            },
            onComplete : () => {
                cloneOfCurrent.remove ();
                cloneOfTarget.remove ();
                resolve ();
            }
        } );
        
        function getCoords ( x ) {
            // (y1-y2)*x+(x2-x1)*y+(x1*y2-x2*y1)=0
            
            const x1 = currentLeft,
                  x2 = targetLeft,
                  y1 = currentTop,
                  y2 = targetTop;
            
            return (-(x1 * y2 - x2 * y1) - ((y1 - y2) * x)) / (x2 - x1)
            
        }
    } )
};

export { moveToNextSlide }