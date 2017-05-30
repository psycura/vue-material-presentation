<template>
    <div @click.self="selectActiveElement" :id="id">
        <slot></slot>
    </div>
</template>

<script>
    import {componentMixin} from './componentMixin';
    
    export default{
        mixins:[componentMixin]
    }

</script>

<style lang="scss" scoped>

</style>