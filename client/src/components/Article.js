import React, { Component } from 'react'
import { Card, Image, Icon } from 'semantic-ui-react'

export default class Article extends Component {

    constructor(props) {
        super(props)

        this.state = {
            saved: this.props.saved
        }

        this.toggleSaved = this.toggleSaved.bind(this)
    }

    toggleSaved = () => {
        if (!localStorage.getItem("googleId")) return

        this.setState({ saved: !this.state.saved })
        this.props.toggleSaveArticle(this.state.saved)
    }

    render() {
        const { title, description, url, urlToImage } = this.props

        return (
            <Card href={url} target='_blank'>
                <Image src={urlToImage} />
                <Card.Content>
                <Card.Header>{title}</Card.Header>
                    <Card.Description>{description}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    {this.state.saved ? (
                        <a onClick={this.toggleSaved}>
                            <Icon name='bookmark' />
                        </a>
                    ): (
                        <a onClick={this.toggleSaved}>
                            <Icon name='bookmark outline' />
                        </a>
                    )}
                    
                </Card.Content>
            </Card>
        )
    }

}