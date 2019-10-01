import axios from 'axios'

export default async baseURL => {
    const api = axios.create({
        baseURL,
        // timeout: 1000,
        // headers: {'Access-Control-Allow-Origin': '*'}
    })

    const { data } = await api('/')

    return data.reduce((memo, action) => {
        return {
            ...memo,
            [action]: async params => {
                const { data } = await api.post(`/${action}`, params)
                return data
            },
        }
    }, {})
}