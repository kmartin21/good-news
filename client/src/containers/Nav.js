import React, { Component } from 'react'
import { Container, Menu, Button } from 'semantic-ui-react';
import { getUser } from '../api/UserApi'
import { Link } from 'react-router-dom'

class Nav extends Component {

    render() {
        const username = localStorage.getItem("username")

        return (
            <Menu>
                <Container>

                <Menu.Menu position="right">
                    { username ? (
                        <Menu.Item href='http://localhost:7001/api/v1/auth/google'>
                            {username}
                        </Menu.Item>
                    ) : (
                        <Menu.Item href='http://localhost:7001/api/v1/auth/google'>
                            Login With Google
                        </Menu.Item>
                    )}
                </Menu.Menu>
                </Container>
            </Menu>
        )
    }
}

export default Nav