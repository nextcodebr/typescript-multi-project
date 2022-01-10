import { Collection, MongoClient, MongoClientOptions, ObjectId } from 'mongodb'
import { AccountStatus, Permission, ServiceAccount } from '@nxcd-types/internal/account'
import { AccountService } from '@nxcd-types/internal/interfaces'
import { MongoConfig } from '../../nxcd-types/internal/config'

type Acc = ServiceAccount & { _id: ObjectId }

class MongoAccountService implements AccountService {

    readonly accounts: Collection

    constructor (client: MongoClient, dbname: string, collection: string) {
        this.accounts = client.db(dbname).collection(collection)
    }

    async findByApiKey (key: string): Promise<ServiceAccount | undefined> {
        const account = await this.accounts.findOne({ key }) as Acc

        if (account && account.permissions) {
            account.permissions = new Set([...account.permissions])
        }

        return account || undefined
    }

    async revoke (account: ServiceAccount, ...perms: Permission[]): Promise<boolean> {
        if (!perms?.length) {
            return false
        }

        let acc = await this.persistent(account)

        if (!acc.permissions?.size) {
            return false
        }

        let changes = 0

        for (const perm of perms) {
            if (acc.permissions.delete(perm)) {
                changes++
            }
        }

        if (changes) {
            await this.accounts.updateOne({ _id: acc._id }, { permissions: acc.permissions })

            return true
        }

        return false
    }

    async allow (account: ServiceAccount, ...perms: Permission[]): Promise<boolean> {
        if (!perms?.length) {
            return false
        }

        let acc = await this.persistent(account)

        if (!acc.permissions?.size) {
            return false
        }

        let changes = 0

        for (const perm of perms) {
            if (acc.permissions.add(perm)) {
                changes++
            }
        }

        if (changes) {
            await this.accounts.updateOne({ _id: acc._id }, { permissions: acc.permissions })

            return true
        }

        return false
    }

    async block (account: ServiceAccount): Promise<AccountStatus> {
        const acc = await this.persistent(account)
        const prev = acc.status

        if (prev !== AccountStatus.blocked) {
            acc.status = AccountStatus.blocked

            await this.accounts.updateOne({ _id: acc._id }, { status: AccountStatus.blocked })
        }

        return prev
    }

    async enable (account: ServiceAccount): Promise<AccountStatus> {
        const acc = await this.persistent(account)
        const prev = acc.status

        if (prev !== AccountStatus.active) {
            acc.status = AccountStatus.active

            await this.accounts.updateOne({ _id: acc._id }, { status: AccountStatus.active })
        }

        return prev
    }

    private async persistent (account: ServiceAccount): Promise<Acc> {
        let acc = account as Acc

        if (!acc._id) {
            acc = await this.findByApiKey(account.key) as Acc

            if (!acc) {
                throw new Error(`Account Not found (${account.key})`)
            }
        }

        return acc
    }
}

export const newInstance = async (config: MongoConfig & { dbname: string, collection: string }): Promise<AccountService> => {
    const options = { ...config } as any
    delete options.uri
    delete options.dbname
    delete options.collection

    const client = await MongoClient.connect(config.uri, options as MongoClientOptions)

    return new MongoAccountService(client, config.dbname, config.collection)
}