import axios from 'axios'

const USER_URL = `${process.env.REACT_APP_API_BASE_URL}/users`

export const getUser = () => {
    return axios.get(`${USER_URL}/${localStorage.getItem("googleId")}/profile`)
        .then(response => response.data)
        .catch(error => { 
            throw new Error(error.response.data.message)
        })
}

export const getUserArticles = () => {
    return axios.get(`${USER_URL}/${localStorage.getItem("googleId")}/articles`)
        .then(response => response.data)
        .catch(error => { 
            throw new Error(error.response.data.message)
        })
}

export const saveArticle = (article) => {
    return axios.post(`${USER_URL}/${localStorage.getItem("googleId")}/articles`, article, {withCredentials: true})
        .then(response => response.data)
        .catch(error => {
            throw new Error(error.response)
        })
}

export const deleteArticle = (article) => {
    return axios.put(`${USER_URL}/${localStorage.getItem("googleId")}/articles`, article, {withCredentials: true})
        .then(response => response.data)
        .catch(error => {
            throw new Error(error.response)
        })
} 