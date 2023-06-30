import { SignUpController } from './signUp'

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
    expect(httpResponse.statusCode).toBe(400)
  })
})
