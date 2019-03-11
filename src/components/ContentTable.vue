<template>
    <div >

        <h3 class="float-left">HABITS LIST</h3>
        <b-table striped hover :items="items" class="table"/>

        <h1>{{fromBackend}}</h1>

        <ul>
            <li v-for="user of numerOfUsers">
                Cokolwiek
                user
            </li>
        </ul>
        <button @click="getNumerOfUsers">
            Nic
        </button>
    </div>
</template>

<script>
    import Header from "@/components/Header";
    import axios from "axios";
    import ButtonGroup from "@/components/ButtonGroup";

    export default {
        name: 'app',
        components: {
            Header,
            ButtonGroup,
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
        methods: {
            getNumerOfUsers() {
                axios.post('http://localhost:8080/api/user-count')
                    .then(response => {
                        //  console.log(response);
                        this.numerOfUsers = response.data
                    })
            }
        }

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
