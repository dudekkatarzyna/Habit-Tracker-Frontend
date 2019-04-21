<template>

    <div>
        <Nav :logged-in="true"></Nav>

        <h3>{{errorMsg}}</h3>
        <div class="container border border-dark">
            <h1>Register</h1>
            <b-form @submit="onSubmit" v-if="show">
                <b-form-group id="exampleInputGroup2" label="Fist name:" label-for="exampleInput2">
                    <b-form-input
                            type="text"
                            v-model="form.firstName"
                            required
                            placeholder="Enter first name"/>
                </b-form-group>
                <b-form-group label="Last name:" label-for="exampleInput2">
                    <b-form-input
                            type="text"
                            v-model="form.lastName"
                            required
                            placeholder="Enter last name"/>
                </b-form-group>
                <b-form-group label="Username:" label-for="exampleInput2">
                    <b-form-input

                            type="text"
                            v-model="form.username"
                            required
                            placeholder="Enter username"/>
                </b-form-group>

                <b-form @submit.prevent>
                    <label for="textPassword">Password:</label>
                    <b-input id="textPassword"
                             type="password"
                             aria-describedby="passwordHelpBlock"
                             placeholder="Enter password"
                             required
                             v-model="form.password"/>
                    <b-form-invalid-feedback :state="lengthValidation">
                        Your password must be 6-15 characters long.
                    </b-form-invalid-feedback>
                </b-form>

                <b-form @submit.prevent>
                    <label for="textConfirmPassword">Confirm password:</label>
                    <b-input id="textConfirmPassword"
                             type="password"
                             aria-describedby="passwordHelpBlock"
                             placeholder="Confirm password"
                             required
                             v-model="form.confirmPassword"/>
                    <b-form-invalid-feedback :state="validation">
                        Passwords don't match
                    </b-form-invalid-feedback>
                </b-form>

                <b-button href="/login" variant="outline-secondary" class="signup">Sign up</b-button>
                <b-button type="submit" variant="secondary" class="signin">Sign in</b-button>

            </b-form>
        </div>
    </div>
</template>

<script>

    import axios from "axios";
    import Nav from "@/components/Nav";

    export default {
        computed: {
            lengthValidation() {
                return this.form.password.length > 6 && this.form.password.length < 16
            },
            username() {
                // We will see what `params` is shortly
                return this.$route.params.username
            },
            validation() {
                return this.form.password === this.form.confirmPassword
            }

        },
        name: 'Register',
        components: {
            Nav
        },
        data() {
            return {
                form: {
                    firstName: '',
                    lastName: '',
                    username: '',
                    password: '',
                    confirmPassword: ''
                },
                show: true,
                errorMsg: ''
            }
        },
        methods: {
            goBack() {
                window.history.length > 1
                    ? this.$router.go(-1)
                    : this.$router.push('/')
            },
            onSubmit(evt) {

                axios.post('http://localhost:8080/register', {
                    username: this.form.username,
                    password: this.form.password,
                    confirmPassword: this.form.confirmPassword,
                    name: this.form.firstName,
                    surname: this.form.lastName,
                    habitsPerUserId: []
                })
                    .then(response => {
                        this.$router.push('/dashboard')
                    })
                    .catch(error => {
                        console.log('error');
                        this.errorMsg = "User with this username already exists!";
                        this.onReset();
                    });
                evt.preventDefault()
            },
            onReset() {

                /* Reset our form values */
                this.form.username = '';
                this.form.password = '';
                this.form.confirmPassword = '';
                /* Trick to reset/clear native browser form validation state */
                this.show = false;
                this.$nextTick(() => {
                    this.show = true
                })
            }
        }
    }
</script>
<style scoped>
    h3 {
        padding-right: 94px;
        color: red;
    }
    h1 {
        margin-bottom: 40px;
    }

    .container {
        max-width: 25%;
        margin-top: 5%;
        border-color: dimgrey;
        padding: 50px 30px 50px 30px;
    }

    .signup {
        margin-top: 35px;
        margin-right: 10px;
    }

    .signin {
        margin-top: 35px;
        background-color: #623b5a;
    }

</style>

