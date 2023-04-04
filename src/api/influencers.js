import axios from "../utils/axios";

let influencerApi = {
    getAllInfluencer: async (data) => {
        return await axios({
            url: '/getAllInfluencer',
            method: 'post'
        })
    },
}

export default influencerApi

