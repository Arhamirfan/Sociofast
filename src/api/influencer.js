import axios from "../utils/axios";


let influencerApi = {
    getInfluencerByFilter: async (data) => {
        return await axios({
            url: '/getInfluencerByFilter' + data,
            method: 'get'
        })
    },
    getDashboardDataCount: async (data) => {
        return await axios({
            url: '/getDashBoardCounterData',
            method: 'get',
            // headers: {
            //     Authorization: "Bearer " + localStorage.getItem("token"),
            //   },
        })
    },
}

export default influencerApi

