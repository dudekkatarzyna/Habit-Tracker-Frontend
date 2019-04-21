import {decodeLocalJWT} from "@/jwt";

const redirectToHomeIfNotLoggedIn = (req, res, next) => {

   // console.log("redirectToHomeIfNotLoggedIn")
    const decodedToken=decodeLocalJWT();

    return !!decodedToken.userId;
};

export default redirectToHomeIfNotLoggedIn;