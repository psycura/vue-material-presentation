<template>
    <md-whiteframe md-tag="md-toolbar" class="md-warn" md-elevation="2">
        <h2 class="md-title">
            <slot></slot>
        </h2>
    </md-whiteframe>
</template>

<script>
    export default{
    
    }

</script>

<style lang="scss" scoped>
    .md-toolbar {
        height: 48px;
    }
</style>