import httpService from "./http.service"

const expensesEndPoint = "expenses/"

const expensesService = {
    get: async () => {
        const { data } = await httpService.get(expensesEndPoint)
        return data
    },
    post: async (expense) => {
        const { data } = await httpService.post(expensesEndPoint, expense)
        return data
    },
    getById: async (id) => {
        const { data } = await httpService.get(expensesEndPoint + id)
        return data
    },
    put: async (id, upDateExpense) => {
        const { data } = await httpService.put(
            expensesEndPoint + id,
            upDateExpense
        )
        return data
    },
    delete: async (id) => {
        const { data } = await httpService.delete(expensesEndPoint + id)
        return data
    }
}

export default expensesService
