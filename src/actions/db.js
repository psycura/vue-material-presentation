import { dbRef, storage } from '../store/firebase-client';
import store from '../store/store';
import * as authActions from './auth';
import * as _ from 'lodash';
import shortid from 'shortid'

export async function updateUserStatus ( user ) {
    let status = {
        loggedIn : false,
        isAdmin  : false,
        name     : '',
        id       : null
    };
    if ( user ) {
        getUserPresentations ();
        getUserImgs ();
        const userId  = user.uid;
        const userRef = dbRef.ref ( '/users/' + userId );
        await userRef.on ( 'value', snapshot => {
            status.loggedIn = true;
            status.isAdmin  = snapshot.val ().isAdmin;
            status.name     = snapshot.val ().name;
            status.id       = userId;
            store.dispatch ( 'setUserStatus', status )
            
        } );
    } else {
        store.dispatch ( 'setUserStatus', status )
    }
    
}

export async function addToMyCollection ( presentation ) {
    const user = authActions.getCurrentUser ();
    if ( user ) {
        let index = shortid.generate ();
        await dbRef.ref ( `users/${user.uid}/userPresentations/${index}` ).set ( presentation );
        getUserPresentations ()
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
        getUserPresentations ()
        
    }
}

export async function updateUserPresentation ( presentation ) {
    const id   = presentation.id;
    const user = authActions.getCurrentUser ();
    if ( user ) {
        await dbRef.ref ( `/users/${user.uid}/userPresentations/${id}` ).set ( presentation );
        getUserPresentations ()
        
    }
}

export async function updateUserPresentations ( userPresentations ) {
    const user = authActions.getCurrentUser ();
    if ( user ) {
        let presentations = {};
        _.forIn ( userPresentations, ( value ) => {
            presentations = {
                ...presentations,
                [value.id] : value
            }
        } );
        await dbRef.ref ( `/users/${user.uid}/userPresentations` ).set ( presentations );
        getUserPresentations ()
        
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

export async function updateUserImgs ( imgData ) {
    const user = authActions.getCurrentUser ();
    let res    = null;
    let imgs   = null;
    if ( user ) {
        const userImgs = dbRef.ref ( `/users/${user.uid}/userImgs` );
        await userImgs.on ( 'value', snapshot => {
            res = snapshot.exportVal ();
            if ( res ) {
                imgs = _.flatMap ( res )
            } else {
                imgs = []
            }
        } );
        imgs.push ( imgData );
        await userImgs.set ( imgs );
        getUserImgs()
    }
}

export async function getUserImgs () {
    const user = authActions.getCurrentUser ();
    let res    = null;
    let imgs   = null;
    if ( user ) {
        const userImgs = dbRef.ref ( `/users/${user.uid}/userImgs` );
        await userImgs.on ( 'value', snapshot => {
            res = snapshot.exportVal ();
            if ( res ) {
                imgs = _.flatMap ( res )
            } else {
                imgs = []
            }
            store.dispatch ( 'setUserImgs', imgs )
        } );
    }
}

export async function deleteUserImg ( index ) {
    const user = authActions.getCurrentUser ();
    let res    = null;
    let imgs   = null;
    if ( user ) {
        const userImgs = dbRef.ref ( `/users/${user.uid}/userImgs` );
        await userImgs.on ( 'value', snapshot => {
            res  = snapshot.exportVal ();
            imgs = _.flatMap ( res )
        } );
        imgs.splice ( index, 1 );
        await userImgs.set ( imgs );
        getUserImgs()
    }
}

export async function deleteAllUserImg () {
    const user = authActions.getCurrentUser ();
    let imgs   = null;
    if ( user ) {
        const userImgs = dbRef.ref ( `/users/${user.uid}/userImgs` );
        await userImgs.set ( imgs );
        getUserImgs()
    
    }
}