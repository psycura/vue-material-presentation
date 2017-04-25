<template>
    <md-card class="card" id="card">
        <md-card-header :style="headerBg" id="cardHeader">
            <div class="md-title" id="title">{{card.cardHeader.title}}</div>
            <div class="md-subhead" id="subtitle">{{card.cardHeader.subtitle}}</div>
            <div class="button" :style="buttonBg" id="button"></div>
        </md-card-header>
        <md-card-content id="cardContent" class="card-content">
            {{card.cardContent}}
        </md-card-content>
    </md-card>
</template>

<script>
    
    export default{
        props    : [ 'slide' ],
        data(){
            return {
                card : this.slide.components,
            }
        },
        computed : {
            headerBg(){
                let bg = '';
                if ( !!this.card.cardHeader.media ) {
                    const imgSrc = require ( `../../assets/${this.card.cardHeader.media}` );
                    bg           = `url(${imgSrc})`;
                } else {
                    bg = this.card.cardHeader.bgColor;
                }
                return { background : bg, backgroundSize : 'cover' }
                
            },
            
            buttonBg(){
                return { background : this.card.cardHeader.button }
            },
            
        },
    }

</script>

<style lang="scss" scoped>
    .md-card {
        width:    100%;
        height:   100%;
        overflow: inherit;
    }
    
    .md-card-header {
        min-height:          30vh;
        background-position: bottom left;
        background-size:     cover;
        position:            relative;
    }
    
    .button {
        width:         100px;
        height:        100px;
        border:        10px;
        z-index:       1;
        box-shadow:    rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px;
        position:      absolute;
        left:          90%;
        top:           24.5vh;
        border-radius: 50%;
    }
    
    .md-card-content {
        min-height: 50vh;
        margin-top: 8vh;
    }
</style>