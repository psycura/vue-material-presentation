import store from '../store/store';

import Slides from '../components/containers/Slides.vue'
import UserPresentations from '../components/UserDashboard/UserPresentations.vue'
import LoginPage from '../components/pages/LoginPage.vue'
import EditorPage from '../components/Editor/EditorPage.vue'
import HomePage from '../components/pages/HomePage.vue'
import GalleryPage from '../components/pages/GalleryPage.vue'
import UserDashboard from '../components/UserDashboard/UserDashboardPage.vue'
import UserCollectionSidebar from '../components/UserDashboard/UserCollectionSidebar.vue'
import SlideListSidebar from '../components/Editor/SlideListSidebar.vue'
import Editor from '../components/Editor/Editor.vue'

export const routes = [
    { path : '/', name : 'home', component : HomePage },
    { path : '/gallery', name : 'gallery', component : GalleryPage },
    { path : '/login', name : 'login', component : LoginPage },
    { path : '/gallery/:index', name : 'demoSlideshow', component : Slides },
    
    {
        path        : '/dashboard',
        name        : 'dashboard',
        redirect    : { name : 'collection' },
        components  : {
            default : UserDashboard,
            sidebar : UserCollectionSidebar
        },
        beforeEnter : ( to, from, next ) => {
            if ( store.getters.isLoggedIn ) {
                next ();
            } else {
                next ( { path : '/login' } )
                
            }
        },
        children    : [
            {
                path       : 'collection', name : 'collection',
                components : {
                    default : UserPresentations,
                    sidebar : UserCollectionSidebar
                }
            },
            {
                path      : 'preview/:index', name : 'userSlideshow',
                component : Slides
            },
            {
                path       : 'editor/:index', name : 'editor',
                components : {
                    default : EditorPage,
                    sidebar : SlideListSidebar
                }
            },
            {
                path       : 'editor/:presentation/:slideIndex', name : 'editSlides',
                components : {
                    default : Editor,
                    sidebar : SlideListSidebar
                }
            },
        ]
    },
];
