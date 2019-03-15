import React, { Component } from 'react'
import { Modal, Header, Icon, Button, Container } from 'semantic-ui-react'

export default class SignUpModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showSignUpContent: true
        }
    }

    login = () => {
        window.location = 'http://localhost:7002/api/v1/auth/google'
    }

    render() {
        return (
            <div>
                {this.state.showSignUpContent ? (
                    <Modal trigger={ <Icon name='bookmark outline' style={{ 'float':'right', 'cursor':'pointer' }} /> } centered={false} closeIcon>
                        <Modal.Content>
                            <Modal.Description>
                                <Container textAlign='center'>
                                    <Header as='h2' style={{ 'margin-top':'20px' }}>Sign up to see good news</Header>
                                    <Header as='h5' style={{ 'margin-top':'30px' }}>Create an account to start saving positive stories</Header>
                                    <Button basic icon labelPosition='left' style={{ 'margin-top':'30px' }} onClick={this.login}>
                                        <Icon name='google' />
                                        Sign up with google
                                    </Button>
                                    <Header as='h5' textAlign='center'>Already have an account? <a style={{'cursor':'pointer'}} onClick={() => this.setState({showSignUpContent: !this.state.showSignUpContent})}>Login</a></Header>
                                </Container>
                            </Modal.Description>
                        </Modal.Content>
                    </Modal>
                ) : (
                    <Modal trigger={ <Icon name='bookmark outline' style={{ 'float':'right', 'cursor':'pointer' }} /> } centered={false} closeIcon>
                        <Modal.Content>
                            <Modal.Description>
                                <Container textAlign='center'>
                                    <Header as='h2' textAlign='center' style={{ 'margin-top':'20px' }}>Login to see good news</Header>
                                    <Header as='h5' textAlign='center' style={{ 'margin-top':'30px' }}>Log back in with Google to see your saved positive stories and save new ones</Header>
                                    <Button basic icon labelPosition='left' style={{ 'margin-top':'30px' }} onClick={this.login}>
                                        <Icon name='google' />
                                        Login with google
                                    </Button>
                                    <Header as='h5' textAlign='center'>Don't have an account? <a style={{'cursor':'pointer'}} onClick={() => this.setState({showSignUpContent: !this.state.showSignUpContent})}>Sign up</a></Header>
                                </Container>
                            </Modal.Description>
                        </Modal.Content>
                    </Modal>
                )}
            </div>
        )
    }
}