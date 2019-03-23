<template>
    <div>
        <b-button v-b-modal.modal1 class="new-habit">+ new habit</b-button>
        <!-- Modal Component -->
        <b-modal hide-footer
                 id="modal1"
                 title="Add new habit">
            <!--:footer-bg-variant="footerBgVariant"-->

            <b-form inline>
                <label class="sr-only" for="inlineFormInputName2">Habit:</label>
                <b-input type="text"
                         v-model="form.name"
                         class="mb-2 mr-sm-2 mb-sm-0"
                         id="inlineFormInputName2"
                         placeholder="Habit"/>

                <label class="mr-sm-2" for="inlineFormCustomSelectPref">Category:</label>
                <b-form-select
                        class="mb-2 mr-sm-2 mb-sm-0"
                        :value="null"
                        :options="{ '1':'Excercise','2': 'Food', '3':'Self-care','4': 'Skill' }"
                        id="inlineFormCustomSelectPref"
                />
            </b-form>

            <b-button class="footer" @click="hideModal">Anuluj</b-button>
            <b-button class="footer submit" @click="submit">Zatwierdź</b-button>


        </b-modal>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        data() {
            return {
                form: {
                    name: ''
                }

            }
        },
        methods: {
            hideModal() {
                this.$refs.myModalRef.hide()
            },
            submit() {
                axios.post('http://localhost:8080/habitsperuser/create', {
                    habitName: this.form.name,
                    category: this.form.options
                })
                    .then(response => {
                        console.log(response)
                        this.$refs.myModalRef.hide()
                    })
            }

        }

    }
</script>
<style>
    .footer {
        margin-top: 20px;
        margin-right: 5px;
    }

    .submit {
        background-color: #594458;
    }

    .new-habit {
        background-color: #594458;
    }


</style>