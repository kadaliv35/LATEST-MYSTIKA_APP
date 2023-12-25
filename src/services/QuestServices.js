import axios from 'axios';
import { BASE_URL } from '../commonUtils/Base';
import { TREASURE_QUEST_SERVICES_URL, DAILY_QUEST_SERVICES_URL, TRAVELL_SERVICE_URL } from '../commonUtils/ApiConstants';

class QuestServices {
    getAllTreasureQuest(charId) {
        return axios.get(BASE_URL + TREASURE_QUEST_SERVICES_URL.getAllQuest + '/' + charId);
    }

    updatedTChestStatus(userId, tChestId) {
        return axios.get(BASE_URL + TREASURE_QUEST_SERVICES_URL.updatedTChestStatus + '/' + userId + '/' + tChestId)
    }

    claimDailyQuestRewards(userId) {
        return axios.post(BASE_URL + DAILY_QUEST_SERVICES_URL.claimQuesttonerRead + '/' + userId)
    }

    saveCurrentPlace(charId, placeId) {
        return axios.get(BASE_URL + TRAVELL_SERVICE_URL.travelHere + '/' + charId + '/' + placeId)
    }

}
// eslint-disable-next-line import/no-anonymous-default-export
export default new QuestServices();
