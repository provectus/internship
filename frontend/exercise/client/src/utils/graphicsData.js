export function graphicData(data) {
    const result = data.reduce((newObj, oldObj) => {
        const key = oldObj.date.slice(5, 7)

        if (!newObj[key]) {
            newObj[key] = oldObj.amount
        } else {
            newObj[key] += oldObj.amount
        }
        return newObj
    }, {})

    const formatter = new Intl.DateTimeFormat("en", { month: "short" })

    const finalResult = Object.entries(result).map((item) => {
        return {
            x: formatter.format(new Date(item[0])),
            y: item[1],
            label: String(item[1])
        }
    })

    return finalResult
}
