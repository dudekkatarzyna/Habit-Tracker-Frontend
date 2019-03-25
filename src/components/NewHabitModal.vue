<template>
    <div>
        <b-button v-b-modal.modal1 class="new-habit">+ new habit</b-button>
        <!-- Modal Component -->
        <b-modal ref="myModalRef"
                 hide-footer
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
                        v-model="selected"
                        class="mb-2 mr-sm-2 mb-sm-0"
                        :value="null"
                        :options="options"
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
    import {store} from "@/main";

    export default {
        data() {
            return {
                form: {
                    name: ''
                },
                selected: '',
                options: [
                    {text: 'Excercise', value: '5c054ea146238108a4770b1d'},
                    {text: 'Food', value: '5c054ec40ad31d10dcf96675'},
                    {text: 'Self care', value: '5c054ecf0ad31d10dcf96676'},
                    {text: 'Skill', value: '5c054edb0ad31d10dcf96677'}
                ],
                habitId: null

            }
        },
        methods: {
            hideModal() {
                this.$refs.myModalRef.hide()
            },
            submit() {
                axios.post('http://localhost:8080/habitsperuser/create', {
                    habitName: this.form.name,
                    categoryId: this.selected,
                    userId: store.state.userId,
                    isAdmin: store.state.isAdmin
                })
                    .then(response => {
                        console.log('response',response)
                        this.habitId = response.data._id;
                        this.hideModal()

                        this.$emit('createdNewHabit', response.data)
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