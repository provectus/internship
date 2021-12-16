import dateFormat from "dateformat"

export function dateForm(date) {
    return dateFormat(date, "dd.mm.yyyy hh:MM:ss TT")
}
