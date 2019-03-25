import {store} from "@/main";
import axios from "axios";

const redirectToDashboardOrAdminIfLoggedIn = (req, res, next) => {


    if (store.getters.userId) {

        if (store.getters.isAdmin) {
            return 'admin'
        } else {
            return 'dashboard'
        }

    }
    return ''
};

export default redirectToDashboardOrAdminIfLoggedIn;

/*
await axios.get(`http://localhost:8080/user/${store.getters.userId}`)
    .then(response => {
        console.log(response.data.admin)
        if (response.data.admin) {
            console.log('admin1')
            return response.data.admin
        } else {
            return 'dashboard'
        }
    })

} else {
    return ''
}*/
