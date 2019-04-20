<template>
    <b-container fluid>
        <!-- User Interface controls -->
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

            <b-col md="6" class="my-1">
                <b-form-group label-cols-sm="3" label="Sort direction" class="mb-0">
                    <b-input-group>
                        <b-form-select v-model="sortDirection" slot="append">
                            <option value="asc">Asc</option>
                            <option value="desc">Desc</option>
                            <option value="last">Last</option>
                        </b-form-select>
                    </b-input-group>
                </b-form-group>
            </b-col>

            <b-col md="6" class="my-1">
                <b-form-group label-cols-sm="3" label="Per page" class="mb-0">
                    <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
                </b-form-group>
            </b-col>
        </b-row>

        <!-- Main table element -->
        <b-table
                show-empty
                stacked="md"
                :items="items"
                :fields="fields"
                :current-page="currentPage"
                :per-page="perPage"
                :filter="filter"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                @filtered="onFiltered"
        >
            <template slot="Name" slot-scope="row">
                {{ row.value.First }} {{ row.value.Last }}
            </template>

            <template slot="actions" slot-scope="row">
                <b-button size="sm" @click="row.toggleDetails">
                    {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
                </b-button>
            </template>

            <template slot="row-details" slot-scope="row">
                <b-card class="col">
                    <div v-for="habit in items[row.index].HabitsPerUser" class="row">

                        <b-col class="text-sm-right"><b>Habit:</b></b-col>
                        <b-col>{{habit.name}}</b-col>
                        <b-col class="text-sm-right"><b>Done:</b></b-col>
                        <b-col><p>{{habit.done.sort().map(el => el.slice(0,10)).join(", ")}}</p></b-col>

                    </div>
                </b-card>
                <b-button size="sm" @click="row.toggleDetails" style="margin-top: 10px">Hide Details</b-button>
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
    import axios from "axios";

    const items = [];
    export default {
        name: 'app',
        components: {},
        data() {
            return {
                fields: [
                    {key: 'Username', label: 'Username', sortable: true, sortDirection: 'desc'},
                    {key: 'Name', label: 'Full name', sortable: true, class: 'text-center'},
                    {key: 'actions', label: 'Habits'}
                ],
                items: items,
                habits: [{Name: "x"}],
                habitsDetails: [],
                selected: [],
                user: [],
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
            this.getUserList()

        },
        computed: {
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
                this.modalInfo.title = `Row index: ${index}`
                this.modalInfo.content = JSON.stringify(item, null, 2)
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

            async getHabitDetails() {
                await axios.get(`http://localhost:8080/habitsperuser/habitslist`)
                    .then(async response => {

                        for (const id in response.data) {
                            const habit = response.data[id];

                            const category = await axios.get(`http://localhost:8080/category/details/${habit.categoryId}`)

                            this.habits.push({
                                UserId: habit.userId,
                                HabitId: habit._id,
                                Name: habit.name,
                                Category: category.data.name,
                                Done: habit.done.join(", ")

                            })
                        }

                    });

            },

            getUserList() {

                axios.get(`http://localhost:8080/user/userList`)
                    .then(async response => {

                            for (const id in response.data) {
                                const user = response.data[id];
                                const habitsPerUser = [];
                                const habitsDoneDates = [];

                                for (const habit in user.habitsPerUserId) {

                                    const habitDetails = await axios.get(`http://localhost:8080/habitsperuser/details/${user.habitsPerUserId[habit]}`)

                                    //  habitsDoneDates.push(habitDetails.data.done)
                                    //   habitNames.push(habitDetails.data.name)

                                    habitsPerUser.push({
                                        name: habitDetails.data.name,
                                        done: habitDetails.data.done
                                    })
                                }

                                this.items.push({
                                    Id: user._id,
                                    Username: user.username,
                                    Name: {
                                        First: user.name,
                                        Last: user.surname
                                    },
                                    HabitsPerUser: habitsPerUser


                                });

                            }

                        }
                    )


            }


        }

    }
</script>

<style >

    .container-fluid {
        margin-top: 5%;
    }

    .b-table {
        margin-top: 50px;
    }
    h3 {
        position: static;
        padding-left: 7%;
        margin-top: 3%;
    }
</style>
