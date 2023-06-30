export class MissingParamError extends Error {
  constructor (readonly paramName: string) {
    super(`missing param: ${paramName}`)
    this.name = 'MissingParamError'
  }
}
