import React, { Component } from 'react'
import { Container, Menu, Segment } from 'semantic-ui-react';
import { logout } from '../api/AuthApi'
import { withRouter } from 'react-router-dom'

export class Nav extends Component {

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
                        <Menu.Item name="Good News" position="left" header onClick={this.goToHome}/>
                        
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
                                <Menu.Item href={`${process.env.REACT_APP_API_BASE_URL}/auth/google`}>
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