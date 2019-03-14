import axios from 'axios'
import { API_BASE_URL } from './Common'

const TOP_ARTICLES_URL = `${API_BASE_URL}/top-articles`

export const getTopArticles = () => {
    return axios.get(TOP_ARTICLES_URL)
        .then(response => response.data)
        .catch(error => { 
            throw new Error(error.response.data.message)
        })
}