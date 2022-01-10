import { ServiceAccount, Permission, AccountStatus } from "./account";

export interface AccountService {
    findByApiKey (key: string): Promise<ServiceAccount | undefined>

    revoke (account: ServiceAccount, ...perms: Permission[]): Promise<boolean>

    allow (account: ServiceAccount, ...perms: Permission[]): Promise<boolean>

    block (account: ServiceAccount): Promise<AccountStatus>

    enable (account: ServiceAccount): Promise<AccountStatus>
}