import axios from "axios"

const api = axios.create({

  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
})

export function makeRequest(url, options) {
    console.log(process.env.REACT_APP_SERVER_URL)
  return api(url, options)
    .then(res => res.data)
    .catch(error => Promise.reject(error?.response?.data?.message ?? "Error"))
}
