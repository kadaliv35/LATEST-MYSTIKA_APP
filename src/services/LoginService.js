 import axios from 'axios';
import { LOGIN_URL} from '../commonUtils/ApiConstants';
import { BASE_URL } from '../commonUtils/Base';
import { toast } from 'react-toastify';

class LoginService {
    userRegister(obj) {
        return axios.post(BASE_URL + LOGIN_URL.userRegister ,obj).catch((err) => {
            toast.error(err.response.data)
          })      
    }
    loginUser(obj){
        return axios.post(BASE_URL + LOGIN_URL.loginUser ,obj).catch((err) => {
            toast.error(err.response.data)
          })  
    }
    sentVerficationCode(obj){
        return axios.post(BASE_URL + LOGIN_URL.sentVerficationCode ,obj).catch((err) => {
            toast.error(err.response.data)
          })
    }
    resetPassword(obj){
        return axios.post(BASE_URL + LOGIN_URL.resetPassword ,obj).catch((err) => {
            toast.error(err.response.data)
          })
    }
    getMasterCharacters(){
        return axios.get(BASE_URL + LOGIN_URL.getMasterCharacters).catch((err) => {
            toast.error(err.response.data)
          })
    }

}
export default new LoginService();
