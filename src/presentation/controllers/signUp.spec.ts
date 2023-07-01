import { SignUpController } from './signUp'
import { MissingParamError } from '../errors/missing.param.error'
import { InvalidParamError } from '../errors/invalid.param.error'
import { type EmailValidator } from '../protocols/email.validator'

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  const emailValidatorStub = new EmailValidatorStub()
  const sut = new SignUpController(emailValidatorStub)
  return { sut, emailValidatorStub }
}

describe('Sign Up controller', () => {
  test('should return 400 if no name is provided', () => {
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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
  test('should return 400 if no password is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'Teste',
        email: 'teste_email@gmail.com',
        // password: 'pass',
        passwordConfirmation: 'pass'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse?.statusCode).toBe(400)
    expect(httpResponse?.body).toEqual(new MissingParamError('password'))
  })
  test('should return 400 if no passwordConfirmation is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'Teste',
        email: 'teste_email@gmail.com',
        password: 'pass'
        // passwordConfirmation: 'pass'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse?.statusCode).toBe(400)
    expect(httpResponse?.body).toEqual(new MissingParamError('passwordConfirmation'))
  })
  test('should return 400 if an invalid email is provided', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'Teste',
        email: 'invalid_email',
        password: 'pass',
        passwordConfirmation: 'pass'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse?.statusCode).toBe(400)
    expect(httpResponse?.body).toEqual(new InvalidParamError('email'))
  })
  test('should call EmailValidaor with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        name: 'Teste',
        email: 'invalid_email',
        password: 'pass',
        passwordConfirmation: 'pass'
      }
    }
    sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('invalid_email')
  })
})
