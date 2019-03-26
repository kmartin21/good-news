import React, { Component } from 'react'
import Articles from '../containers/Articles'
import { getUserArticles } from '../api/UserApi'
import { getTopArticles } from '../api/ArticlesApi'
import { Header, Divider, Grid } from 'semantic-ui-react'
import ErrorPage from '../components/ErrorPage'

export default class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userSavedArticles: [],
            topArticles: [],
            errorMessage: null
        }
    }

    componentDidMount() {
        if (localStorage.getItem("googleId")) {
            getUserArticles()
            .then(response => this.setState({ userSavedArticles: response.data.savedArticles }))
            .catch(error => this.setState({errorMessage: '500. Oops, we are working on this'}))
        } 

        getTopArticles()
        .then(response => this.setState({ topArticles: response.data.articles }))
        .catch(error => this.setState({errorMessage: '500. Oops, we are working on this'}))
    }

    render() {
        let articles = this.state.topArticles
        if (articles.length > 0) {
            let savedArticlesMap = new Map()
            
            this.state.userSavedArticles.forEach(savedArticle => {
                savedArticlesMap.set(savedArticle.url, savedArticle)
            })

            articles = this.state.topArticles.map( article => {
                let foundArticle = savedArticlesMap.get(article.url)
                let saved = false
                
                if (foundArticle !== undefined) {
                    saved = true
                }

                return {...article, saved}
            })
        }

        return (
            <div>
                {this.state.errorMessage ? (
                    <ErrorPage errorMessage={this.state.errorMessage} />
                ) : (
                    <div style={{ 'marginTop':'50px' }}>
                        <Grid columns={1} container divided stackable style={{'paddingLeft':'10px', 'paddingRight':'10px'}}>
                            <Grid.Row>
                                <Grid.Column>
                                        <Header as='h4'>Positive Stories</Header>
                                        <Divider style={{'width':'105px'}} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Articles articles={articles} divideVertically={false}/>
                        <Header as='h5' color={"grey"} style={{'textAlign':'right'}}>Powered by <a href="https://newsapi.org/" target="_blank" rel="noopener noreferrer">News API</a></Header>
                    </div>
                )}
            </div>
        )
    }

}
