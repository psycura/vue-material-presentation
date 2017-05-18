import { mapActions, mapGetters } from 'vuex';


const componentMixin = {
    props:['id','component'],
    methods : {
        ...mapActions ( [
            'selectElement',
        ] ),
        
        selectActiveElement(  ){
            this.selectElement ( this.id )
        },
    },
};

export {componentMixin}