import axios from 'axios';
import { BASE_URL } from '../commonUtils/Base';
import { TREASURE_QUEST_SERVICES_URL, DAILY_QUEST_SERVICES_URL, TRAVELL_SERVICE_URL } from '../commonUtils/ApiConstants';
import { toast } from 'react-toastify';

class QuestServices {
    getAllTreasureQuest(charId) {
        return axios.get(BASE_URL + TREASURE_QUEST_SERVICES_URL.getAllQuest + '/' + charId).catch((err) => {
            toast.error(err.response.data)
          })
    }

    updatedTChestStatus(userId, tChestId) {
        return axios.get(BASE_URL + TREASURE_QUEST_SERVICES_URL.updatedTChestStatus + '/' + userId + '/' + tChestId).catch((err) => {
            toast.error(err.response.data)
          })
    }

    claimDailyQuestRewards(userId) {
        return axios.post(BASE_URL + DAILY_QUEST_SERVICES_URL.claimQuesttonerRead + '/' + userId).catch((err) => {
            toast.error(err.response.data)
          })
    }

    saveCurrentPlace(charId, placeId) {
        return axios.get(BASE_URL + TRAVELL_SERVICE_URL.travelHere + '/' + charId + '/' + placeId).catch((err) => {
            toast.error(err.response.data)
          })
    }

}
// eslint-disable-next-line import/no-anonymous-default-export
export default new QuestServices();
