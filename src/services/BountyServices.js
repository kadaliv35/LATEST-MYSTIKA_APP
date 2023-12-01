import axios from 'axios';
import { DAILY_LOGIN_BOUNTY_URL, LEADERBOARD_URL } from '../commonUtils/ApiConstants';
import { BASE_URL } from '../commonUtils/Base';

class BountyService {
    getbounty(userName) {
        console.log(userName)
        return axios.get(BASE_URL + DAILY_LOGIN_BOUNTY_URL.getbounty + '/' + userName);
    }

    postuserBounty(obj) {
        return axios.post(BASE_URL + DAILY_LOGIN_BOUNTY_URL.postuserBounty, obj);
    }

    getDailyRank() {
        return axios.get(BASE_URL + LEADERBOARD_URL.getDailyCharList)
    }

    getWeeklyRank() {
        return axios.get(BASE_URL + LEADERBOARD_URL.getWeeklyCharList)
    }

    getLeaderListDaily() {
        return axios.get(BASE_URL + LEADERBOARD_URL.getDailyList)
    }

    getLeaderListWeekly() {
        return axios.get(BASE_URL + LEADERBOARD_URL.getWeeklyList)
    }

    getCharacterDailyRank(charId) {
        return axios.get(`${BASE_URL + LEADERBOARD_URL.getCharDailyRank}"/"${charId}`)
    }

    getCharacterWeeklyRank(charId) {
        return axios.get(`${BASE_URL + LEADERBOARD_URL.getCharWeekRank}"/"${charId}`)
    }

    getUserDailyRank(userId) {
        return axios.get(`${BASE_URL + LEADERBOARD_URL.getUserDailyRank}"/"${userId}`)
    }

    getUserWeeklyRank(userId) {
        return axios.get(`${BASE_URL + LEADERBOARD_URL.getUserWeekRank}"/"${userId}`)
    }

}
// eslint-disable-next-line import/no-anonymous-default-export
export default new BountyService();