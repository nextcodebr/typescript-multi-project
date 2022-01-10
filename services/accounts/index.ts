import { newInstance as newMongoInstance } from './mongo-impl'
import { newInstance as newMemInstance } from './inmem-impl'
import { AccountService } from '@nxcd-types/internal/interfaces'
import { MongoConfig } from '../../nxcd-types/internal/config'
import { ServiceAccount, AccountStatus } from '@nxcd-types/internal/account'

const enum ImplType {
    mongo = 'mongo',
    inmem = 'inmem'
}

const handles: Record<ImplType, AccountService | undefined> = {
    [ImplType.mongo]: undefined,
    [ImplType.inmem]: undefined,
}

export const of = async (config: MongoConfig & { dbname: string, collection: string }) => {
    let result = handles.mongo

    if (!result) {
        result = handles.mongo = await newMongoInstance(config)
    }

    return result
}

export const inMem = async (config: { loader?: () => Promise<ServiceAccount[]> }): Promise<AccountService> => {
    let result = handles.mongo

    if (!result) {
        result = handles.mongo = await newMemInstance(config)
    }

    return result
}

export const asApiKeyValidator = (service: AccountService) => async (apiKey: string) => {
    const account = await service.findByApiKey(apiKey)

    if (account?.status !== AccountStatus.active) {
        return false
    }

    return true
}