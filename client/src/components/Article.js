import React from 'react'
import { Card, Image, Icon } from 'semantic-ui-react'

const Article = ({ title, description, url, urlToImage, saveArticle }) => (
    <Card>
        <Image src={urlToImage} />
        <Card.Content>
        <Card.Header>{title}</Card.Header>
            <Card.Description>{description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
            <a onClick={saveArticle}>
            <Icon name='bookmark outline' />
            </a>
        </Card.Content>
    </Card>
)

export default Article