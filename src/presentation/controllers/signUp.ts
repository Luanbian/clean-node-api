import { MissingParamError } from '../errors/missing.param.error'
import { type HttpRequest, type HttpResponse } from '../protocols/http'
import { badRequest } from '../helpers/http.helper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse | undefined {
    const requiredFields = ['email', 'name']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
