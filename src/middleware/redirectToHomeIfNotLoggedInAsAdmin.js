import {store} from "@/main";



const redirectToHomeIfNotLoggedInAsAdmin = (req, res, next) => {

    if (!store.getters.isAdmin) {
        return false
    } else {
        return true;
    }
};

export default redirectToHomeIfNotLoggedInAsAdmin;