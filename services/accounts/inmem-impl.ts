import { AccountStatus, Permission, ServiceAccount } from '@nxcd-types/internal/account'
import { AccountService } from '@nxcd-types/internal/interfaces'

class InMemAccountService implements AccountService {

    universe: Record<string, ServiceAccount>

    constructor (universe: Record<string, ServiceAccount>) {
        this.universe = universe
    }

    async findByApiKey (key: string): Promise<ServiceAccount | undefined> {
        const rv = key ? this.universe[key] : undefined

        return rv
    }

    async revoke (account: ServiceAccount, ...perms: Permission[]): Promise<boolean> {
        if (!perms?.length && !account.permissions?.size) {
            return false
        }

        for (const perm of perms) {
            account.permissions.delete(perm)
        }

        return true
    }

    async allow (account: ServiceAccount, ...perms: Permission[]): Promise<boolean> {
        if (!perms?.length && !account.permissions?.size) {
            return false
        }

        for (const perm of perms) {
            account.permissions.add(perm)
        }
        return true
    }

    async block (account: ServiceAccount): Promise<AccountStatus> {
        const prev = account.status
        account.status = AccountStatus.blocked

        return prev
    }

    async enable (account: ServiceAccount): Promise<AccountStatus> {
        const prev = account.status
        account.status = AccountStatus.active

        return prev
    }
}

export const newInstance = async (config: { loader?: () => Promise<ServiceAccount[]> }): Promise<AccountService> => {
    let universe: Record<string, ServiceAccount>
    if (config.loader) {
        universe = (await config.loader()).reduce((l: Record<string, ServiceAccount>, r) => {
            l[r.key] = r
            return l
        }, {})
    } else {
        universe = {}
    }

    return new InMemAccountService(universe)
}