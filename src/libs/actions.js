import axios from 'axios'
import assert from 'assert'

export default async (baseURL, token) => {
  const api = axios.create({
    baseURL,
    // headers: {
    //   'Access-Control-Allow-Origin': '*'      
    // },
    transformResponse: [function (data) {
      return JSON.parse(data);
    }]
  })
  const { data } = await api.get('/')
  console.log(data)
  return data.reduce(
    (memo, action) => {
      return {
        ...memo,
        [action]: async (params={}) => {
          params.token = token
          const { data } = await memo._post(`/${action}`, params)
          console.log(action, params, data)
          return data
        },
      }
    },
    {
      _api: api,
      _post: async (endpoint, params) => {
        const { data } = await api.post(endpoint, params)
        return data
      },
      _get: async (endpoint, params) => {
        const { data } = await api.get(endpoint, params)
        return data
      },
    }
  )
}
