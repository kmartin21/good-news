import React from 'react'
import PropTypes from 'prop-types'
import {Container, Header} from 'semantic-ui-react'

const ErrorPage = ({ errorMessage }) => (
    <Container textAlign='center'>
        <Header textAlign='center'>{errorMessage}</Header>
    </Container>
)

ErrorPage.propTypes = {
    errorMessage: PropTypes.string.isRequired
}

export default ErrorPage