import { MissingParamError } from '../errors/missing.param.error'
import { type HttpRequest, type HttpResponse } from '../protocols/http'
import { badRequest, serverError } from '../helpers/http.helper'
import { type Controller } from '../protocols/controller'
import { type EmailValidator } from '../protocols/email.validator'
import { InvalidParamError } from '../errors/invalid.param.error'
import { ServerError } from '../errors/server.error'

export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse | undefined {
    try {
      const requiredFields = ['email', 'name', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) return badRequest(new InvalidParamError('email'))
    } catch (error) {
      return serverError(new ServerError())
    }
  }
}
