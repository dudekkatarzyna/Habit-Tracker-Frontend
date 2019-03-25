import {store} from "@/main";



const redirectToHomeIfNotLoggedInAsAdmin = (req, res, next) => {

    console.log(store.getters.isAdmin)
    if (!store.getters.isAdmin) {
        return false
    } else {
        return true;
    }
};

export default redirectToHomeIfNotLoggedInAsAdmin;