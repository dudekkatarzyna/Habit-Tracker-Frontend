<template>
    <div>
<div class="container">

    <b-img v-bind="mainProps" blank-color="#A7A9A5" alt="HEX color image"/>
    <h2>Habit tracker </h2>
    <h4>Improve yourself </h4>
    <b-button v-on:click="login" variant="outline-primary">Start tracking</b-button>
</div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                mainProps: { blank: true, width: 75, height: 75, class: 'm1' }

            }
        },
        methods: {
            login() {
                this.$router.push('/login')
            }
        }

    }
</script>
<style scoped>
    .container {
        position: sticky;
        margin-top: 0;
    }
    .container h2 {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 40px;
    }

    .container h4 {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
    }

   .container .m1 {
        width: 100%;
        height: 350px;
    }

   .container .btn {
       position: absolute;
       top: 70%;
       left: 50%;
       transform: translate(-50%, -50%);
       -ms-transform: translate(-50%, -50%);
       background-color: #ffffff;
       color: #594458;
       font-size: 16px;
       padding: 12px 24px;
       border-color: #594458;
       cursor: pointer;
       border-radius: 5px;
   }

    .container .btn:not(:disabled):not(.disabled):active {
        background-color: #594458;
        border-color: white !important;
    }

    .container .btn:not(:disabled):not(.disabled):active:focus {
        box-shadow: 0 0 0 2px rgba(71, 75, 56, 0.75);
        border-color: #ffffff !important;
    }
    .container .btn:focus {
        box-shadow: 0 0 0 2px rgba(71, 75, 56, 0.75);
    }


    .container{
        padding: 0 0 0 0;
        margin-right: 0;
        margin-left: 0;
        max-width: 100%;
    }
</style>