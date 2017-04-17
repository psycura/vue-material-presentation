<template>
    <md-list class="custom-list md-triple-line list">
        <md-list-item v-for="(item, index) in items"
                      class="list-item"
                      :key="index"
                      :id="item.id">
            <md-avatar :style="{backgroundColor:item.avatar}" class="avatar">
            </md-avatar>
            <div class="md-list-text-container">
                <span class="list-item-title"> {{item.textBlock.title}}</span>
                <span class="list-item-subtitle">{{item.textBlock.subtitle}}</span>
                <p class="list-item-content">{{item.textBlock.content}}</p>
            </div>
        </md-list-item>
    </md-list>
</template>

<script>
    
    export default{
        props    : [ 'slide' ],
        computed : {
            items(){
                return this.slide.components
            }
        },
//        data(){
//            return {
//                items : this.slide.components,
//            }
//        },
    }
</script>

<style lang="scss" scoped>
    .md-list {
        width:      25vw;
        box-shadow: rgba(0, 0, 0, 0.156863) 0 3px 10px, rgba(0, 0, 0, 0.227451) 0 3px 10px;
        padding:    0 0;
    }
    
    .md-avatar {
        border-radius: 50%;
    }
</style>