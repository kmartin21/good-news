import React, { Component } from 'react'
import { Container, Menu, Button } from 'semantic-ui-react';
import { logout } from '../api/AuthApi'
import { withRouter } from 'react-router-dom'

class Nav extends Component {

    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this) 
    }

    logout = () => {
        logout()
        .then(response => {
            localStorage.removeItem("username")
            this.props.history.push('/')
        })
        .catch(error => console.log(error))
    }

    render() {
        const username = localStorage.getItem("username")
        
        return (
            <Menu>
                <Container>

                
                    { username ? (
                        <Menu.Menu position="right">
                            <Menu.Item>
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
        )
    }
}

export default withRouter(Nav)