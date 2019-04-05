import {store} from "./../main.js";

const redirectToHomeIfNotLoggedIn = (req, res, next) => {

    if (store.getters.userId) {
        return true;
       // next();
    } else {
        return false;
    }
};

export default redirectToHomeIfNotLoggedIn;