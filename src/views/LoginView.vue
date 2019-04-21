<template>
    <div>
        <Nav :logged-in="true"></Nav>

        <h3>{{connectionStatus}}</h3>
        <div class="container border border-dark">


            <h1>Login</h1>
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">

                <b-form-group id="exampleInputGroup2" label="Username:" label-for="exampleInput2">
                    <b-form-input

                            id="exampleInput2"
                            type="text"
                            v-model="form.username"
                            required
                            placeholder="Enter username"/>
                </b-form-group>

                <b-form @submit.prevent>
                    <label for="textPassword">Password:</label>
                    <b-input type="password"
                             id="textPassword"
                             aria-describedby="passwordHelpBlock"
                             placeholder="Enter password"
                             required
                             v-model="form.password"/>
                </b-form>


                <b-button href="/register" variant="outline-secondary" class="signup">Sign up</b-button>
                <b-button type="submit" variant="secondary" class="signin">Sign in</b-button>
            </b-form>
        </div>
    </div>
</template>

<script>

    import axios from "axios";
    import Nav from "@/components/Nav";
    import VueJwtDecode from 'vue-jwt-decode'


    export default {
        computed: {
            username() {
                return this.$route.params.username
            }
        },
        name: 'Login',
        components: {
            Nav
        },
        data() {
            return {
                form: {
                    username: '',
                    password: ''
                },
                show: true,
                connectionStatus: ''
            }
        },
        mounted() {
            this.checkConnection();
        },
        methods: {
            goBack() {
                window.history.length > 1
                    ? this.$router.go(-1)
                    : this.$router.push('/')
            },
            checkConnection() {

                setInterval(() => {
                    if (navigator.onLine) {
                        this.connectionStatus = "";
                    } else {
                        this.connectionStatus = "Unable to connect to internet.";

                    }
                }, 2000)

            },
            onSubmit(evt) {
                const username = this.form.username;
                const password = this.form.password;
                // this.$store.dispatch('login', { email, password }).then(() => this.$router.push('/'))

                axios.post('http://localhost:8080/login', {username: this.form.username, password: this.form.password})
                    .then(response => {


                            const decoded = VueJwtDecode.decode(response.data);


                            this.$store.commit("setUserId", decoded.userId);
                            this.$store.commit("setAdmin", decoded.isAdmin);

                            localStorage.setItem("jwt", response.data);

                            if (decoded.isAdmin) {
                                this.$router.push('/admin')
                            } else {
                                this.$router.push('/dashboard')
                            }
                        },
                        error => {
                            this.$router.push('/login');
                            this.onReset(evt);
                        });
                evt.preventDefault()

            },
            onReset(evt) {
                evt.preventDefault();
                /* Reset our form values */
                this.form.username = '';
                this.form.password = '';
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
        max-width: 20%;
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

