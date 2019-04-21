<template>
    <div id="app">

        <router-view></router-view>

    </div>
</template>
<script>
    import Nav from "@/components/Nav";


    export default {
        name: 'app',
        components: {
            Nav,
        },
    }
</script>

<style>
    #app {
        margin-top: 0 !important;
        font-family: Monserrat, serif;
    }

</style>
