import React, { Component } from 'react'
import { Container, Menu, Segment } from 'semantic-ui-react';
import { logout } from '../api/AuthApi'
import { withRouter } from 'react-router-dom'

class Nav extends Component {

    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this) 
        this.goToProfile = this.goToProfile.bind(this)
    }

    logout = () => {
        localStorage.removeItem("username")
        localStorage.removeItem("googleId")
        this.props.history.push('/')
        window.location.reload()
        
        logout()
    }

    goToProfile = () => {
        this.props.history.push(`/user/${localStorage.getItem("googleId")}/profile`)
    }

    goToHome = () => {
        this.props.history.push('/')
    }

    render() {
        const username = localStorage.getItem("username")
        
        return (
            <Segment>
                <Menu secondary>
                    <Container>
                        <Menu.Item name="Good News" position="left" header={true} onClick={this.goToHome}/>
                        
                        { username ? (
                            <Menu.Menu position="right">
                                <Menu.Item onClick={this.goToProfile}>
                                    {username}
                                </Menu.Item>
                                <Menu.Item onClick={this.logout}>
                                    Logout
                                </Menu.Item>
                            </Menu.Menu>
                        ) : (
                            <Menu.Menu position="right">
                                <Menu.Item href='http://localhost:7002/api/v1/auth/google'>
                                    Login With Google
                                </Menu.Item>
                            </Menu.Menu>
                        )}
                    
                    </Container>
                </Menu>
            </Segment>
        )
    }
}

export default withRouter(Nav)