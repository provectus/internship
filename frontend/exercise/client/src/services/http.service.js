import axios from "axios"
import { toast } from "react-toastify"

const http = axios.create({
    baseURL: "http://localhost:5000/"
})

http.interceptors.response.use(
    function (res) {
        return res
    },

    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500
        if (!expectedErrors) {
            toast.error("Something was wrong. Try again later.")
        }
        return Promise.reject(error)
    }
)

const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete
}

export default httpService
