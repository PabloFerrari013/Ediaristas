import React from 'react'
import { SafeEnvironmentContainer } from './SafeEncironment.style'
import { Container } from '@mui/material'

const SafeEnvironment = () => {
  return (
    <SafeEnvironmentContainer>
      <Container>
        Ambiente Seguro <i className={'twf-lock'} />
      </Container>
    </SafeEnvironmentContainer>
  )
}

export default SafeEnvironment
