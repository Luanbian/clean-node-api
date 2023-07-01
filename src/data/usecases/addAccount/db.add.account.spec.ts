import { DbAddAccount } from './db.add.account'

describe('DbAddAccount Usecase', () => {
  test('Should call Encryper with correct password', async () => {
    class EncrypterStub {
      async encrypt (value: string): Promise<string> {
        return await Promise.resolve('hash_password')
      }
    }
    const encrypterStub = new EncrypterStub()
    const sut = new DbAddAccount(encrypterStub)
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_pass'
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
