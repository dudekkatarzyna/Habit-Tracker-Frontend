import {store} from "@/main";

const redirectToDashboardOrAdminIfLoggedIn = (req, res, next) => {


    if (store.getters.userId) {
        
        if (store.getters.isAdmin) {
            return 'admin'
        } else {
            return 'dashboard'
        }

    } else {
        next();
    }
};

export default redirectToDashboardOrAdminIfLoggedIn;