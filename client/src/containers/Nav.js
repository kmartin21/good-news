import React, { Component } from 'react'
import { Container, Menu, Button } from 'semantic-ui-react';
import { logout } from '../api/AuthApi'

class Nav extends Component {

    logout = () => {
        logout()
        .then(response => {
            localStorage.removeItem("username")
            console.log(response)
        })
        .catch(error => console.log(error))
    }

    render() {
        const username = localStorage.getItem("username")
        
        return (
            <Menu>
                <Container>

                <Menu.Menu position="right">
                    { username ? (
                        <div>
                            <Menu.Item onClick={this.logout}>
                                {username}
                            </Menu.Item>
                        </div>
                    ) : (
                        <div>
                            <Menu.Item href='http://localhost:7001/api/v1/auth/google'>
                                Login With Google
                            </Menu.Item>
                        </div>
                    )}
                </Menu.Menu>
                </Container>
            </Menu>
        )
    }
}

export default Nav