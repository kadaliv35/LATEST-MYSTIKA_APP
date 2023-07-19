import axios from 'axios';
import { GOAL_SERVICE_URL} from '../commonUtils/ApiConstants';
import { BASE_URL } from '../commonUtils/Base';

class GoalService {
    getDecks(userId) {
        return axios.get(BASE_URL + GOAL_SERVICE_URL.getDecks+'/'+userId);        
    }

    createGoal(obj){
        return axios.post(BASE_URL + GOAL_SERVICE_URL.createGoal ,obj);
    }
    goalCompleteByUser(cardId , userCharId){
        return axios.post(BASE_URL + GOAL_SERVICE_URL.goalCompleteByUser+'/'+cardId+'/'+userCharId);
    }
    getGoalCard(cardId){
        return axios.get(BASE_URL + GOAL_SERVICE_URL.getGoalCard+'/'+cardId); 
    }
    buyGoalCard(obj){
        return axios.post(BASE_URL + GOAL_SERVICE_URL.buyGoalCard ,obj); 
    }
    buyNewDeck(obj){
        return axios.post(BASE_URL + GOAL_SERVICE_URL.buyNewDeck ,obj); 
    }
}
export default new GoalService();