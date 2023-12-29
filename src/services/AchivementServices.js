import axios from 'axios';
import { BASE_URL } from '../commonUtils/Base';
import { ACHIVEMENT_SERVICES_URL, HEALTH_SERVICES_URL } from '../commonUtils/ApiConstants';
import { toast } from 'react-toastify';

class AchivementServices {
    getAlLAchivements() {
        return axios.get(BASE_URL + ACHIVEMENT_SERVICES_URL.getAlLAchivements).catch((err) => {
            toast.error(err.response.data)
          })
    }
    claimReward(userCharId, achivementId) {
        return axios.post(BASE_URL + ACHIVEMENT_SERVICES_URL.claimReward + '/' + userCharId + '/' + achivementId).catch((err) => {
            toast.error(err.response.data)
          })
    }

    checkLeaderBoards(type, charId, isForUser, userId) {
        if (type === 'daily') {
            if (isForUser) {
                return axios.get(BASE_URL + ACHIVEMENT_SERVICES_URL.dailyRank + '/' + userId).catch((err) => {
                    toast.error(err.response.data)
                  })
            } else {
                return axios.get(BASE_URL + ACHIVEMENT_SERVICES_URL.dailyRank).catch((err) => {
                    toast.error(err.response.data)
                  })
            }
        }
        if (type === 'weekly') {
            if (isForUser) {
                return axios.get(BASE_URL + ACHIVEMENT_SERVICES_URL.weeklyRank + '/' + userId).catch((err) => {
                    toast.error(err.response.data)
                  })
            } else {
                return axios.get(BASE_URL + ACHIVEMENT_SERVICES_URL.weeklyRank).catch((err) => {
                    toast.error(err.response.data)
                  })
            }
        }
    }

    getPortionCoins(rankOrder) {
        return axios.get(BASE_URL + HEALTH_SERVICES_URL.getPotionCoins + '/' + rankOrder).catch((err) => {
            toast.error(err.response.data)
          })
    }

    buyPotionCoins(charId) {
        return axios.get(BASE_URL + HEALTH_SERVICES_URL.buyPortionCoins + '/' + charId).catch((err) => {
            toast.error(err.response.data)
          })
    }
}
export default new AchivementServices();
