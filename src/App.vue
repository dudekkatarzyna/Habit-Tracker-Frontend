<template>
    <div id="app">
<!--        <p>
            <router-link to="/foo">Go to Foo</router-link>
            <router-link to="/bar">Go to Bar</router-link>
        </p>-->

        <router-view></router-view>

    </div>
</template>
<script>
    import Nav from "@/components/Nav";

    export default {
        name: 'app',
        components: {
            Nav,
        }
    }
</script>

<style>
    #app {
        margin-top: 0 !important;
        font-family: Monserrat,serif;
    }
    .nav-item {
        list-style: none;
    }

</style>
