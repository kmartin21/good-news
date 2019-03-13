import axios from 'axios'
import { API_BASE_URL } from './Common'

const LOGIN_URL = `${API_BASE_URL}/auth/google`
const LOGOUT_URL = `${API_BASE_URL}/auth/logout`


export const login = () => {
    return axios.get(LOGIN_URL)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
}


