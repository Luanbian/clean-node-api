export class InvalidParamError extends Error {
  constructor (readonly paramName: string) {
    super(`missing param: ${paramName}`)
    this.name = 'InvalidParamError'
  }
}
