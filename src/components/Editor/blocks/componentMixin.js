import { mapActions, mapGetters } from 'vuex';


const componentMixin = {
    props:['id','component'],
    methods : {
        ...mapActions ( [
            'selectElement',
        ] ),
        
        selectActiveElement(  ){
            console.log(this.id);
            this.selectElement ( this.id )
        },
    },
};

export {componentMixin}