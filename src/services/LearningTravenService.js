import axios from "axios";
import { LEARNING_TRAVEN_URL } from "../commonUtils/ApiConstants";
import { BASE_URL } from "../commonUtils/Base";

class LearningTravenService {
  getAllVideos() {
    return axios.get(BASE_URL + LEARNING_TRAVEN_URL.getAllVideos);
  }

  getVideoDetails(id) {
    return axios.get(BASE_URL + LEARNING_TRAVEN_URL.getVideoDetails + "/" + id);
  }

  getAllBlogsBasedOnCategoryID() {
    return axios.get(BASE_URL + LEARNING_TRAVEN_URL.getAllBlogs);
  }

  getAllBlogCategories() {
    return axios.get(BASE_URL +LEARNING_TRAVEN_URL.getBlogCategories);
  }

  getBlogDetailsById(id) {
    return axios.get(BASE_URL + LEARNING_TRAVEN_URL.getBlogDetails + "/" + id);
  }
  createBlog(obj){
      return axios.post(BASE_URL + LEARNING_TRAVEN_URL.createBlog ,obj);
  }
}
export default new LearningTravenService();
