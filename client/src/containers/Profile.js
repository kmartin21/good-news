import React, { Component } from 'react'
import { getUser } from '../api/UserApi'
import { Header, Responsive, Grid } from 'semantic-ui-react'
import Articles from './Articles';

export default class Profile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: {}
        }

        this.getUserProfile = this.getUserProfile.bind(this)
    }

    componentDidMount() {
        this.getUserProfile()
    }

    getUserProfile = () => {
        getUser()
        .then(response => this.setState({ user: response.data.user}))
        .catch(error => console.log(error))
    }

    render() {
        let savedArticles = []
        if (this.state.user.savedArticles) {
            savedArticles = this.state.user.savedArticles.map(article => { 
                return {...article, saved: true} 
            })
        } 
        
        return (
            <div>
                {this.state.user &&
                    <div>
                        <Header as='h1'>{this.state.user.username}</Header>
                        <Articles articles={savedArticles} divideVertically={true} />
                    </div>
                }
            </div>
        )
    }
}

