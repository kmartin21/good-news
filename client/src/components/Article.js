import React, { Component } from 'react'
import { Icon, Item } from 'semantic-ui-react'
import SignUpModal from './SignUpModal'

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

        let savedIcon
        if (localStorage.getItem("googleId")) {
            if (this.state.saved) {
                savedIcon = <Icon name='bookmark' style={{ 'float':'right', 'cursor':'pointer' }} onClick={this.toggleSaved} />
            } else {
                savedIcon = <Icon name='bookmark outline' style={{ 'float':'right', 'cursor':'pointer' }} onClick={this.toggleSaved} />
            }
        } else {
            savedIcon = <SignUpModal />
        }

        return (
            <Item.Group>
                <Item>
                    <Item.Image size='small' src={urlToImage} />
                    <Item.Content verticalAlign='middle'>
                        <Item.Header href={url} target='_blank'>{title}</Item.Header>
                        <Item.Description>{description}</Item.Description>
                        <Item.Extra>
                            {savedIcon}
                        </Item.Extra>
                    </Item.Content>
                </Item>
            </Item.Group>
        )
    }

}