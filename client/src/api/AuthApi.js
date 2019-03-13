import axios from 'axios'
import { API_BASE_URL } from './Common'

const LOGOUT_URL = `${API_BASE_URL}/auth/logout`

export const logout = () => {
    return axios.post(LOGOUT_URL, null, {withCredentials: true})
        .then(response => response)
        .catch(error => {
            throw new Error(error.response.data.message)
        })
}


