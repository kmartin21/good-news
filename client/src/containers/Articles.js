import React, { Component } from 'react'
import { getTopArticles } from '../api/ArticlesApi'
import { Grid, Card } from 'semantic-ui-react'
import Article from '../components/Article'

class Articles extends Component {

    constructor(props) {
        super(props)

        this.state = {
            articles: []
        }

        this.saveArticle = this.saveArticle.bind(this)
    }

    componentDidMount() {
        getTopArticles()
        .then(response => {
            this.setState({ articles: response.data.articles })
        })
        .catch(error => console.log(error))
    }

    saveArticle = () => {
        console.log("saved")
    }

    render() {
        let articleCards = []
        if (this.state.articles.length > 0) {
            articleCards = this.state.articles.map(article => <Article title={article.title} description={article.description} url={article.url} urlToImage={article.urlToImage} saveArticle={this.saveArticle}/>)
        }

        return (
            <Card.Group>
                {articleCards}
            </Card.Group>
        )
    }
}

export default Articles