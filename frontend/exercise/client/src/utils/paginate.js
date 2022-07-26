import _ from "lodash"

export function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize
    _.slice(items, startIndex)
    _.take(_.slice(items, startIndex), pageSize)
    return _(items).slice(startIndex).take(pageSize).value()
}
