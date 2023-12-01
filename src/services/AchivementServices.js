import axios from 'axios';
import { BASE_URL } from '../commonUtils/Base';
import { ACHIVEMENT_SERVICES_URL, HEALTH_SERVICES_URL } from '../commonUtils/ApiConstants';

class AchivementServices {
    getAlLAchivements() {
        return axios.get(BASE_URL + ACHIVEMENT_SERVICES_URL.getAlLAchivements);
    }
    claimReward(userCharId, achivementId) {
        return axios.post(BASE_URL + ACHIVEMENT_SERVICES_URL.claimReward + '/' + userCharId + '/' + achivementId)
    }

    checkLeaderBoards(type, charId, isForUser, userId) {
        if (type === 'daily') {
            if (isForUser) {
                return axios.get(BASE_URL + ACHIVEMENT_SERVICES_URL.dailyRank + '/' + userId)
            } else {
                return axios.get(BASE_URL + ACHIVEMENT_SERVICES_URL.dailyRank)
            }
        }
        if (type === 'weekly') {
            if (isForUser) {
                return axios.get(BASE_URL + ACHIVEMENT_SERVICES_URL.weeklyRank + '/' + userId)
            } else {
                return axios.get(BASE_URL + ACHIVEMENT_SERVICES_URL.weeklyRank)
            }
        }
    }

    getPortionCoins(rankOrder) {
        return axios.get(BASE_URL + HEALTH_SERVICES_URL.getPotionCoins + '/' + rankOrder)
    }

    buyPotionCoins(charId) {
        return axios.get(BASE_URL + HEALTH_SERVICES_URL.buyPortionCoins + '/' + charId)
    }
}
export default new AchivementServices();