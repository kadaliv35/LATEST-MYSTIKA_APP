 import axios from 'axios';
import { LOGIN_URL} from '../commonUtils/ApiConstants';
import { BASE_URL } from '../commonUtils/Base';

class LoginService {
    userRegister(obj) {
        return axios.post(BASE_URL + LOGIN_URL.userRegister ,obj);        
    }
    loginUser(obj){
        return axios.post(BASE_URL + LOGIN_URL.loginUser ,obj);  
    }
    sentVerficationCode(obj){
        return axios.post(BASE_URL + LOGIN_URL.sentVerficationCode ,obj);
    }
    resetPassword(obj){
        return axios.post(BASE_URL + LOGIN_URL.resetPassword ,obj); 
    }
    getMasterCharacters(){
        return axios.get(BASE_URL + LOGIN_URL.getMasterCharacters)
    }

}
export default new LoginService();