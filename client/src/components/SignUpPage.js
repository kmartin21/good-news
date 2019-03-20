import React, { Component } from 'react'
import { Header, Icon, Button, Container } from 'semantic-ui-react'

export default class SignUpPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showSignUpContent: true
        }
    }

    login = () => {
        window.location = `${process.env.REACT_APP_API_BASE_URL}/auth/google`
    }

    render() {
        return (
            <div>
                {this.state.showSignUpContent ? (
                    <Container textAlign='center'>
                        <Header as='h2' style={{ 'marginTop':'20px' }}>Sign up to see good news</Header>
                        <Header as='h5' style={{ 'marginTop':'30px' }}>Create an account to start saving positive stories</Header>
                        <Button basic icon labelPosition='left' style={{ 'marginTop':'30px' }} onClick={this.login}>
                            <Icon name='google' />
                            Sign up with google
                        </Button>
                        <Header as='h5' textAlign='center'>Already have an account? <a style={{'cursor':'pointer'}} onClick={() => this.setState({showSignUpContent: !this.state.showSignUpContent})}>Login</a></Header>
                    </Container>
                ) : (
                    <Container textAlign='center'>
                        <Header as='h2' textAlign='center' style={{ 'marginTop':'20px' }}>Login to see good news</Header>
                        <Header as='h5' textAlign='center' style={{ 'marginTop':'30px' }}>Log back in with Google to see your saved positive stories and save new ones</Header>
                        <Button basic icon labelPosition='left' style={{ 'marginTop':'30px' }} onClick={this.login}>
                            <Icon name='google' />
                            Login with google
                        </Button>
                        <Header as='h5' textAlign='center'>Don't have an account? <a style={{'cursor':'pointer'}} onClick={() => this.setState({showSignUpContent: !this.state.showSignUpContent})}>Sign up</a></Header>
                    </Container>
                )}
            </div>
        )
    }
}