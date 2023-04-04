import axios from "../utils/axios";

let AuthApi = {
    login: async (data) => {
        return await axios({
            url: '/v1/user/login',
            method: 'post',
            data
        })
    },

}

export default AuthApi

