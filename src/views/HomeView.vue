<template>
    <div id="app">
        <Nav :logged-in="true"></Nav>
        <Header/>

    </div>
</template>

<script>
    import Header from "@/components/Header";
    import Nav from "@/components/Nav";

    export default {
        name: 'app',
        components: {
            Nav,
            Header,
        },
        data() {
            return {}
        },
        mounted() {

        },
        methods: {}

    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    .new-habit {
        margin-right: 15px;
    }

    .table {
        max-width: 96%;
        margin: 2% 2% 2% 2%;
    }

    h3 {
        position: static;
        padding-left: 7%;
        margin-top: 3%;
    }
</style>
