<template>
    <div id="app">

        <Nav :logged-in="false"></Nav>
        <Header/>

        <ButtonGroup @createdNewHabit="createdNewHabit"/>
        <ContentTable ref="contentTable"/>
    </div>
</template>

<script>
    import Header from "@/components/Header";
    import axios from "axios";
    import ButtonGroup from "@/components/ButtonGroup";
    import ContentTable from "@/components/ContentTable";
    import Nav from "@/components/Nav";

    export default {
        name: 'app',
        components: {
            Nav,
            Header,
            ButtonGroup,
            ContentTable,
        },
        methods: {
            createdNewHabit(habit){
                console.log(habit);
                this.$refs.contentTable.append(habit);
            }
        },
        data() {
            return {
                fromBackend: 'null',
                numerOfUsers: 2
            }
        },
        mounted() {

           // console.log(this.$store.getters.userId)
            axios.post('http://localhost:8080/api/hello')
                .then(response => {
                    //  console.log(response);
                    this.fromBackend = response.data
                })

        },

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

    .col-md-12 {
        padding: 2%;
    }

    h3 {
        position: static;
        padding-left: 7%;
        margin-top: 3%;
    }
</style>
