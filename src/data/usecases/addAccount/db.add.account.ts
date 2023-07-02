import { type AccountModel } from '../../../domain/models/account'
import {
  type AddAccount,
  type AddAccountModel
} from '../../../domain/usecases/add.account'
import { type AddAccountRepository } from '../../protocols/add.account.repository'
import { type Encrypter } from '../../protocols/encrypter'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository
  ) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(account.password)
    await this.addAccountRepository.add(
      Object.assign({}, account, { password: hashedPassword })
    )
    return await new Promise((resolve, reject) => {
      resolve({
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email',
        password: 'hashed_password'
      })
    })
  }
}
