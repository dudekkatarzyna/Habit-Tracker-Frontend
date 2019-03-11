<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="/">HABIT TRACKER</b-navbar-brand>

            <b-nav-item href="/login">LOGIN</b-nav-item>


        </b-navbar>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                slide: 0,
                sliding: null
            }
        },

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