import React, { Component } from 'react'
import { saveArticle, deleteArticle } from '../api/UserApi'
import { Grid, Card, Segment, Responsive } from 'semantic-ui-react'
import Article from '../components/Article'

class Articles extends Component {

    constructor(props) {
        super(props)

        this.state = {
            shouldCenter: false
        }
    }

    toggleSaveArticle = (article, saved) => {
        if (!saved) {
            saveArticle(article)
            .then(response => {
                console.log(response)
            })
            .catch(error => console.log(error))
        } else {
            deleteArticle(article)
            .then(response => {
                console.log(response)
            })
            .catch(error => console.log(error))
        }
    }

    handleOnUpdate = (e, { width }) => this.setState({ shouldCenter: width < 700 })

    render() {
        const {divideVertically} = this.props

        let rows = []
        let currentColumn = []
        if (this.props.articles.length > 0) {
            if (divideVertically) {
                this.props.articles.forEach((article) => {
                    rows.push(
                        <Grid.Row>
                            <Grid.Column>
                                <Article title={article.title} description={article.description} url={article.url} urlToImage={article.urlToImage} saved={article.saved} toggleSaveArticle={(saved) => this.toggleSaveArticle(article, saved)} />
                            </Grid.Column>
                        </Grid.Row>
                    )
                })
            } else {
                this.props.articles.forEach((article, index) => {
                    if (index % 2 === 0 && index !== 0) {
                        rows.push(
                            <Grid.Row>
                                {currentColumn}
                            </Grid.Row>
                        )
                        currentColumn = []
                    }

                    currentColumn.push(
                        <Grid.Column>
                            <Article title={article.title} description={article.description} url={article.url} urlToImage={article.urlToImage} saved={article.saved} toggleSaveArticle={(saved) => this.toggleSaveArticle(article, saved)} />
                        </Grid.Column>
                    )
                    if (index === this.props.articles.length - 1 && currentColumn.length > 0) {     
                        rows.push(
                            <Grid.Row>
                                {currentColumn}
                            </Grid.Row>
                        )
                    }
                })
            }
        }

        let articleGrid
        if (divideVertically) {
            articleGrid = <Grid columns={1} container divided='vertically' stackable>{rows}</Grid>
        } else {
            articleGrid = <Grid columns={2} container divided stackable>{rows}</Grid>
        }
        
        return (
            <div>
                {articleGrid}
            </div>
        )
    }
}

export default Articles