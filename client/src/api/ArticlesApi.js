import axios from 'axios'

const TOP_ARTICLES_URL = `${process.env.REACT_APP_API_BASE_URL}/top-articles`

export const getTopArticles = () => {
    return axios.get(TOP_ARTICLES_URL)
        .then(response => response.data)
        .catch(error => { 
            throw new Error(error.response.data.message)
        })
}