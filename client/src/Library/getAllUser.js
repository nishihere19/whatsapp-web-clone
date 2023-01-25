import Axios from "axios";
const URL = process.env.REACT_APP_BACKEND_URL
const SECURITY_KEY = process.env.REACT_APP_SECURITY_KEY ?? process.env.REACT_APP_SECRET_KEY;

export const getAllUser = async token => {
    if(token){
        let _userinfo = null;
        await Axios.post(`${URL}/users/get_all_users`, {key: SECURITY_KEY})
        .then(res => _userinfo = res.data)
        .catch(err => _userinfo =  err.response )
        return _userinfo
    }else return undefined;
}

export const getAllArchives = async () => {
        let _info = null;
        await Axios.post(`${URL}/archives/get_all_archives`)
        .then(res => _info = res.data)
        .catch(err => _info =  err.response )
        return _info
}

// export default {getAllUser, getAllArchives}