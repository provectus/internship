import axios from 'axios'
import { ExpenseDataInterface } from '../types'

class ExpensesService {
  API_ENDPOINT = 'http://localhost:5000/expenses'

  async getExpenses() {
    axios.defaults.headers.common['accept'] = 'application/json'

    let response
    response = await axios.get(`${this.API_ENDPOINT}`)
    return response.data
  }

  async addExpense(expenseData: ExpenseDataInterface) {
    axios.defaults.headers.common['accept'] = 'application/json'
    axios.defaults.headers.common['Content-Type'] = 'application/json'

    let response
    response = await axios.post(`${this.API_ENDPOINT}`, expenseData)
    return response.data

  }

  async deleteExpense(id: string) {
    axios.defaults.headers.common['accept'] = 'application/json'

    let response
    response = await axios.delete(`${this.API_ENDPOINT}/${id}`)
    return response.data
  }

  async updateExpense(id: string, expenseData: ExpenseDataInterface) {
    axios.defaults.headers.common['accept'] = 'application/json'
    axios.defaults.headers.common['Content-Type'] = 'application/json'

    let response
    response = await axios.put(`${this.API_ENDPOINT}/${id}`, expenseData)
    return response.data

  }
}

const expensesService = new ExpensesService()

export default expensesService
