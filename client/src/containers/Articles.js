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
        let rowColumns = []
        let currentRow = []
        if (this.props.articles.length > 0) {
            this.props.articles.forEach((article, index) => {
                if (index % 3 === 0 && index !== 0) {
                    rowColumns.push(currentRow)
                    currentRow = []
                    currentRow.push(
                        <Grid.Column>
                            <Article title={article.title} description={article.description} url={article.url} urlToImage={article.urlToImage} saved={article.saved} toggleSaveArticle={(saved) => this.toggleSaveArticle(article, saved)} />
                        </Grid.Column>
                    )
                } else {
                    currentRow.push(
                        <Grid.Column>
                            <Article title={article.title} description={article.description} url={article.url} urlToImage={article.urlToImage}saved={article.saved} toggleSaveArticle={(saved) => this.toggleSaveArticle(article, saved)} />
                        </Grid.Column>
                    )
                    if (index === this.props.articles.length - 1) {     
                        rowColumns.push(currentRow)
                    }
                }
            })
        }

        let rows = rowColumns.map(columns => 
            <Grid.Row>
                {columns}
            </Grid.Row>    
        )

        return (
            <Responsive as={Grid} columns={this.state.shouldCenter ? 1 : 3} centered={this.state.shouldCenter} doubling stackable fireOnMount onUpdate={this.handleOnUpdate}>
                {rows}
            </Responsive>
        )
    }
}

export default Articles