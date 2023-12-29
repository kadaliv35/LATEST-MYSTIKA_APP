import axios from 'axios';
import { GOAL_SERVICE_URL} from '../commonUtils/ApiConstants';
import { BASE_URL } from '../commonUtils/Base';
import { toast } from 'react-toastify';

class GoalService {
    getDecks(userId) {
        return axios.get(BASE_URL + GOAL_SERVICE_URL.getDecks+'/'+userId).catch((err) => {
            toast.error(err.response.data)
          })        
    }

    createGoal(obj){
        return axios.post(BASE_URL + GOAL_SERVICE_URL.createGoal ,obj).catch((err) => {
            toast.error(err.response.data)
          })
    }
    goalCompleteByUser(cardId , userCharId){
        return axios.post(BASE_URL + GOAL_SERVICE_URL.goalCompleteByUser+'/'+cardId+'/'+userCharId).catch((err) => {
            toast.error(err.response.data)
          })
    }
    getGoalCard(cardId){
        return axios.get(BASE_URL + GOAL_SERVICE_URL.getGoalCard+'/'+cardId).catch((err) => {
            toast.error(err.response.data)
          }) 
    }
    buyGoalCard(obj){
        return axios.post(BASE_URL + GOAL_SERVICE_URL.buyGoalCard ,obj).catch((err) => {
            toast.error(err.response.data)
          }) 
    }
    buyNewDeck(obj){
        return axios.post(BASE_URL + GOAL_SERVICE_URL.buyNewDeck ,obj).catch((err) => {
            toast.error(err.response.data)
          }) 
    }
}
export default new GoalService();
