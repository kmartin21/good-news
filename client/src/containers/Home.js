import React, { Component } from 'react'
import Articles from '../containers/Articles'
import { getUserArticles } from '../api/UserApi'
import { getTopArticles } from '../api/ArticlesApi'

export default class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userSavedArticles: [],
            topArticles: []
        }
    }

    componentDidMount() {
        if (localStorage.getItem("googleId")) {
            getUserArticles()
            .then(response => this.setState({ userSavedArticles: response.data.savedArticles }))
            .catch(error => console.log(error))
        } 
        getTopArticles()
        .then(response => this.setState({ topArticles: response.data.articles }))
        .catch(error => console.log(error))
    }

    render() {
        let articles = this.state.topArticles
        if (this.state.userSavedArticles.length > 0 && this.state.topArticles.length > 0) {
            articles = this.state.topArticles.map( article => {
                const found = this.state.userSavedArticles.find(savedArticle => {
                    return savedArticle.url === article.url
                })
                let saved = false
                if (found !== undefined) {
                    saved = true
                }

                return {...article, saved}
            })
        }

        return (
            <Articles articles={articles} divideVertically={false} />
        )
    }

}
