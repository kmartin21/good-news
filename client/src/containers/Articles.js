import React, { Component } from 'react'
import { saveArticle, deleteArticle } from '../api/UserApi'
import { Grid } from 'semantic-ui-react'
import Article from '../components/Article'
import {logout} from '../api/AuthApi'
import ErrorPage from '../components/ErrorPage'

class Articles extends Component {

    constructor(props) {
        super(props)

        this.state = {
            shouldCenter: false,
            errorMessage: null
        }
    }

    toggleSaveArticle = (article, saved) => {
        if (!saved) {
            saveArticle(article)
            .catch(error => {
                if (error.status === 401) {
                    logout()
                } else {
                    this.setState({errorMessage: '500. Oops, we are working on this'})
                }
            })
        } else {
            deleteArticle(article)
            .catch(error => {
                if (error.status === 401) {
                    logout()
                } else {
                    this.setState({errorMessage: '500. Oops, we are working on this'})
                }
            })
        }
    }

    logout = () => {
        localStorage.removeItem("username")
        localStorage.removeItem("googleId")
        this.props.history.push('/')
        window.location.reload()
        
        logout()
    }

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
            articleGrid = <Grid columns={1} container divided='vertically' stackable style={{'paddingLeft':'10px', 'paddingRight':'10px'}}>{rows}</Grid>
        } else {
            articleGrid = <Grid columns={2} container divided stackable style={{'paddingLeft':'10px', 'paddingRight':'10px'}}>{rows}</Grid>
        }
        
        return (
            <div>
                {this.state.errorMessage ? (
                    <ErrorPage errorMessage={this.state.errorMessage} />
                ) : (
                    <div>
                        {articleGrid}
                    </div>
                )}
            </div>
        )
    }
}

export default Articles