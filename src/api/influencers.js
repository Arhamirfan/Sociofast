import axios from "../utils/axios";

let influencerApi = {
    getAllInfluencer: async (data) => {
        return await axios({
            url: '/getAllInfluencer/' + data,
            method: 'post'
        })
    },
    getDashboardDataCount: async (data) => {
        return await axios({
            url: '/getDashBoardCounterData',
            method: 'post'
        })
    },
}

export default influencerApi

