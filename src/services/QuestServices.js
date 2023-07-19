import axios from 'axios';
import { BASE_URL } from '../commonUtils/Base';
import { TREASURE_QUEST_SERVICES_URL ,DAILY_QUEST_SERVICES_URL } from '../commonUtils/ApiConstants';

class QuestServices {
    getAllTreasureQuest(charId) {
        return axios.get(BASE_URL +TREASURE_QUEST_SERVICES_URL.getAllQuest+'/'+charId);        
    }
    updatedTChestStatus(tChestId) {
        return axios.post(BASE_URL+TREASURE_QUEST_SERVICES_URL.updatedTChestStatus + '/'+tChestId)
    }
    claimDailyQuestRewards(userId) {
        return axios.post(BASE_URL+DAILY_QUEST_SERVICES_URL.claimDailyQuestRewards+ '/'+userId )
    }
    // claimReward(userCharId ,achivementId) {
    //     return axios.post(BASE_URL +ACHIVEMENT_SERVICES_URL.claimReward +'/'+userCharId +'/'+achivementId) 
    // }
}
export default new QuestServices();
