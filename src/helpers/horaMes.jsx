import moment from 'moment'


export const date = (fecha) => {
    const toDay = moment(fecha)

    return toDay.format('HH:mm a | MMMM Do');
}