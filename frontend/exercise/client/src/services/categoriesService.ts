import axios from 'axios'

class CategoriesService {
  API_ENDPOINT = 'http://localhost:5000/categories'

  async getCategories() {
    axios.defaults.headers.common['accept'] = 'application/json'

    let response
    response = await axios.get(`${this.API_ENDPOINT}`)
    return response.data
  }
}

const categoriesService = new CategoriesService()

export default categoriesService
