<template>
    <div>
        <div class="container">
            <b-row>
                <div class="col-sm-6 text-right">
                    <b-button v-b-modal.modal1 class="new-habit">+ new habit</b-button>
                    <!-- Modal Component -->
                    <b-modal
                            id="modal1"
                            title="Add new habit">
                        <!--:footer-bg-variant="footerBgVariant"-->

                        <b-form inline>
                            <label class="sr-only" for="inlineFormInputName2">Habit:</label>
                            <b-input class="mb-2 mr-sm-2 mb-sm-0" id="inlineFormInputName2" placeholder="Habit"/>

                            <label class="mr-sm-2" for="inlineFormCustomSelectPref">Category:</label>
                            <b-form-select
                                    class="mb-2 mr-sm-2 mb-sm-0"
                                    :value="null"
                                    :options="{ '1':'Excercise','2': 'Food', '3':'Self-care','4': 'Skill' }"
                                    id="inlineFormCustomSelectPref"
                            />
                        </b-form>


                    </b-modal>
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
    export default {
        data() {
            return {
                mainProps: {blank: true, width: 75, height: 75, class: 'm1'}

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