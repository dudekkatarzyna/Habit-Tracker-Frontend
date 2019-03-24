<template>
    <div>

        <h3 class="float-left">HABITS LIST</h3>

        <b-table striped hover :items="items" class="table"/>


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
                items: [],
                habitsPerUserId: [],
                habitsDetails: [],
                fromBackend: 'null'
            }
        },
        mounted() {
            this.getHabitDetails().then(() => {
                    console.log(this.items)
                }
            );

        },
        methods: {
            createItems() {


            },
            async getHabitDetails() {
                await axios.get(`http://localhost:8080/user/${store.state.userId}`)
                    .then(response => {
                        this.habitsPerUserId = response.data.habitsPerUserId;
                    });

                for (let i = 0; i < this.habitsPerUserId.length; i++) {
                    await axios.get(`http://localhost:8080/habitsPerUser/details/${this.habitsPerUserId[i]}`)
                        .then(response => {
                            console.log(response.data)
                            this.items.push({
                                    Name: response.data.name,
                                    Category: response.data.categoryId,
                                    Date: response.data.done
                                }
                            );
                            //console.log(this.habitsDetails)
                        })
                }
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
