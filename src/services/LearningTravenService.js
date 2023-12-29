import axios from "axios";
import { LEARNING_TRAVEN_URL } from "../commonUtils/ApiConstants";
import { BASE_URL } from "../commonUtils/Base";
import { toast } from "react-toastify";

class LearningTravenService {
  getAllVideos() {
    return axios.get(BASE_URL + LEARNING_TRAVEN_URL.getAllVideos).catch((err) => {
      toast.error(err.response.data)
    })
  }

  getVideoDetails(id) {
    return axios.get(BASE_URL + LEARNING_TRAVEN_URL.getVideoDetails + "/" + id).catch((err) => {
      toast.error(err.response.data)
    })
  }

  getAllBlogsBasedOnCategoryID() {
    return axios.get(BASE_URL + LEARNING_TRAVEN_URL.getAllBlogs).catch((err) => {
      toast.error(err.response.data)
    })
  }

  getAllBlogCategories() {
    return axios.get(BASE_URL +LEARNING_TRAVEN_URL.getBlogCategories).catch((err) => {
      toast.error(err.response.data)
    })
  }

  getBlogDetailsById(id) {
    return axios.get(BASE_URL + LEARNING_TRAVEN_URL.getBlogDetails + "/" + id).catch((err) => {
      toast.error(err.response.data)
    })
  }
  createBlog(obj){
      return axios.post(BASE_URL + LEARNING_TRAVEN_URL.createBlog ,obj).catch((err) => {
        toast.error(err.response.data)
      })
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new LearningTravenService();
