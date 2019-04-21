import VueJwtDecode from 'vue-jwt-decode'

export const decodeLocalJWT=() => {


    const token = localStorage.getItem("jwt");
    if(!token){
        return {isAdmin: false, userId: null}
    }
    return VueJwtDecode.decode(token);
};
export const createJWTHeader=() => {

    return {
        headers: {
            Authorization: localStorage.getItem("jwt")
        }
}
};