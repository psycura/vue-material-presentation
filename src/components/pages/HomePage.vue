<template>
    <div class="container">
        <md-whiteframe>
            <md-layout md-column md-align="center" class="top-block">
                <md-layout md-row md-align="center">
                    <h2 class="md-display-1">Welcome to Material Design Presentation System</h2>
                </md-layout>
                <md-layout md-row md-align="center">
                    <md-button @click.native="navigateTo({name:'dashboard'})" class="md-fab badge-btn">
                        <md-icon class="md-size-2x">airplay</md-icon>
                    </md-button>
                </md-layout>
                <md-layout md-row md-align="center">
                    <div class="md-display-1">Start Here</div>
                </md-layout>
            </md-layout>
        </md-whiteframe>
        <md-layout class="gallery-block" md-gutter md-column md-align="center">
            <md-layout md-row md-align="center">
                <h2 class="md-display-1">Our Demos</h2>
            </md-layout>
            <md-layout md-row md-align="center">
                <presentation-demos limit="6"></presentation-demos>
            </md-layout>
            <md-layout class="gallery-btn" md-row md-align="center">
                <span>Click here </span>
                <md-button @click.native="navigateTo({name:'gallery'})" class="md-icon-button md-primary md-raised">
                    <md-icon>queue_play_next</md-icon>
                </md-button>
                <span> for more demos</span>
            </md-layout>
        </md-layout>
    </div>
</template>

<script>
    import PresentationDemos from '../containers/PresentationsDemos.vue'
    export default{
        components : {
            PresentationDemos
        },
        methods    : {
            navigateTo( url ){
                this.$router.push ( url )
            },
            
        }
    }

</script>

<style lang="scss" scoped>
    .container {
        flex:     1;
        overflow: auto;
    }
    
    .top-block {
        padding-bottom:  48px;
        padding-top:     48px;
        position:        relative;
        justify-content: center;
    }
    
    .badge-btn {
        width:         85px;
        height:        85px;
        margin-bottom: 16px;
    }
    
    .gallery-block {
        padding:          48px 0;
        background-color: #cfd8dc;
        position:         relative;
        
    }
    
    .gallery-btn {
        align-items:     center;
        justify-content: center;
        font-size:       22px;
    }

</style>