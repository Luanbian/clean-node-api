import { SignUpController } from './signUp'
import { MissingParamError } from '../errors/missing.param.error'

describe('Sign Up controller', () => {
  test('should return 400 if no name is provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        // name: 'Teste',
        email: 'teste_email@gmail.com',
        password: 'pass',
        passwordConfirmation: 'pass'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse?.statusCode).toBe(400)
    expect(httpResponse?.body).toEqual(new MissingParamError('name'))
  })
  test('should return 400 if no email is provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'Teste',
        // email: 'teste_email@gmail.com',
        password: 'pass',
        passwordConfirmation: 'pass'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse?.statusCode).toBe(400)
    expect(httpResponse?.body).toEqual(new MissingParamError('email'))
  })
})
