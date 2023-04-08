import axios from "../utils/axios";


let influencerApi = {
    getAllInfluencer: async (data) => {
        return await axios({
            url: '/getAllInfluencer' + data,
            method: 'post'
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
    // getInfluencerCounter: () => axios({
    //     url: '/getDashBoardCounterData',
    //     method: 'get',
    // })
}

export default influencerApi

