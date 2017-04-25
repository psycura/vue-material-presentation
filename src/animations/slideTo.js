import { Elastic, Expo, Power3, TweenMax } from "gsap";

const slideTo = ( { duration, delay, target, direction, ease } ) => {
    
          return new Promise ( ( resolve ) => {
              const wrapper = document.querySelector ( '.presentation-wrapper' );
              if ( wrapper ) {
                  let easeType = '';
            
                  let targetSelector = target === '.presentation-wrapper' ? '.current' : `.current ${target}`;
                  let targetElement  = document.querySelector ( targetSelector );
            
                  let destination = {
                      top  : getComputedStyle ( targetElement ).top,
                      left : getComputedStyle ( targetElement ).left
                  };
            
                  switch ( ease ) {
                      case 'elastic':
                          easeType = Elastic.easeOut.config ( 1, 0.3 );
                          break;
                      case 'expo':
                          easeType = Expo.easeOut;
                          break;
                      default:
                          easeType = Power3.easeOut;
                          break;
                  }
            
                  switch ( direction ) {
                      case 'top':
                          destination.top = '-100vh';
                          break;
                      case 'bottom':
                          destination.top = '100vh';
                          break;
                      case 'left':
                          destination.left = '-110%';
                          break;
                      case 'right':
                          destination.left = '110%';
                          break;
                      default:
                          break;
                  }
            
                  TweenMax.to ( targetSelector, duration, {
                      ease       : easeType,
                      top        : destination.top,
                      left       : destination.left,
                      delay,
                      onComplete : () => {
                          resolve ();
                      }
                  } );
              }
          } )
      }
;

export { slideTo };