<template>
    <div>
        <div class="container">
            <b-row>
                <div class="col-sm-6 text-right">
                   <NewHabitModal @createdNewHabit="createdNewHabit"/>
                </div>
                <div class="col-sm-6 text-right">


                    <b-input-group prepend="Search names">
                        <b-form-input v-model="search" @change="searchName"></b-form-input>

                    </b-input-group>

                </div>
            </b-row>
        </div>

    </div>
</template>

<script>
    import NewHabitModal from "@/components/NewHabitModal";

    export default {
        data() {
            return {
                mainProps: {blank: true, width: 75, height: 75, class: 'm1'},
                search: ''
            }
        },
        components: {
            NewHabitModal
        },
        methods: {
            createdNewHabit(habit) {
                console.log(habit)
                this.$emit('createdNewHabit', habit)
            },
            searchName(){
                console.log('search',this.search)
                this.$emit('filterChange',this.search)
            }
        }

    }
</script>
<style>
    .new-habit {
        background-color: #594458;
    }

    .container {
        margin-top: 3%;
    }

    .btn-primary {
        background-color: #594458;
        border-color: #594458;

    }

    .btn-primary:focus {
        background-color: #594458;
        border-color: #594458;

    }

    .btn-primary:hover {
        background-color: #594458;
        border-color: #594458;

    }

    .btn-primary:not(:disabled):not(.disabled):active {
        background-color: #594458;
        border-color: white !important;
    }

    .btn-primary:not(:disabled):not(.disabled):active:focus {
        box-shadow: 0 0 0 2px rgba(71, 75, 56, 0.75);
        border-color: #ffffff !important;
    }


</style>