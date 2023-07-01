import { type AccountModel } from '../../../domain/models/account'
import { type AddAccount, type AddAccountModel } from '../../../domain/usecases/add.account'
import { type Encrypter } from '../../protocols/encrypter'

export class DbAddAccount implements AddAccount {
  constructor (private readonly encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    return await Promise.resolve(null)
  }
}
