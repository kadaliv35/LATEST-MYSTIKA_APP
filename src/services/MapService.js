import axios from "axios";
import { BASE_URL } from "../commonUtils/Base";
import { MAP_FUNCTION_URL } from "../commonUtils/ApiConstants";

class MapService {
    getAssignedPlace(charId) {
        return axios.get(BASE_URL + MAP_FUNCTION_URL.getAssginedPlace + '/' + charId)
    }

    getAllElements() {
        return axios.get(BASE_URL + MAP_FUNCTION_URL.getAllElements)
    }

    getAllMap() {
        return axios.get(BASE_URL + MAP_FUNCTION_URL.getAllMap)
    }

    saveCurrentLoc(charId, mapId) {
        return axios.get(BASE_URL + MAP_FUNCTION_URL.saveCuurentPlace + '/' + charId + '/' + mapId)
    }

    combactClash(charId, eleId) {
        return axios.get(BASE_URL + MAP_FUNCTION_URL.combateClash + '/' + charId + '/' + eleId)
    }

    enemyList(charId) {
        return axios.get(BASE_URL + MAP_FUNCTION_URL.userEnemy + '/' + charId)
    }

    claimRewards(charId, rewardType) {
        return axios.get(BASE_URL + MAP_FUNCTION_URL.claimMapReward + '/' + charId + '/' + rewardType)
    }
}

export default new MapService()