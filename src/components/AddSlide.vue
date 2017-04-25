<template>
    <div>
        <md-speed-dial md-open="click" md-direction="top" class="md-primary">
            <md-button class="md-fab" md-fab-trigger>
                <md-tooltip md-direction="left">Add Slides</md-tooltip>
                <md-icon md-icon-morph>event</md-icon>
                <md-icon>add</md-icon>
            </md-button>
            
            <md-button @click.native="addEmptySlide('list')" class="md-fab md-primary md-mini md-clean">
                <md-tooltip md-direction="left">Add List</md-tooltip>
                <md-icon>list</md-icon>
            </md-button>
            
            <md-button @click.native="addEmptySlide('card')" class="md-fab md-primary md-mini md-clean">
                <md-tooltip md-direction="left">Add Card</md-tooltip>
                <md-icon>credit_card</md-icon>
            </md-button>
        </md-speed-dial>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    
    export default{
        methods : {
            ...mapActions ( [
                'addSlide'
            ] ),
            async addEmptySlide( layout ){
                await this.addSlide ( layout );
                await this.addSlide ( 'addSlide' );
            }
        }
    }

</script>

<style lang="scss" scoped>

</style>