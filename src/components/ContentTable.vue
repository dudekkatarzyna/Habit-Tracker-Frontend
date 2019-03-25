<template>
    <div>

        <h3 class="float-left">HABITS LIST</h3>

        <b-table striped hover :items="items" :fields="fields" class="table">
            <template slot="Action" slot-scope="row">
                <b-button v-on:click="deleteRow(row.index)" size="sm" class="mr-2">
                    Delete
                </b-button>
            </template>

            <template slot="Done" slot-scope="row">
                <b-form-checkbox-group id="checkboxes2" name="flavour2" v-model="selected">
                <input ref="checkbox" class="form-check-input mark-done" type="checkbox" data-timestamp="getDate(date, 3).getTime()}" data-habit="${data[prop]._id}" id="inlineCheckbox1-${data[prop]._id}" value="option1" >
                <label class="form-check-label" for="inlineCheckbox1-${data[prop]._id}"> {{days[getDate(new Date(), 3).getDay()]}}</label>
                <input class="form-check-input mark-done" type="checkbox" data-timestamp="${getDate(date, 2).getTime()}" data-habit="${data[prop]._id}" id="inlineCheckbox2-${data[prop]._id}" value="option2" >
                <label class="form-check-label" for="inlineCheckbox2-${data[prop]._id}">{{days[getDate(new Date(), 2).getDay()]}}</label>
                <input class="form-check-input mark-done" type="checkbox" data-timestamp="${getDate(date, 1).getTime()}" data-habit="${data[prop]._id}" id="inlineCheckbox3-${data[prop]._id}" value="option3" >
                <label class="form-check-label" for="inlineCheckbox3-${data[prop]._id}">{{days[getDate(new Date(), 1).getDay()]}}</label>
                <input class="form-check-input mark-done latest" type="checkbox" data-timestamp="${new Date().getTime()}" data-habit="${data[prop]._id}" id="inlineCheckbox4-${data[prop]._id}" value="option4" >
                <label class="form-check-label" for="inlineCheckbox4-${data[prop]._id}">{{days[new Date().getDay()]}}</label>
                </b-form-checkbox-group>
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
                fields: ['Name', 'Category', 'Done', 'Date', 'Action'],
                items: [],
                habitsPerUserId: [],
                habitsDetails: [],
                selected: [],
                options: [
                    {text: 'Monday', value: 'orange'},
                    {text: 'Tuesday', value: 'apple'},
                    {text: 'Wednesday', value: 'pineapple'},
                    {text: 'Thursday', value: 'grape'},
                    {text: 'Friday', value: 'grape'},
                    {text: 'Saturday', value: 'grape'},
                    {text: 'Sunday', value: 'grape'}
                ],
                fromBackend: 'null',
                days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

        }
        },
        mounted() {
            this.getHabitDetails().then(() => {
                  //  this.$refs.checkbox
                }
            );

        },
        methods: {
            checked(){
                console.log(this.selected)
            },
            getDate(date, daysBefore) {
                return new Date(new Date(date).getTime() - daysBefore * 1000 * 60 * 60 * 24);
            },
            async append(habit) {

                await axios.get(`http://localhost:8080/category/details/${habit.categoryId}`)
                    .then(response => {
                        this.items.push({
                            Name: habit.name,
                            Category: response.data.name,
                            Date: habit.done

                        })
                    });


            },
            deleteRow(index) {
                // console.log(`http://localhost:8080/habitsPerUser/${this.habitsPerUserId[index]}/delete`)
                axios.delete(`http://localhost:8080/habitsPerUser/${this.habitsPerUserId[index]}/delete`)

                axios.post(`http://localhost:8080/user/deleteHabit/${this.habitsPerUserId[index]}`, {
                    userId: store.state.userId,
                    habitId: this.habitsPerUserId[index]
                })
                    .then((response) => {
                        this.items.splice(index, 1)
                    })
                    .catch(function (error) {
                        console.log(error);

                    });

            },
            async getHabitDetails() {
                await axios.get(`http://localhost:8080/user/${store.state.userId}`)
                    .then(response => {
                        this.habitsPerUserId = response.data.habitsPerUserId;
                    });

                for (let i = 0; i < this.habitsPerUserId.length; i++) {
                    await axios.get(`http://localhost:8080/habitsPerUser/details/${this.habitsPerUserId[i]}`)
                        .then(response => {

                            let format = this.formatDates(response.data.done);


                            this.items.push({
                                    Name: response.data.name,
                                    Category: response.data.categoryId,
                                    Date: format.join(`,\n`)
                                }
                            );
                        });

                    await axios.get(`http://localhost:8080/category/details/${this.items[i].Category}`)
                        .then(response => {
                            this.items[i].Category = response.data.name;
                        })
                }
            },
            formatDate(date) {
                const monthNames = [
                    "January", "February", "March",
                    "April", "May", "June", "July",
                    "August", "September", "October",
                    "November", "December"
                ];

                const day = date.getDate();
                const monthIndex = date.getMonth();
                const year = date.getFullYear();

                return day + ' ' + monthNames[monthIndex] + ' ' + year;
            },
            formatDates(dates) {
                let newDates = [];
                for (const date of dates) {
                    newDates.push(this.formatDate(new Date(date)));
                }
                return newDates;
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
