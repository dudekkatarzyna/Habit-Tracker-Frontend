<template>
    <div>
        <div class="container">
            <b-row>
                <div class="col-sm-6 text-right">
                   <NewHabitModal @createdNewHabit="createdNewHabit"/>
                </div>
                <div class="col-sm-6 text-left">
                    <b-button-group>

                        <b-dropdown text="Filter" variant="outline-dark">
                            <b-dropdown-item>Done today</b-dropdown-item>
                            <b-dropdown-item>To be done</b-dropdown-item>

                            <b-dd-divider/>
                            <b-dropdown-header> Category</b-dropdown-header>
                            <b-dropdown-item href="#">excercise</b-dropdown-item>
                            <b-dropdown-item href="#">food</b-dropdown-item>
                            <b-dropdown-item href="#">self-care</b-dropdown-item>
                            <b-dropdown-item href="#">skill</b-dropdown-item>

                        </b-dropdown>
                        <b-button variant="outline-secondary">reset</b-button>
                    </b-button-group>


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
                mainProps: {blank: true, width: 75, height: 75, class: 'm1'}

            }
        },
        components: {
            NewHabitModal
        },
        methods: {
            createdNewHabit(habit) {
                console.log(habit)
                this.$emit('createdNewHabit', habit)
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