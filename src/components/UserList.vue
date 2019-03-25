<template>
    <div>

        <h3 class="float-left">USER LIST</h3>

        <b-table striped hover :items="items" :fields="fields" class="table">
            <template slot="Action" slot-scope="row">
                <b-button v-on:click="deleteRow(row.index)" size="sm" class="mr-2">
                    Delete
                </b-button>
            </template>

            <template slot="Done" slot-scope="row">
                <b-form-checkbox-group v-model="selected" :options="options"/>
            </template>
        </b-table>

    </div>
</template>

<script>
    import Header from "@/components/Header";
    import axios from "axios";
    import ButtonGroup from "@/components/ButtonGroup";
    import {store} from "@/main";

    export default {
        name: 'app',
        components: {},
        data() {
            return {
                fields: ['Id', 'Username', 'FirstName', 'LastName', 'HabitsPerUser'],
                items: [],
                habitsPerUserId: [],
                habitsDetails: [],
                selected: [],
                fromBackend: 'null'
            }
        },
        mounted() {
            console.log('userList')
            this.getUserList()

        },
        methods: {
            getUserList() {

                axios.get(`http://localhost:8080/user/userList`)
                    .then(async response => {

                            for (const id in response.data) {
                                const user = response.data[id];
                                const habitNames = [];

                                for (const habit in user.habitsPerUserId) {

                                    const habitDetails = await axios.get(`http://localhost:8080/habitsperuser/details/${user.habitsPerUserId[habit]}`)
                                    habitNames.push(habitDetails.data.name)
                                }

                                this.items.push({
                                    Id: user._id,
                                    Username: user.username,
                                    FirstName: user.name,
                                    LastName: user.surname,
                                    HabitsPerUser: habitNames.join(", ")

                                })
                            }
                        }
                    )


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
