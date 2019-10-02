// import axios from 'axios'
import assert from 'assert'
import request from 'request-promise'

export default async (baseURL, token) => {
  const call = (method = 'GET', endpoint = '/', params = {}) => {
    params = {
      json: true,
      uri: `${baseURL}${endpoint}`,
      method,
      ...params,
    }

    return request(params)
  }

  call.get = (endpoint, params = {}) => {
    return call('GET', endpoint, {
      qs: { token, ...params },
    })
  }

  call.post = (endpoint, params = {}) => {
    return call('POST', endpoint, {
      body: { token, ...params },
    })
  }

  const data = await call.get('/')
  assert(data, 'failed to fetch actions.')

  console.log('Actions:', data)

  return data.reduce((memo, action) => {
    return {
      ...memo,
      [action]: async params => {
        const data = await call.post(`/${action}`, params)
        console.log('Called:', action, params, data)
        return data
      },
      setLocalStorage: (k, v) => {
        window.localStorage.setItem(k, v);
      },
      getLocalStorage: k => {
        return localStorage.getItem(k);
      }
    }
  }, {})
}
