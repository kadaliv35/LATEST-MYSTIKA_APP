import axios from 'axios';
import { BASE_URL } from '../commonUtils/Base';
import { ACHIVEMENT_SERVICES_URL } from '../commonUtils/ApiConstants';

class AchivementServices {
    getAlLAchivements() {
        return axios.get(BASE_URL +ACHIVEMENT_SERVICES_URL.getAlLAchivements);        
    }
    claimReward(userCharId ,achivementId) {
        return axios.post(BASE_URL +ACHIVEMENT_SERVICES_URL.claimReward +'/'+userCharId +'/'+achivementId) 
    }
}
export default new AchivementServices();