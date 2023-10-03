import {
  MongoClient,
  type Collection,
  type MongoClient as MongoType
} from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoType,

  async connect (url: string): Promise<void> {
    this.client = await MongoClient.connect(url)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  }
}
