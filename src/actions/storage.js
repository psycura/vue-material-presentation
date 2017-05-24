import { storage } from '../store/firebase-client';
import store from '../store/store';
import * as authActions from './auth';
import * as dbActions from './db';
import * as _ from 'lodash';

export async function uploadFile ( file ) {
    const user = authActions.getCurrentUser ();
    if ( user ) {
        let storageRef = storage.ref ( `users_bg/${user.uid}/${file.name}` );
        store.dispatch ( 'toggleUpload', true );
        let task = storageRef.put ( file );
        task.on ( 'state_changed',
            function progress ( snapshot ) {
                let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                store.dispatch ( 'updateImageUploadProgress', percentage )
            },
            function error ( err ) {
            },
            async function complete () {
                const imgData = {
                    url  : task.snapshot.metadata.downloadURLs[ 0 ],
                    name : task.snapshot.metadata.name
                };
                await dbActions.updateUserImgs ( imgData );
                store.dispatch ( 'toggleUpload', false );
                dbActions.getUserImgs ();
            }
        )
    }
}

export async function deleteImg ( img ) {
    const user = authActions.getCurrentUser ();
    if ( user ) {
        let imgRef = storage.ref ( `users_bg/${user.uid}/${img}` );
        imgRef.delete ()
    }
}

