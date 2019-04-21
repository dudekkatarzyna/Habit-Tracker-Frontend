import {decodeLocalJWT} from "@/jwt";


const redirectToHomeIfNotLoggedInAsAdmin = (req, res, next) => {

   // console.log("redirectToHomeIfNotLoggedInAsAdmin")
    const decodedToken=decodeLocalJWT();

    return decodedToken.isAdmin;
};

export default redirectToHomeIfNotLoggedInAsAdmin;