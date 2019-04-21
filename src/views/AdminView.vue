<template>
    <div id="app">

        <Nav :logged-in="false"></Nav>
        <Header/>

        <!--<ButtonGroup/>-->

        <UserList/>
        <!--<HabitListAdmin/>-->
    </div>
</template>

<script>
    import Header from "@/components/Header";
    import axios from "axios";
    import ButtonGroup from "@/components/ButtonGroup";
    import Nav from "@/components/Nav";
    import UserList from "@/components/UserList";
    import HabitListAdmin from "@/components/HabitListAdmin";

    export default {
        name: 'adminView',
        components: {
            Nav,
            Header,
            ButtonGroup,
            HabitListAdmin,
            UserList,
        },
        data() {
            return {
                items: [
                    {Name: true, Category: 40, Done: 'Dickerson', Date: 'Macdonald', Action: 'no'},
                    {Name: true, Category: 40, Done: 'Dickerson', Date: 'Macdonald', Action: 'no'},
                    {Name: true, Category: 40, Done: 'Dickerson', Date: 'Macdonald', Action: 'no'},
                    {Name: true, Category: 40, Done: 'Dickerson', Date: 'Macdonald', Action: 'no'},

                ],
                fromBackend: 'null',
                numerOfUsers: 2
            }
        },
        mounted() {

            axios.post('http://localhost:8080/api/hello')
                .then(response => {
                    //  console.log(response);
                    this.fromBackend = response.data
                })

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
