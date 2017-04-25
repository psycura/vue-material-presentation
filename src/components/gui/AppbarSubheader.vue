<template>
    <transition enter-active-class="animated slideInUp"
                leave-active-class="animated slideOutDown">
        <h2 class="md-subheading">
            <slot></slot>
        </h2>
    </transition>
</template>

<script>
    export default{}

</script>

<style lang="scss" scoped>
    .animated {
        animation-duration: .175s;
    }
    
    .md-subheading {
        margin-left:   55px;
        margin-bottom: 10px;
        color: white;
        text-decoration: none;
    }
</style>