import axios from "axios";
import { BASE_URL } from "../commonUtils/Base";
import { MAP_FUNCTION_URL } from "../commonUtils/ApiConstants";
import { toast } from "react-toastify";

class MapService {
    getAssignedPlace(charId) {
        return axios.get(BASE_URL + MAP_FUNCTION_URL.getAssginedPlace + '/' + charId).catch((err) => {
            toast.error(err.response.data)
          })
    }

    getAllElements() {
        return axios.get(BASE_URL + MAP_FUNCTION_URL.getAllElements).catch((err) => {
            toast.error(err.response.data)
          })
    }

    getAllMap() {
        return axios.get(BASE_URL + MAP_FUNCTION_URL.getAllMap).catch((err) => {
            toast.error(err.response.data)
          })
    }

    saveCurrentLoc(charId, mapId) {
        return axios.get(BASE_URL + MAP_FUNCTION_URL.saveCuurentPlace + '/' + charId + '/' + mapId).catch((err) => {
            toast.error(err.response.data)
          })
    }

    combactClash(charId, eleId) {
        return axios.get(BASE_URL + MAP_FUNCTION_URL.combateClash + '/' + charId + '/' + eleId).catch((err) => {
            toast.error(err.response.data)
          })
    }

    enemyList(charId) {
        return axios.get(BASE_URL + MAP_FUNCTION_URL.userEnemy + '/' + charId).catch((err) => {
            toast.error(err.response.data)
          })
    }

    claimRewards(charId, rewardType) {
        return axios.get(BASE_URL + MAP_FUNCTION_URL.claimMapReward + '/' + charId + '/' + rewardType).catch((err) => {
            toast.error(err.response.data)
          })
    }
}

export default new MapService()
