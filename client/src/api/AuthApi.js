import axios from 'axios'

const LOGOUT_URL = `${process.env.REACT_APP_API_BASE_URL}/auth/logout`

export const logout = () => {
    return axios.post(LOGOUT_URL, null, {withCredentials: true})
        .then(response => response)
        .catch(error => {
            throw new Error(error.response.data.message)
        })
}


