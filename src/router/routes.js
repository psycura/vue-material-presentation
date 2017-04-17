
import Slides from '../components/containers/Slides.vue'
import PresentationDemos from '../components/containers/PresentationsDemos.vue'
import MyPresentations from '../components/containers/MyPresentations.vue'
import Auth from '../components/containers/Auth.vue'
import Editor from '../components/containers/Editor.vue'

export const routes = [
    { path : '/demos', component : PresentationDemos},
    { path : '/collection', component : MyPresentations},
    { path : '/login', component : Auth },
    { path : '/demos/:index', component : Slides },
    { path : '/collection/:index', component : Slides },
    { path : '/editor/:index', component : Editor },
];
