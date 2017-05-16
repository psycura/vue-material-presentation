<template>
    <md-list-item @click.native.stop="selectActiveElement" :id="id">
        <slot></slot>
    </md-list-item>
</template>

<script>
    import {componentMixin} from './componentMixin';
    
    export default{
        mixins:[componentMixin]
    }

</script>

<style lang="scss" scoped>

</style>