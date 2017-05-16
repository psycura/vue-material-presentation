import { dbRef } from '../store/firebase-client';
import store from '../store/store';
import * as authActions from './auth';
import * as _ from 'lodash';

export async function updateUserStatus ( user ) {
    let status = {
        loggedIn : false,
        isAdmin  : false,
        name     : ''
    };
    if ( user ) {
        const userId  = user.uid;
        const userRef = dbRef.ref ( '/users/' + userId );
        await userRef.on ( 'value', snapshot => {
            status.loggedIn = true;
            status.isAdmin  = snapshot.val ().isAdmin;
            status.name     = snapshot.val ().name;
            store.dispatch ( 'setUserStatus', status )
            
        } );
    } else {
        store.dispatch ( 'setUserStatus', status )
    }
    
}

export async function addToMyCollection ( presentation ) {
    const user = authActions.getCurrentUser ();
    if ( user ) {
        let index = Date.now ();
        await dbRef.ref ( `users/${user.uid}/userPresentations/${index}` ).set ( presentation );
    }
}

export async function getDemos () {
    const demosRef = dbRef.ref ( '/presentationDemos' );
    await demosRef.on ( 'value', snapshot => {
        store.dispatch ( 'setPresentationsDemos', snapshot.val () )
    } );
}

export async function getUserPresentations () {
    let res;
    const user = authActions.getCurrentUser ();
    if ( user ) {
        const ref = dbRef.ref ( `/users/${user.uid}/userPresentations` );
        await ref.on ( 'value', snapshot => {
            res = snapshot.exportVal ();
            store.dispatch ( 'setUserPresentations', res )
        } );
    }
    
}

export async function removeFromCollection ( key ) {
    const user = authActions.getCurrentUser ();
    if ( user ) {
        await dbRef.ref ( `users/${user.uid}/userPresentations/${key}` ).remove ();
    }
}

export function updateUserPresentation ( presentation ) {
    console.log(presentation);
    // const newPres=_.cloneDeep(presentation);
    // console.log('new ', newPres);
    const id   = presentation.id;
    const user = authActions.getCurrentUser ();
    if ( user ) {
        dbRef.ref ( `/users/${user.uid}/userPresentations/${id}` ).set ( presentation );
    }
}

export function updateUserPresentations ( userPresentations ) {
    const user = authActions.getCurrentUser ();
    if ( user ) {
        let presentations = {};
        _.forIn ( userPresentations, ( value, key ) => {
            Object.assign ( presentations, { [value.id] : value } )
        } );
        dbRef.ref ( `/users/${user.uid}/userPresentations` ).set ( presentations );
    }
}

export function updateDemoPresentation ( id, presentation ) {
    dbRef.ref ( `/presentationDemos/${id}` ).set ( presentation );
}

export function getSlideLayout ( layout ) {
    const demosRef = dbRef.ref ( `/slideTemplates/${layout}` );
    
    return new Promise ( resolve => {
        demosRef.on ( 'value', snapshot => {
            let res = snapshot.exportVal ();
            resolve ( res )
        } );
    } )
    
}