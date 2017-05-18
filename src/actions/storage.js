import { storage } from '../store/firebase-client';
import store from '../store/store';
import * as authActions from './auth';
import * as _ from 'lodash';

export async function uploadFile ( file ) {
    const user = authActions.getCurrentUser ();
    if(user){
        let storageRef = storage.ref ( `users_bg/${user.uid}/${file.name}` );
        let task       = storageRef.put ( file ); // for the progress bar
        task.on ( 'state_changed',
            function progress ( snapshot ) {
                let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(percentage);
                //progressBar.value = percentage
            
            },
            function error ( err ) {
            
            },
        
            function complete () {
            
            }
        )
    }
    
}