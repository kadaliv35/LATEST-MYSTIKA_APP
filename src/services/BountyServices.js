import axios from 'axios';
import { DAILY_LOGIN_BOUNTY_URL, LEADERBOARD_URL } from '../commonUtils/ApiConstants';
import { BASE_URL } from '../commonUtils/Base';
import { toast } from 'react-toastify';

class BountyService {
    getbounty(userName) {
        console.log(userName)
        return axios.get(BASE_URL + DAILY_LOGIN_BOUNTY_URL.getbounty + '/' + userName).catch((err) => {
            toast.error(err.response.data)
          })
    }

    postuserBounty(obj) {
        return axios.post(BASE_URL + DAILY_LOGIN_BOUNTY_URL.postuserBounty, obj).catch((err) => {
            toast.error(err.response.data)
          })
    }

    getDailyRank() {
        return axios.get(BASE_URL + LEADERBOARD_URL.getDailyCharList).catch((err) => {
            toast.error(err.response.data)
          })
    }

    getWeeklyRank() {
        return axios.get(BASE_URL + LEADERBOARD_URL.getWeeklyCharList).catch((err) => {
            toast.error(err.response.data)
          })
    }

    getLeaderListDaily() {
        return axios.get(BASE_URL + LEADERBOARD_URL.getDailyList).catch((err) => {
            toast.error(err.response.data)
          })
    }

    getLeaderListWeekly() {
        return axios.get(BASE_URL + LEADERBOARD_URL.getWeeklyList).catch((err) => {
            toast.error(err.response.data)
          })
    }

    getCharacterDailyRank(charId) {
        return axios.get(`${BASE_URL + LEADERBOARD_URL.getCharDailyRank}"/"${charId}`).catch((err) => {
            toast.error(err.response.data)
          })
    }

    getCharacterWeeklyRank(charId) {
        return axios.get(`${BASE_URL + LEADERBOARD_URL.getCharWeekRank}"/"${charId}`).catch((err) => {
            toast.error(err.response.data)
          })
    }

    getUserDailyRank(userId) {
        return axios.get(`${BASE_URL + LEADERBOARD_URL.getUserDailyRank}"/"${userId}`).catch((err) => {
            toast.error(err.response.data)
          })
    }

    getUserWeeklyRank(userId) {
        return axios.get(`${BASE_URL + LEADERBOARD_URL.getUserWeekRank}"/"${userId}`).catch((err) => {
            toast.error(err.response.data)
          })
    }

}
// eslint-disable-next-line import/no-anonymous-default-export
export default new BountyService();
