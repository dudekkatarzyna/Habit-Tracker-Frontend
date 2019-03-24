import {store} from "./../main.js";

const redirectToHomeIfNotLoggedIn = (req, res, next) => {

    console.log('middle: '+store.getters.userId);

    if (store.getters.userId) {
        return true;
       // next();
    } else {
        return false;
    }
};

export default redirectToHomeIfNotLoggedIn;