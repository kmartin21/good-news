import React, { Component } from 'react'
import { getUser } from '../api/UserApi'
import { Header, Grid, Divider } from 'semantic-ui-react'
import Articles from './Articles'
import { withRouter } from 'react-router-dom'
import ErrorPage from '../components/ErrorPage'

class Profile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: {},
            errorMessage: null
        }

        this.getUserProfile = this.getUserProfile.bind(this)
    }

    componentDidMount() {
        if (localStorage.getItem("googleId")) {
            const {pathname} = this.props.location
            if (pathname !== `/user/${localStorage.getItem("googleId")}/profile`) {
                this.props.history.push(`/user/${localStorage.getItem("googleId")}/profile`)
            }
            this.getUserProfile()
        } else {
            this.props.history.push('/sign-up')
        }
    }

    getUserProfile = () => {
        getUser()
        .then(response => this.setState({ user: response.data.user}))
        .catch(error => this.setState({errorMessage: '500. Oops, we are working on this'}))
    }

    render() {
        let savedArticles = []
        if (this.state.user.savedArticles) {
            savedArticles = this.state.user.savedArticles.map(article => { 
                return {...article, saved: true} 
            }).reverse()
        } 
        
        return (
            <div>
                {this.state.errorMessage ? (
                        <ErrorPage errorMessage={this.state.errorMessage} />
                    ) : (
                        <div style={{ 'marginTop':'50px' }}>
                        {this.state.user &&
                            <div>
                                <Grid columns={1} container stackable style={{'paddingLeft':'10px', 'paddingRight':'10px'}}>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <Header as='h1'>{this.state.user.username}</Header>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column>
                                                <Header as='h4'>Saved Stories</Header>
                                                <Divider style={{'width':'90px'}} />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                                <Articles articles={savedArticles} divideVertically={true} />
                            </div>
                        }
                    </div>
                )}   
            </div>
        )
    }
}

export default withRouter(Profile)
