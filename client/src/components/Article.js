import React, { Component } from 'react'
import { Card, Image, Icon, Item } from 'semantic-ui-react'

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
            // <Card href={url} target='_blank' style={{'min-width': '200px'}}>
            //     <Image src={urlToImage} style={{'min-width': '200px'}}/>
            //     <Card.Content style={{'min-width': '200px'}}>
            //         <Card.Header>{title}</Card.Header>
            //         <Card.Description>{description}</Card.Description>
            //     </Card.Content>
            //     <Card.Content extra>
            //         {this.state.saved ? (
            //             <a onClick={this.toggleSaved}>
            //                 <Icon name='bookmark' />
            //             </a>
            //         ): (
            //             <a onClick={this.toggleSaved}>
            //                 <Icon name='bookmark outline' />
            //             </a>
            //         )}
                    
            //     </Card.Content>
            // </Card>
            <Item.Group>
                <Item>
                    <Item.Image size='small' src={urlToImage} />
                    <Item.Content verticalAlign='middle'>
                        <Item.Header href={url} target='_blank'>{title}</Item.Header>
                        <Item.Description>{description}</Item.Description>
                        <Item.Extra>
                            {this.state.saved ? (
                                <Icon name='bookmark' style={{ 'float':'right' }} onClick={this.toggleSaved} />
                               
                            ): (
                                <Icon name='bookmark outline' style={{ 'float':'right' }} onClick={this.toggleSaved} />
                                
                            )}
                        </Item.Extra>
                    </Item.Content>
                </Item>
            </Item.Group>
        )
    }

}