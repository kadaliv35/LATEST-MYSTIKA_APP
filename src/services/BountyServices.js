import axios from 'axios';
import { DAILY_LOGIN_BOUNTY_URL} from '../commonUtils/ApiConstants';
import { BASE_URL } from '../commonUtils/Base';

class BountyService {
    getbounty(userName) {
        console.log(userName) 
        return axios.get(BASE_URL + DAILY_LOGIN_BOUNTY_URL.getbounty+'/'+userName);        
    }

    postuserBounty(obj){
        return axios.post(BASE_URL + DAILY_LOGIN_BOUNTY_URL.postuserBounty ,obj);
    }
}
export default new BountyService();