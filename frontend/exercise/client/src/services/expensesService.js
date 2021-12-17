import axios from 'axios'

class ExpensesService {
  API_ENDPOINT = 'http://localhost:5000/expenses'

  async getExpenses() {
    axios.defaults.headers.common['accept'] = 'application/json'

    let response
    response = await axios.get(`${this.API_ENDPOINT}`)
    return response.data
  }

  async addExpense(amount, date, description, category) {
    axios.defaults.headers.common['accept'] = 'application/json'
    axios.defaults.headers.common['Content-Type'] = 'application/json'

    let response
    response = await axios.post(`${this.API_ENDPOINT}`, { amount, date, description, category })
    return response.data

  }

  async deleteExpense(id) {
    axios.defaults.headers.common['accept'] = 'application/json'

    let response
    response = await axios.delete(`${this.API_ENDPOINT}/${id}`)
    return response.data
  }

  async updateExpense(id, amount, date, description, category) {
    axios.defaults.headers.common['accept'] = 'application/json'
    axios.defaults.headers.common['Content-Type'] = 'application/json'

    let response
    response = await axios.put(`${this.API_ENDPOINT}/${id}`, { amount, date, description, category })
    return response.data

  }
}

const expensesService = new ExpensesService()

export default expensesService
