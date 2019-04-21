<template>
    <b-container>


        <b-row>
            <b-col md="6" class="my-1">
                <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
                    <b-input-group>
                        <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
                        <b-input-group-append>
                            <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
            </b-col>

            <b-col md="6" class="my-1">
                <b-form-group label-cols-sm="3" label="Sort" class="mb-0">
                    <b-input-group>
                        <b-form-select v-model="sortBy" :options="sortOptions">
                            <option slot="first" :value="null">-- none --</option>
                        </b-form-select>
                        <b-form-select v-model="sortDesc" :disabled="!sortBy" slot="append">
                            <option :value="false">Asc</option>
                            <option :value="true">Desc</option>
                        </b-form-select>
                    </b-input-group>
                </b-form-group>
            </b-col>

            <!--<b-col md="6" class="my-1">-->
                <!--<b-form-group label-cols-sm="3" label="Sort direction" class="mb-0">-->
                    <!--<b-input-group>-->
                        <!--<b-form-select v-model="sortDirection" slot="append">-->
                            <!--<option value="asc">Asc</option>-->
                            <!--<option value="desc">Desc</option>-->
                            <!--<option value="last">Last</option>-->
                        <!--</b-form-select>-->
                    <!--</b-input-group>-->
                <!--</b-form-group>-->
            <!--</b-col>-->

            <b-col md="6" class="my-1">
                <b-form-group label-cols-sm="3" label="Per page" class="mb-0">
                    <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
                </b-form-group>
            </b-col>
        </b-row>

        <b-table
                show-empty
                stacked="md"
                :current-page="currentPage"
                :per-page="perPage"
                :filter="filter"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                @filtered="onFiltered"

                striped hover :items="items" :fields="fields" class="table" responsive>
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

        <b-row>
            <b-col md="6" class="my-1">
                <b-pagination
                        v-model="currentPage"
                        :total-rows="totalRows"
                        :per-page="perPage"
                        class="my-0"
                ></b-pagination>
            </b-col>
        </b-row>
    </b-container>

</template>

<script>
    import Header from "@/components/Header";
    import axios from "axios";
    import ButtonGroup from "@/components/ButtonGroup";
    import {store} from "@/main";
    import {createJWTHeader, decodeLocalJWT} from "@/jwt";

    const items=[];
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
                fields: [
                    {key: 'Name', label: 'Name', sortable: true, sortDirection: 'desc'},
                    {key: 'Category', label: 'Category', sortable: true, class: 'text-center'},
                    {key: 'Done', label: 'Done', sortable: false, class: 'text-center'},
                    {key: 'Date', label: 'Date', sortable: false, class: 'text-center'},
                    {key: 'Action', label: 'Action'}
                ],
                items: items,
                habitsPerUserId: [],
                habitsDetails: [],
                selected: [],
                days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                currentPage: 1,
                perPage: 5,
                totalRows: items.length,
                pageOptions: [5, 10, 15],
                sortBy: null,
                sortDesc: false,
                sortDirection: 'asc',
                filter: null,
                modalInfo: {title: '', content: ''}


            }
        },
        mounted() {
            this.getHabitDetails();
        },
        computed: {
            filteredHabits() {
                return this.items.filter((habit) => {
                    return habit.Name.includes(this.filter)
                });
            },
            sortOptions() {
                // Create an options list from our fields
                return this.fields
                    .filter(f => f.sortable)
                    .map(f => {
                        return {text: f.label, value: f.key}
                    })
            }
        },
        methods: {
            info(item, index, button) {
                this.modalInfo.title = `Row index: ${index}`;
                this.modalInfo.content = JSON.stringify(item, null, 2);
                this.$root.$emit('bv::show::modal', 'modalInfo', button)
            },
            resetModal() {
                this.modalInfo.title = '';
                this.modalInfo.content = ''
            },
            onFiltered(filteredItems) {
                // Trigger pagination to update the number of buttons/pages due to filtering
                this.totalRows = filteredItems.length;
                this.currentPage = 1
            },

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
                    });


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
                axios.delete(`http://localhost:8080/habitsPerUser/${this.habitsPerUserId[index]}/delete`);

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

                const decoded = decodeLocalJWT();
                const response = await axios.get(`http://localhost:8080/user/${decoded.userId}`);

                this.habitsPerUserId = response.data.habitsPerUserId;


                for (let i = 0; i < this.habitsPerUserId.length; i++) {

                    const habitCheckboxes = [];


                    const response = await axios.get(`http://localhost:8080/habitsPerUser/details/${this.habitsPerUserId[i]}`);

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

                    const responseDetails = await axios.get(`http://localhost:8080/category/details/${this.items[i].Category}`);

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

    .pagination {
        margin-left: 50px;
        margin-bottom: 80px !important;
    }
    .container-fluid{
        margin-top: 40px !important;
        max-width: 100%;
    }

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
