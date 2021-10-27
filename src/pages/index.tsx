////////////////// NEXT //////////////////
import type { NextPage } from 'next'

////////////////// MATERIAL //////////////////
import { Button, Typography, Container, CircularProgress } from '@mui/material'

////////////////// ROOK //////////////////
import useIndex from 'data/hooks/pages/useindex.page'

////////////////// COMPONENTS //////////////////
import SafeEnvironment from 'ui/components/feedback/SafeEnvironment/SafeEnvironment'
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle'
import UserInformation from 'ui/components/data-display/UserInformation/UserInformation'
import TextFieldMask from 'ui/components/inputs/TextFieldMask/TextFieldMask'

////////////////// STYLE //////////////////
import {
  FormElementsContainer,
  ProfissionaisPaper,
  ProfissionaisContainer
} from 'ui/styles/pages/index.style'

const Home: NextPage = () => {
  const {
    cep,
    setCep,
    cepValido,
    buscarProfissionais,
    diaristas,
    buscaFeita,
    carregando,
    diaristasRestantes,
    error
  } = useIndex()

  return (
    <div>
      {/* lock */}
      <SafeEnvironment />
      {/* title and subtitle */}
      <PageTitle
        title={'Conheça os profissionais'}
        subtitle={
          'Preencha seu endereço e veja todos os profissionais da sua localidade'
        }
      />
      {/* container */}
      <Container>
        {/* container */}
        <FormElementsContainer>
          {/* input */}
          <TextFieldMask
            mask={'99.999-999'}
            label={'Digite seu CEP'}
            fullWidth
            variant={'outlined'}
            value={cep}
            onChange={event => setCep(event.target.value)}
          />

          {/* message error */}
          {error && <Typography color={'error'}>{error}</Typography>}

          {/* search */}
          <Button
            variant={'contained'}
            color={'secondary'}
            sx={{ width: '220px' }}
            disabled={!cepValido || carregando}
            onClick={() => buscarProfissionais(cep)}
          >
            {carregando ? <CircularProgress size={20} /> : 'Buscar'}
          </Button>
        </FormElementsContainer>

        {/* users */}
        {buscaFeita &&
          (diaristas.length > 0 ? (
            <ProfissionaisPaper>
              {/* users container */}
              <ProfissionaisContainer>
                {/* users information */}
                {diaristas.map((item, i) => {
                  return (
                    <UserInformation
                      key={i}
                      name={item.nome_completo}
                      picture={item.foto_usuario}
                      rating={item.reputacao}
                      description={item.cidade}
                    />
                  )
                })}
              </ProfissionaisContainer>
              <Container sx={{ textAlign: 'center' }}>
                {diaristasRestantes > 0 && (
                  <Typography sx={{ mt: 5 }}>
                    ... e mais {diaristasRestantes}{' '}
                    {diaristasRestantes > 1
                      ? 'profissionais atendem'
                      : 'profissional atende'}{' '}
                    ao seu endereço.
                  </Typography>
                )}

                <Button
                  variant={'contained'}
                  color={'secondary'}
                  sx={{ mt: 5 }}
                >
                  Contratar um profissional
                </Button>
              </Container>
            </ProfissionaisPaper>
          ) : (
            <Typography align={'center'} color={'textPrimary'}>
              Ainda não temos nenhuma diarista disponível em sua região
            </Typography>
          ))}
      </Container>
    </div>
  )
}

export default Home
