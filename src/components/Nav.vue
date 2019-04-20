<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="/">HABIT TRACKER</b-navbar-brand>

            <b-nav-item v-if="loggedIn" to="/login">LOGIN</b-nav-item>
            <b-nav-item v-else v-on:click="logout">LOG OUT</b-nav-item>

        </b-navbar>
    </div>
</template>

<script>

    export default {
        props: ['loggedIn'],
        data() {
            return {
                slide: 0,
                sliding: null
            }
        },
        methods: {
            logout() {

                this.$store.commit('setUserId', null);
                this.$router.push('/')


            }
        }
    }
</script>
<style scoped>
    .navbar-brand {
        color: #594458 !important;
    }

    .nav-link {
        color: #594458;
        text-align: right;
        position: absolute;
        right: 20px;
        padding: 0.1rem 1rem;

    }

    .bg-info {
        background-color: #A7A9A5 !important;
    }
</style>