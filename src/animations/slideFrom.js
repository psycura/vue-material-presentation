import { Elastic, Expo, Power3, TimelineMax, TweenMax } from "gsap";
let tl = new TimelineMax ();

const slideFrom = ( { duration, delay, target, direction, ease } ) => {
    return new Promise ( ( resolve ) => {
            let easeType         = '';
            let startPosition    = {
                top  : 0,
                left : 0,
            };
            
            const targetSelector = target === '.wrapper' ? '.current' : `.current ${target}`;
            const targetElement = document.querySelector ( targetSelector );
            const cloneOfTarget = targetElement.cloneNode ( false ),
                  parent        = targetElement.parentElement;
            
            parent.appendChild ( cloneOfTarget );
            
            const styles = {
                top  : getComputedStyle ( cloneOfTarget ).top,
                left : getComputedStyle ( cloneOfTarget ).left,
            };
            
            switch ( direction ) {
                case 'top':
                    startPosition.top  = '-110vh';
                    startPosition.left = styles.left;
                    break;
                case 'bottom':
                    startPosition.top  = '110vh';
                    startPosition.left = styles.left;
                    break;
                case 'left':
                    startPosition.left = '-110%';
                    startPosition.top  = styles.top;
                    break;
                case 'right':
                    startPosition.left = '110%';
                    startPosition.top  = styles.top;
                    break;
                default:
                    break;
            }
            
            TweenMax.set ( targetSelector, startPosition );
            TweenMax.set ( cloneOfTarget, { opacity : 0 } );
            
            switch ( ease ) {
                case 'elastic':
                    easeType = Elastic.easeOut.config ( 1, 0.3 );
                    break;
                default:
                    easeType = Power3.easeOut;
                    break;
            }
            
            tl.to ( targetElement, duration, {
                top        : styles.top,
                left       : styles.left,
                ease       : easeType,
                delay,
                onComplete : () => {
                    cloneOfTarget.remove ();
                    resolve ();
                }
            } )
            
        }
    );
};

export { slideFrom };