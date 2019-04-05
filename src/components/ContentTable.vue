<template>
    <div>

        <h3 class="float-left">HABITS LIST</h3>

        <b-table striped hover :items="filteredHabits" :fields="fields" class="table">
            <template slot="Action" slot-scope="row">
                <b-button v-on:click="deleteRow(row.index)" size="sm" class="mr-2">
                    Delete
                </b-button>

            </template>

            <template slot="Done" slot-scope="row">

                <div class="form-check form-check-inline">

                    <template v-for="(checkbox,index) in items[row.index].Checkboxes">

                        <input class="form-check-input mark-done" type="checkbox"
                               :checked="checkbox.checked"
                               :disabled="checkbox.checked"
                               v-on:click="sendClicked(checkbox.habitId,checkbox.completionDate,row.index)"
                               :id="'inlineCheckbox'+index">
                        <label class="form-check-label" :for="'inlineCheckbox'+index">{{days[checkbox.completionDate.getDay()]}}</label>

                    </template>

                </div>

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
                checked: '',
                checkIfDisabled: "checked",
                fields: ['Name', 'Category', 'Done', 'Date', 'Action'],
                items: [],
                habitsPerUserId: [],
                habitsDetails: [],
                selected: [],
                filter: '',
                days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],


            }
        },
        mounted() {
            this.getHabitDetails();
        },
        computed: {
            filteredHabits() {
                return this.items.filter((habit) =>{
                    return habit.Name.includes(this.filter)
                });
            }
        },
        methods: {
            filterChange(filter) {
                this.filter = filter;

            },
            checkIfCompleted(done, completionDate) {

                for (const date of done) {
                    const data = new Date(date);
                    if (data.getDay() === completionDate.getDay() && data.getMonth() === completionDate.getMonth() && data.getFullYear() === completionDate.getFullYear())
                        return true;
                }
                return false;
            },
            sendClicked(habitId, date, index) {


                axios.put(`http://localhost:8080/habitsperuser/${habitId}/update`, {date})
                    .then((response) => {
                        // console.log(response)
                    })


                this.items[index].Date = this.items[index].Date.concat(", " + this.formatDate(date))
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
                const response = await axios.get(`http://localhost:8080/user/${store.state.userId}`)

                console.log(response)
                this.habitsPerUserId = response.data.habitsPerUserId;


                for (let i = 0; i < this.habitsPerUserId.length; i++) {

                    const habitCheckboxes = [];
                    console.log("here", this.habitsPerUserId[i])

                    const response = await axios.get(`http://localhost:8080/habitsPerUser/details/${this.habitsPerUserId[i]}`)

                    for (let j = 0; j < 5; j++) {
                        const completionDate = this.getDate(new Date(), j);

                        const checked = this.checkIfCompleted(response.data.done.slice(-5), completionDate);

                        habitCheckboxes.push({
                            completionDate,
                            checked,
                            habitId: this.habitsPerUserId[i],
                            key: `${this.habitsPerUserId[i]}${j}`
                        })
                    }

                    let format = this.formatDates(response.data.done);

                    this.items.push({
                            Id: response.data._id,
                            Name: response.data.name,
                            Category: response.data.categoryId,
                            Date: format.join(`,\n`),
                            Checkboxes: habitCheckboxes
                        }
                    );

                    const responseDetails = await axios.get(`http://localhost:8080/category/details/${this.items[i].Category}`)

                    this.items[i].Category = responseDetails.data.name;

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
            }
            ,
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

<style scoped>

    .form-check-input:disabled ~ .form-check-label {
        color: #212529;
    }

    .form-check-input:disabled + .form-check-label {
        color: #6c757d;
    }
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
