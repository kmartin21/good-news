import axios from 'axios'
import { API_BASE_URL } from './Common'

const USER_URL = `${API_BASE_URL}/users`

export const getUser = () => {
    return axios.get(USER_URL, {withCredentials: true})
        .then(response => response.json())
        .catch(error => { 
            throw new Error(error.response.data.message)
        })
}