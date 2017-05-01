import store from '../store/store';

import Slides from '../components/containers/Slides.vue'
import MyPresentations from '../components/containers/MyPresentations.vue'
import LoginPage from '../components/pages/LoginPage.vue'
import EditorPage from '../components/pages/EditorPage.vue'
import HomePage from '../components/pages/HomePage.vue'
import GalleryPage from '../components/pages/GalleryPage.vue'
import UserDashboard from '../components/pages/UserDashboard.vue'

export const routes = [
    { path : '/', name : 'home', component : HomePage },
    { path : '/gallery', name : 'gallery', component : GalleryPage },
    { path : '/login', name : 'login', component : LoginPage },
    { path : '/gallery/:index', name : 'demoSlideshow', component : Slides },
    
    {
        path        : '/dashboard',
        name        : 'dashboard',
        redirect    : { name : 'collection' },
        component   : UserDashboard,
        beforeEnter : ( to, from, next ) => {
            if ( store.getters.isLoggedIn ) {
                next ();
            } else {
                next ( { path : '/login' } )
                
            }
        },
        children    : [
            { path : 'collection', name : 'collection', component : MyPresentations },
            { path : 'preview/:index', name : 'userSlideshow', component : Slides },
            { path : 'editor/:index', name : 'editor', component : EditorPage },
        ]
    },
];
