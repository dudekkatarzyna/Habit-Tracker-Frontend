import {decodeLocalJWT} from "@/jwt";

const redirectToDashboardOrAdminIfLoggedIn = () => {

    console.log("redirectToDashboardOrAdminIfLoggedIn");
    const decodedToken=decodeLocalJWT();

    if (decodedToken.userId) {

        if (decodedToken.isAdmin) {
            return 'admin'
        } else {
            return 'dashboard'
        }

    }
    return undefined
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
