import { auth, dbRef } from '../store/firebase-client';
import * as dbActions from './db';
import store from '../store/store';

export function signInWithPassword ( email, password ) {
    return new Promise ( ( resolve, reject ) => {
        auth.signInWithEmailAndPassword ( email, password )
        .then ( () => {
            store.dispatch ( 'setMessage', 'Login succeed' )
            .then ( () => {
                resolve ();
            } )
        } )
        .catch ( ( error ) => {
            const { message } = error;
            store.dispatch ( 'setMessage', message );
            reject ( error );
        } )
    } )
}
export function signUpWithPassword ( email, password, name ) {
    return new Promise ( ( resolve, reject ) => {
        auth.createUserWithEmailAndPassword ( email, password )
        .then ( () => {
            const user = auth.currentUser;
            user.updateProfile ( {
                displayName : name
            } )
            .then ( () => {
                writeUserData ( user );
                store.dispatch ( 'setMessage', 'User successfully created' )
                .then ( () => {
                    resolve ();
                } )
            } )
        } )
        .catch ( ( error ) => {
            const { message } = error;
            store.dispatch ( 'setMessage', message );
            reject ( error );
        } )
    } )
}
export function signOut () {
    return new Promise ( ( resolve ) => {
        auth.signOut ()
        .then ( () => {
            resolve ();
        } )
    } )
}
export function getCurrentUser () {
    const user = auth.currentUser;
    return user
}
auth.onAuthStateChanged ( ( user ) => {
    console.log ( 'onAuthStateChanged' );
    if ( user ) {
        dbActions.updateUserStatus ( user )
    } else {
        dbActions.updateUserStatus ()
        
    }
} );
function writeUserData ( user ) {
    dbRef.ref ( 'users/' + user.uid ).set ( {
        name    : user.displayName,
        email   : user.email,
        isAdmin : false
    } );
}



