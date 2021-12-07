import axios from 'axios'

class ExpensesService {
  API_ENDPOINT = 'http://localhost:5000'

  async getExpenses() {
    axios.defaults.headers.common['accept'] = 'application/json'

    let response
    response = await axios.get(`${this.API_ENDPOINT}/expenses`)
    return response.data
  }

  async deleteExpense(id) {
    axios.defaults.headers.common['accept'] = 'application/json'

    let response
    response = await axios.delete(`${this.API_ENDPOINT}/expenses/${id}`)
    return response.data
  }
}

const expensesService = new ExpensesService()

export default expensesService
