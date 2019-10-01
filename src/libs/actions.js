import axios from 'axios'

export default async baseURL => {
  const api = axios.create({
    baseURL,
    // timeout: 1000,
    headers: {
      // 'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    transformResponse: [function (data) {
      // Do whatever you want to transform the data
  
      return JSON.parse(data);
    }]
  })

  const { data } = await api('/')

  return data.reduce((memo, action) => {
    return {
      ...memo,
      [action]: async params => {
        const { data } = await api.post(`/${action}`, params)
        console.log(data)
        return data
      },
    }
  }, {})
}
