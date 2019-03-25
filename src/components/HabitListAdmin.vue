<template>
    <div>

        <h3 class="float-left">HABITS LIST</h3>

        <b-table striped hover :items="items" :fields="fields" class="table">
            <template slot="Action" slot-scope="row">
                <b-button v-on:click="deleteRow(row.index)" size="sm" class="mr-2">
                    Delete
                </b-button>
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
        components: {
            Header,
            ButtonGroup,
        },
        data() {
            return {
                fields: ['UserId', 'HabitId', 'Name', 'Category', 'Done', 'Action'],
                items: [],
                habitsPerUserId: [],
                habitsDetails: [],
                selected: [],
                fromBackend: 'null'
            }
        },
        mounted() {
            this.getHabitDetails()

        },
        methods: {

            async getHabitDetails() {
                await axios.get(`http://localhost:8080/habitsperuser/habitslist`)
                    .then(async response => {

                        for (const id in response.data) {
                            const habit = response.data[id];

                            const category = await axios.get(`http://localhost:8080/category/details/${habit.categoryId}`)

                            this.items.push({
                                UserId: habit.userId,
                                HabitId: habit._id,
                                Name: habit.name,
                                Category: category.data.name,
                                Done: habit.done.join(", ")

                            })
                        }

                    });

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
